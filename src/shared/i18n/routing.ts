import { defineRouting } from 'next-intl/routing'

export const locales = ['en', 'ru', 'lv']
export const routing = defineRouting({
    locales,
    defaultLocale: 'en',
})
