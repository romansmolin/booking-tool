'use client'

import flagLatvia from '@/../public/flags/latvia.png'
import flagRussia from '@/../public/flags/russia.png'
import flagUk from '@/../public/flags/united-kingdom.png'
import { usePathname, useRouter } from '@/shared/i18n/navigation'
import { routing } from '@/shared/i18n/routing'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { Check } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image, { type StaticImageData } from 'next/image'

import React from 'react'

type LocaleCode = (typeof routing.locales)[number]

const localeAssets: Record<
    LocaleCode,
    {
        flagSrc: StaticImageData
        flagAlt: string
    }
> = {
    en: {
        flagSrc: flagUk,
        flagAlt: 'United Kingdom flag',
    },
    ru: {
        flagSrc: flagRussia,
        flagAlt: 'Russian flag',
    },
    lv: {
        flagSrc: flagLatvia,
        flagAlt: 'Latvian flag',
    },
}

export const LanguageSwitcher = () => {
    const locale = useLocale() as LocaleCode
    const pathname = usePathname()
    const router = useRouter()
    const t = useTranslations('Landing.languageSwitcher')
    const [isPending, startTransition] = React.useTransition()

    const handleSwitch = (targetLocale: LocaleCode) => {
        if (targetLocale === locale) return

        startTransition(() => {
            router.replace(pathname, { locale: targetLocale })
        })
    }

    const currentLocaleMeta = localeAssets[locale]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    aria-label={t('label')}
                    className="size-12 p-2!"
                    disabled={isPending}
                    variant="outline"
                >
                    <Image
                        priority
                        alt={currentLocaleMeta.flagAlt}
                        className="size-full object-cover"
                        height={36}
                        src={currentLocaleMeta.flagSrc}
                        width={36}
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-48 rounded-xl border border-border/60 bg-card/85 p-1 backdrop-blur"
            >
                {routing.locales.map((code) => {
                    const localeMeta = localeAssets[code as LocaleCode]
                    const isActive = code === locale

                    return (
                        <DropdownMenuItem
                            key={code}
                            className={cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                isActive && 'bg-primary/10 text-primary focus:bg-primary/15'
                            )}
                            disabled={isActive || isPending}
                            onSelect={(event) => {
                                event.preventDefault()
                                handleSwitch(code as LocaleCode)
                            }}
                        >
                            <span className="flex items-center gap-3">
                                <span className="relative flex size-6 overflow-hidden rounded-full">
                                    <Image
                                        alt={localeMeta.flagAlt}
                                        className="object-cover"
                                        height={32}
                                        src={localeMeta.flagSrc}
                                        width={32}
                                    />
                                </span>
                                <span>{t(`languages.${code}`)}</span>
                            </span>
                            {isActive && <Check className="ml-auto size-4 text-primary" />}
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
