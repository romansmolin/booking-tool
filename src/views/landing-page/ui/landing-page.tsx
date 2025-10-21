import React from 'react'

import { featuresData } from '../const/features'
import FeatureSection from './feature-section'
import { HeroSection } from './hero-section'

const LandingPage = () => {
    return (
        <div className="space-y-20 pb-24 pt-12 md:space-y-32">
            <HeroSection />
            <div className="sticky top-24 space-y-16">
                {featuresData.map((feature) => (
                    <FeatureSection key={feature.imageUrl} {...feature} />
                ))}
            </div>
        </div>
    )
}

export default LandingPage
