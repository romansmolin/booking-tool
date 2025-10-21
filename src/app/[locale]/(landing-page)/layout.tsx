import { routing } from '@/shared/i18n/routing'
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
            <body className={`${nunito.className} antialiased overflow-x-hidden`}>
                <NextIntlClientProvider locale="lv">
                    <main className="m-auto max-w-7xl h-svh bg-red-500 px-2">{children}</main>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}

export default LandingPageLayout
