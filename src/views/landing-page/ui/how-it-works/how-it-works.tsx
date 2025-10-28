import { AnimatedContent } from '@/shared/ui/animaed-content'
import {
    Building2,
    CalendarCheck,
    CircleArrowOutUpRight,
    HandCoins,
    LayoutGrid,
    Link2,
} from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import React from 'react'

const items = [
    { icon: HandCoins, key: 'subscriptions' },
    { icon: Building2, key: 'setup' },
    { icon: LayoutGrid, key: 'bento' },
    { icon: Link2, key: 'widget' },
    { icon: CalendarCheck, key: 'calendar' },
    { icon: CircleArrowOutUpRight, key: 'automation' },
] as const

export const HowItWorks = async () => {
    const t = await getTranslations('Landing.howItWorks')

    return (
        <section className="flex items-center justify-center py-16">
            <div className="flex flex-col gap-12">
                <h2 className="text-4xl font-bold tracking-tight text-center sm:text-5xl md:text-6xl">
                    {t.rich('title', {
                        highlight: (chunks) => <span className="text-primary">{chunks}</span>,
                    })}
                </h2>
                <div className="mx-auto grid gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map(({ icon: Icon, key }) => (
                        <AnimatedContent key={key}>
                            <div className="flex flex-col rounded-xl border px-5 py-6 ring-1 ring-inset ring-primary h-full">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                    <Icon className="h-6 w-6 text-primary" />
                                </div>
                                <span className="text-lg font-semibold text-primary">
                                    {t(`cards.${key}.title`)}
                                </span>
                                <p className="mt-1 text-[15px] text-foreground/80">
                                    {t(`cards.${key}.description`)}
                                </p>
                            </div>
                        </AnimatedContent>
                    ))}
                </div>
            </div>
        </section>
    )
}
