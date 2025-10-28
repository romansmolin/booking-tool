import { emailValidationErrorMessage, isValidEmail, normalizeEmail } from '@/shared/lib/validators'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const DEFAULT_STATUS = 'subscribed'

export async function POST(request: NextRequest) {
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
    const API_KEY = process.env.MAILCHIMP_API_KEY
    const DATACENTER = process.env.MAILCHIMP_API_SERVER

    if (!AUDIENCE_ID || !API_KEY || !DATACENTER) {
        globalThis.console.log('[ERROR]: We need creds')
    }

    try {
        const payload = (await request.json()) as {
            emailAddress?: unknown
        }

        if (!isValidEmail(payload.emailAddress)) {
            globalThis.console.error('[waitlist] Invalid email received', payload?.emailAddress)

            return NextResponse.json(
                {
                    message: emailValidationErrorMessage,
                },
                { status: 400 }
            )
        }

        const email = normalizeEmail(payload.emailAddress)

        const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`

        const mailchimpResp = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email_address: email,
                status: DEFAULT_STATUS,
            }),
        })

        const mailChimpRespData = await mailchimpResp.json()

        if (!mailchimpResp.ok) {
            let status = 'FAILED'
            if (mailChimpRespData.title === 'Member Exists') {
                status = 'MEMBER_EXISTS'
                throw new Error(status)
            }
            if (mailChimpRespData.title === 'Invalid Resource') {
                status = 'INVALID_RESOURCE'
            }

            return NextResponse.json({
                status,
                message: mailChimpRespData.detail || 'Subscription failed',
            })
        }

        globalThis.console.log('[waitlist] New waitlist subscriber', { email })

        return NextResponse.json({
            message: 'You have been added to the waitlist.',
        })
    } catch (error) {
        globalThis.console.error('[waitlist] Failed to process request', error)

        return NextResponse.json(
            {
                message: 'Unable to join the waitlist right now. Please try again later.',
            },
            { status: 500 }
        )
    }
}
