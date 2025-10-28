import { Button } from '@/shared/ui/button'
import { Heart } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'

const HERO_IMAGE =
    'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3'

export const HeroSection = async () => {
    const t = await getTranslations('Landing.hero')

    return (
        <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 rounded-3xl px-6 text-center md:gap-12 md:px-14">
            <div className="flex flex-col gap-6 md:gap-8">
                <div className="text-sm font-semibold uppercase shadow-[0px_0px_45px_10px_rgba(74,144,226,0.6)] tracking-[0.35em] text-white px-6 py-2 rounded-full bg-primary/50 w-fit mx-auto flex gap-3 items-center">
                    <Heart className="animate-pulse " />
                    {t('badge')}
                </div>

                <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl md:leading-[1.1]">
                    {t.rich('title', {
                        highlight: (chunks) => (
                            <span className="text-primary font-extrabold">{chunks}</span>
                        ),
                    })}
                </h1>

                <p className="mx-auto max-w-2xl text-base text-primary sm:text-lg md:text-xl">
                    {t('description')}
                </p>
            </div>

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

            <div className="relative w-full overflow-hidden rounded-[36px] border border-white/10 bg-slate-200/10 shadow-[0px_0px_45px_10px_rgba(74,144,226,0.6)]">
                <div className="aspect-video w-full">
                    <Image
                        priority
                        alt={t('imageAlt')}
                        className="h-full w-full object-cover object-center"
                        height={900}
                        src={HERO_IMAGE}
                        width={1600}
                    />
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-[36px] border border-white/20" />
            </div>
        </section>
    )
}
