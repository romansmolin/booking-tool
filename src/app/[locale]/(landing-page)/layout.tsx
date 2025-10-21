import { ThemeProvider } from '@/app/_providers'
import { routing } from '@/shared/i18n/routing'
import { Header } from '@/widgets/header'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { Nunito } from 'next/font/google'
import { notFound } from 'next/navigation'

import React, { ReactNode } from 'react'

import '../../globals.css'

const nunito = Nunito({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin', 'latin-ext', 'cyrillic'],
    display: 'swap',
})

const LandingPageLayout = async ({
    children,
    params,
}: {
    children: ReactNode
    params: Promise<{ locale: string }>
}) => {
    const { locale } = await params

    if (!hasLocale(routing.locales, locale)) notFound()

    return (
        <html suppressHydrationWarning className="overflow-x-hidden" lang="">
            <body
                className={`${nunito.className} antialiased overflow-x-hidden bg-background text-foreground`}
            >
                <ThemeProvider
                    disableTransitionOnChange
                    enableSystem
                    attribute="class"
                    defaultTheme="dark"
                >
                    <NextIntlClientProvider locale="lv">
                        <div className="flex flex-col max-w-7xl gap-26 px-2 pt-2 mx-auto">
                            <Header />
                            <main className="m-auto min-h-svh px-2 flex flex-col">{children}</main>
                        </div>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}

export default LandingPageLayout
