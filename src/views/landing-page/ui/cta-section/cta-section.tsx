import { AnimatedContent } from '@/shared/ui/animaed-content'
import { Button } from '@/shared/ui/button'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'

import React from 'react'

const CTA_IMAGE =
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3'

const CtaSection = async () => {
    const t = await getTranslations('Landing.cta')

    return (
        <section className="mx-auto w-full ">
            <AnimatedContent
                animateOpacity
                delay={0.04}
                direction="vertical"
                distance={60}
                duration={0.6}
                initialOpacity={0}
                reverse={false}
                scale={1.05}
                threshold={0.2}
            >
                <div className="relative overflow-hidden rounded-3xl bg-card px-8 py-12 text-center text-slate-50 ring-1 ring-border/60">
                    <Image
                        priority
                        alt={t('imageAlt')}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        height={720}
                        src={CTA_IMAGE}
                        width={1024}
                    />
                    <div className="absolute inset-0 bg-slate-950/80" />

                    <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-left text-slate-50 md:gap-8">
                        <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary/90">
                            {t('label')}
                        </span>
                        <div className="space-y-4 text-center">
                            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                                {t('title')}
                            </h2>
                            <p className="text-base text-slate-200 md:text-lg">{t('description')}</p>
                        </div>
                        <Button
                            asChild
                            className="btn-hero btn-hero--blue text-base font-semibold text-slate-900"
                            size="lg"
                            variant="default"
                        >
                            <Link href="#join">
                                <span className="btn-hero__label btn-hero__label--blue">
                                    {t('primaryCta')}
                                </span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </AnimatedContent>
        </section>
    )
}

export default CtaSection
