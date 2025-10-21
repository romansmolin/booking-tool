import { AnimatedContent } from '@/shared/ui/animaed-content'
import { Button } from '@/shared/ui/button'
import Image from 'next/image'
import Link from 'next/link'

import React from 'react'

const CTA_IMAGE =
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3'

const CtaSection = () => {
    return (
        <section className="mx-auto w-full py-16">
            <AnimatedContent
                animateOpacity
                delay={0.1}
                direction="vertical"
                distance={80}
                duration={0.9}
                initialOpacity={0}
                reverse={false}
                scale={1.05}
                threshold={0.25}
            >
                <div className="relative overflow-hidden rounded-3xl bg-card px-8 py-12 text-center text-slate-50 ring-1 ring-border/60">
                    <Image
                        priority
                        alt="Team using Booqly dashboard"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        height={720}
                        src={CTA_IMAGE}
                        width={1024}
                    />
                    <div className="absolute inset-0 bg-slate-950/80" />

                    <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-left text-slate-50 md:gap-8">
                        <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary/90">
                            Early Access
                        </span>
                        <div className="space-y-4 text-center">
                            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                                Simplify bookings. Empower your business.
                            </h2>
                            <p className="text-base text-slate-200 md:text-lg">
                                Create a beautiful booking page, manage your schedule, and send automated
                                reminders — all from one easy-to-use platform built for small teams and
                                freelancers.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button
                                asChild
                                className="btn-hero text-base font-semibold text-slate-900"
                                size="lg"
                                variant="ghost"
                            >
                                <Link href="#get-started">
                                    <span className="btn-hero__label">Join early access</span>
                                </Link>
                            </Button>
                            <Button
                                asChild
                                className="btn-hero btn-hero--blue text-base font-semibold text-slate-900"
                                size="lg"
                                variant="ghost"
                            >
                                <Link href="#book-demo">
                                    <span className="btn-hero__label btn-hero__label--blue">
                                        Watch demo
                                    </span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </AnimatedContent>
        </section>
    )
}

export default CtaSection
