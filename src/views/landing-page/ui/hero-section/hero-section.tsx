import { DoodleArrow1 } from '@/shared/assets'
import { AnimatedContent } from '@/shared/ui/animaed-content'
import { Button } from '@/shared/ui/button'
import { Heart } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

const HERO_VIDEO_LIGHT = '/video/demo-light.mp4'
const HERO_VIDEO_DARK = '/video/demo-dark.mp4'

const BASE_ANIMATION_PROPS = {
    distance: 70,
    direction: 'vertical',
    reverse: true,
    ease: 'power3.out',
    initialOpacity: 0,
    animateOpacity: true,
    scale: 1,
    threshold: 0.2,
} as const

export const HeroSection = async () => {
    const t = await getTranslations('Landing.hero')

    return (
        <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-10 rounded-3xl px-6 text-center md:gap-12 md:px-14">
            <div className="flex flex-col gap-8 md:gap-8">
                <AnimatedContent {...BASE_ANIMATION_PROPS} duration={0.45} delay={0}>
                    <div className="mx-auto flex w-fit items-center gap-3 rounded-full bg-primary/50 px-6 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-white shadow-[0px_0px_45px_10px_rgba(74,144,226,0.6)]">
                        <Heart className="animate-pulse" />
                        {t('badge')}
                    </div>
                </AnimatedContent>

                <AnimatedContent {...BASE_ANIMATION_PROPS} duration={0.55} delay={0.08}>
                    <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl md:leading-[1.1]">
                        {t.rich('title', {
                            highlight: (chunks) => <span className="text-primary">{chunks}</span>,
                        })}
                    </h1>
                </AnimatedContent>

                <AnimatedContent {...BASE_ANIMATION_PROPS} duration={0.6} delay={0.16}>
                    <p className="mx-auto max-w-2xl text-base text-primary sm:text-lg md:text-xl">
                        {t('description')}
                    </p>
                </AnimatedContent>
            </div>

            <AnimatedContent {...BASE_ANIMATION_PROPS} duration={0.55} delay={0.24}>
                <div className="flex w-full max-w-sm justify-center">
                    <Button
                        asChild
                        className="btn-hero btn-hero--blue h-12 w-full text-lg font-semibold text-slate-900"
                        size="lg"
                        variant="default"
                    >
                        <Link href="#join">{t('primaryCta')}</Link>
                    </Button>
                </div>
            </AnimatedContent>

            <AnimatedContent
                {...BASE_ANIMATION_PROPS}
                reverse={false}
                duration={0.7}
                delay={0.36}
                distance={110}
                scale={1.15}
            >
                <div className="relative w-full overflow-hidden rounded-[36px] border border-white/10 bg-slate-200/10 shadow-[0px_0px_45px_10px_rgba(74,144,226,0.6)]">
                    <div className="aspect-video w-full">
                        <video
                            aria-label={t('imageAlt')}
                            className="h-full w-full object-contain object-center dark:hidden"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                        >
                            <source src={HERO_VIDEO_LIGHT} type="video/mp4" />
                        </video>
                        <video
                            aria-label={t('imageAlt')}
                            className="hidden h-full w-full object-contain object-center dark:block"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                        >
                            <source src={HERO_VIDEO_DARK} type="video/mp4" />
                        </video>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-[36px] border border-white/20" />
                </div>
            </AnimatedContent>

            <AnimatedContent
                {...BASE_ANIMATION_PROPS}
                direction="horizontal"
                reverse={false}
                distance={160}
                duration={0.55}
                delay={0.48}
                className="absolute top-76 right-0 lg:top-60 xl:top-50 lg:right-15 z-100"
            >
                <DoodleArrow1 className="top-0 hidden size-32  xl:size-40 fill-primary md:block" />
            </AnimatedContent>

            <AnimatedContent
                {...BASE_ANIMATION_PROPS}
                direction="horizontal"
                distance={160}
                duration={0.55}
                delay={0.48}
                className="absolute top-76 left-0 lg:top-60  xl:top-50 lg:left-15 z-100"
            >
                <DoodleArrow1 className="hidden size-32 xl:size-40 fill-primary -scale-x-100 md:block" />
            </AnimatedContent>
        </section>
    )
}
