import { Button } from '@/shared/ui/button'
import { ArrowBigRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

import React from 'react'

import { featuresData } from '../../const/features'
import { AboutSection } from '../about-section/about-section'
import { ContactSection } from '../contact-section'
import CtaSection from '../cta-section/cta-section'
import FeatureSection from '../feature-section/feature-section'
import { HeroSection } from '../hero-section/hero-section'
import { HowItWorks } from '../how-it-works'
import { JoinWaitlistSection } from '../join-waitlist-section'
import { LanguageSwitcher } from '../language-switcher'

const LandingPage = async () => {
    const t = await getTranslations('Landing.features')

    return (
        <>
            <section id="hero">
                <HeroSection />
            </section>

            <section id="how-it-works">
                <HowItWorks />
            </section>

            <div id="features" className="flex flex-col gap-8">
                {featuresData.map(({ id, listItemKeys, primaryCtaHref, ...feature }) => {
                    const badgeText = t(`${id}.badge`)
                    const title = t(`${id}.title`)
                    const subtitle = t(`${id}.subtitle`)
                    const listItems = listItemKeys.map((key) => t(`${id}.list.${key}`))
                    const primaryCtaLabel = t(`${id}.primaryCta`)

                    return (
                        <FeatureSection
                            key={id}
                            {...feature}
                            badgeText={badgeText}
                            title={title}
                            subtitle={subtitle}
                            listItems={listItems}
                            mainButton={
                                primaryCtaHref ? (
                                    <Button
                                        asChild
                                        className="btn-hero btn-hero--blue w-full text-lg font-semibold text-slate-900 md:w-auto"
                                        size="lg"
                                        variant="default"
                                    >
                                        <Link href={primaryCtaHref}>
                                            <span className="inline-flex items-center gap-2">
                                                {primaryCtaLabel}
                                                <ArrowBigRight className="size-5" />
                                            </span>
                                        </Link>
                                    </Button>
                                ) : undefined
                            }
                        />
                    )
                })}
            </div>

            <section id="cta">
                <CtaSection />
            </section>

            <section id="about">
                <AboutSection />
            </section>

            <section id="join">
                <JoinWaitlistSection />
            </section>

            <section id="contact">
                <ContactSection />
            </section>

            {/* 

            <div id="features" className="flex flex-col gap-8">
                {featuresData.map(({ id, listItemKeys, primaryCtaHref, ...feature }) => {
                    const badgeText = t(`${id}.badge`)
                    const title = t(`${id}.title`)
                    const subtitle = t(`${id}.subtitle`)
                    const listItems = listItemKeys.map((key) => t(`${id}.list.${key}`))
                    const primaryCtaLabel = t(`${id}.primaryCta`)

                    return (
                        <FeatureSection
                            key={id}
                            {...feature}
                            badgeText={badgeText}
                            title={title}
                            subtitle={subtitle}
                            listItems={listItems}
                            mainButton={
                                primaryCtaHref ? (
                                    <Button
                                        asChild
                                        className="btn-hero btn-hero--blue w-full text-lg font-semibold text-slate-900 md:w-auto"
                                        size="lg"
                                        variant="default"
                                    >
                                        <Link href={primaryCtaHref}>
                                            <span className="inline-flex items-center gap-2">
                                                {primaryCtaLabel}
                                                <ArrowBigRight className="size-5" />
                                            </span>
                                        </Link>
                                    </Button>
                                ) : undefined
                            }
                        />
                    )
                })}
            </div>

            <section id="cta">
                <CtaSection />
            </section>

            <section id="about">
                <AboutSection />
            </section>

            <section id="join">
                <JoinWaitlistSection />
            </section> */}
        </>
    )
}

export default LandingPage
