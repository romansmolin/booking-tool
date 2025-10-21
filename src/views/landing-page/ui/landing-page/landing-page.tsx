import React from 'react'

import { featuresData } from '../../const/features'
import { AboutSection } from '../about-section/about-section'
import CtaSection from '../cta-section/cta-section'
import FeatureSection from '../feature-section/feature-section'
import { HeroSection } from '../hero-section/hero-section'
import { JoinWaitlistSection } from '../join-waitlist-section'

const LandingPage = () => {
    return (
        <>
            <HeroSection />
            <div>
                {featuresData.map((feature) => (
                    <FeatureSection key={feature.imageUrl} {...feature} />
                ))}
            </div>
            <CtaSection />
            <AboutSection />
            <JoinWaitlistSection />
        </>
    )
}

export default LandingPage
