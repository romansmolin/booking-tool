import { cn } from '@/shared/lib/utils'
import { AnimatedContent } from '@/shared/ui/animaed-content'
import { Badge } from '@/shared/ui/badge'
import Image from 'next/image'

import React, { ReactNode } from 'react'

interface FeatureSectionProps {
    position: 'right' | 'left'
    title: string
    subtitle: string
    imageUrl: string
    listItems?: string[]
    badgeText?: string
    badgeIcon?: ReactNode
    mainButton?: ReactNode
    secondaryButton?: ReactNode
}

const FeatureSection = ({
    position,
    imageUrl,
    title,
    subtitle,
    listItems,
    badgeText,
    badgeIcon,
    mainButton,
    secondaryButton,
}: FeatureSectionProps) => {
    const isImageLeft = position === 'left'

    return (
        <section className="flex items-center justify-center py-16 ">
            <AnimatedContent
                animateOpacity
                delay={0.1}
                direction="vertical"
                distance={100}
                duration={1}
                initialOpacity={0}
                reverse={false}
                scale={1.1}
                threshold={0.2}
            >
                <div className="flex w-full max-w-6xl flex-col gap-10 rounded-3xl bg-card md:grid md:grid-cols-2 md:items-center md:gap-16 overflow-hidden h-[70%] shadow-[0_30px_80px_rgba(15,23,42,0.5)]">
                    <div
                        className={cn(
                            'flex flex-col gap-6 text-left px-8 py-12 ',
                            isImageLeft ? 'md:order-2' : 'md:order-1'
                        )}
                    >
                        {badgeText && (
                            <Badge className="self-start" variant="outline">
                                {badgeIcon && <span className="mr-2 inline-flex">{badgeIcon}</span>}
                                {badgeText}
                            </Badge>
                        )}
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                                {title}
                            </h2>
                            <p className="max-w-xl text-base text-muted-foreground md:text-lg">
                                {subtitle}
                            </p>
                        </div>
                        {listItems && (
                            <ul className="space-y-3 text-sm text-foreground md:text-base">
                                {listItems.map((listItem, index) => (
                                    <li key={`${listItem}-${index}`} className="flex items-center gap-3">
                                        <span className="size-2.5 rounded-full bg-primary" />
                                        <span>{listItem}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {(mainButton || secondaryButton) && (
                            <div className="flex flex-wrap gap-3">
                                {mainButton}
                                {secondaryButton}
                            </div>
                        )}
                    </div>

                    <div
                        className={cn(
                            'overflow-hidden bg-muted/40 h-full',
                            isImageLeft ? 'md:order-1' : 'md:order-2'
                        )}
                    >
                        <div className="aspect-16/10 w-full h-full overflow-hidden">
                            <Image
                                alt={title}
                                className="h-full w-full object-cover object-center"
                                height={720}
                                src={imageUrl}
                                width={1024}
                            />
                        </div>
                    </div>
                </div>
            </AnimatedContent>
        </section>
    )
}

export default FeatureSection
