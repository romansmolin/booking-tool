'use client'

import { routing } from '@/shared/i18n/routing'
import { usePathname, useRouter } from '@/shared/i18n/navigation'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'

const locales = routing.locales

export const LanguageSwitcher = () => {
    const locale = useLocale()
    const t = useTranslations('Landing.languageSwitcher')
    const pathname = usePathname()
    const router = useRouter()
    const [isPending, startTransition] = React.useTransition()

    const switchLocale = (targetLocale: string) => {
        if (targetLocale === locale) {
            return
        }

        startTransition(() => {
            router.replace(pathname, { locale: targetLocale })
        })
    }

    return (
        <div className="mb-8 flex flex-col items-start gap-4 rounded-2xl border border-border/60 bg-card/60 px-4 py-4 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
                {t('label')}
            </span>
            <div className="flex flex-wrap items-center gap-2">
                {locales.map((code) => {
                    const isActive = code === locale

                    return (
                        <Button
                            key={code}
                            className={cn(
                                'px-5',
                                isActive
                                    ? 'btn-hero btn-hero--blue text-slate-900'
                                    : 'bg-background/60 text-foreground hover:bg-background/80'
                            )}
                            disabled={isPending}
                            onClick={() => switchLocale(code)}
                            size="sm"
                            type="button"
                            variant={isActive ? 'default' : 'outline'}
                        >
                            {t(`languages.${code}`)}
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}
