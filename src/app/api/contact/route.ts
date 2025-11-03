import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'

const requestSchema = z.object({
    name: z.string().min(2).max(120),
    email: z.string().email(),
    message: z.string().min(10).max(2000),
})

const generateEmailTemplate = (name: string, message: string, email: string) => {
    return `
        <html>
            <body>
                <h1>Message From ${name || 'Not provided'}</h1>
                <p><strong>Email:</strong> ${email || 'Not provided'}</p>
                <p><strong>Message:</strong></p>
                <p>${message || 'Not provided'}</p>
            </body>
        </html>
    `
}

export async function POST(request: Request) {
    try {
        const json = await request.json()
        const { name, email, message } = requestSchema.parse(json)

        const { NODEMAILER_EMAIL, NODEMAILER_EMAIL_PASS, NODEMAILER_PORT } = process.env

        if (!NODEMAILER_EMAIL || !NODEMAILER_EMAIL_PASS || !NODEMAILER_PORT) {
            console.error('[contact] Missing required nodemailer environment variables.')
            return NextResponse.json(
                { status: 'FAILED', message: 'Email service is not configured.' },
                { status: 500 }
            )
        }

        const port = Number(NODEMAILER_PORT ?? 587)

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port,
            secure: false,
            auth: {
                user: NODEMAILER_EMAIL,
                pass: NODEMAILER_EMAIL_PASS,
            },
        })

        const htmlContent = generateEmailTemplate(name, message, email)

        await transporter.sendMail({
            from: NODEMAILER_EMAIL,
            to: NODEMAILER_EMAIL,
            subject: `New contact form submission from ${name || email}`,
            html: htmlContent,
        })

        return NextResponse.json({ status: 'SUCCESS' })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { status: 'FAILED', message: 'Invalid payload.', issues: error.flatten() },
                { status: 400 }
            )
        }

        console.error('[contact] Failed to send email', error)
        return NextResponse.json(
            { status: 'FAILED', message: 'Unable to send your message.' },
            { status: 500 }
        )
    }
}
