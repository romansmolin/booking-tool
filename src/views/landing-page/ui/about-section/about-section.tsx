import { AnimatedContent } from '@/shared/ui/animaed-content'
import { Button } from '@/shared/ui/button'
import { BookmarkCheck, PersonStanding, Send, ShieldEllipsis } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'

interface About3Props {
    title?: string
    description?: string
    mainImage?: {
        src: string
        alt: string
    }
    secondaryImage?: {
        src: string
        alt: string
    }
    breakout?: {
        src: string
        alt: string
        title?: string
        description?: string
        buttonText?: string
        buttonUrl?: string
    }
    companiesTitle?: string
    companies?: Array<{
        src: string
        alt: string
    }>
    achievementsTitle?: string
    achievementsDescription?: string
    achievements?: Array<{
        label: string
        value: string
    }>
}

const tiles = [
    {
        key: 'onboarding',
        defaultHref: '#join',
        icon: <BookmarkCheck className="size-8 text-primary" />,
    },
    {
        key: 'widget',
        defaultHref: '#join',
        icon: <Send className="size-8 text-primary" />,
    },
    {
        key: 'availability',
        defaultHref: '#join',
        icon: <PersonStanding className="size-8 text-primary" />,
    },
    {
        key: 'privacy',
        defaultHref: '#join',
        icon: <ShieldEllipsis className="size-8 text-primary" />,
    },
] as const

export const AboutSection = async ({
    title,
    description,
    mainImage = {
        src: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3',
        alt: '',
    },
}: About3Props = {}) => {
    const t = await getTranslations('Landing.about')
    const resolvedTitle = title ?? t('title')
    const resolvedDescription = description ?? t('description')
    const resolvedMainImage = {
        src: mainImage?.src,
        alt: mainImage?.alt || t('mainImageAlt'),
    }

    return (
        <section className="py-16">
            <>
                <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
                    <h1 className="text-5xl font-semibold">{resolvedTitle}</h1>
                    <p className="text-muted-foreground">{resolvedDescription}</p>
                </div>

                <div className="grid gap-4 lg:grid-cols-4">
                    <AnimatedContent className={'col-span-2'}>
                        <Image
                            alt={resolvedMainImage.alt}
                            className="size-full rounded-xl object-cover w-full col-span-2"
                            src={resolvedMainImage.src}
                            width={700}
                            height={700}
                        />
                    </AnimatedContent>

                    <div className="grid md:grid-cols-2 md:grid-rows-2 col-span-2 gap-4">
                        {tiles.map(({ key, defaultHref, icon }, i) => (
                            <AnimatedContent
                                key={i}
                                className="bg-muted flex row-span-1 flex-col justify-between gap-6 rounded-xl p-7 lg:w-auto"
                            >
                                <div className="flex flex-col gap-2">
                                    {icon}
                                    <div>
                                        <p className="mb-2 text-lg font-semibold">
                                            {t(`tiles.${key}.title`)}
                                        </p>
                                        <p className="text-muted-foreground">
                                            {t(`tiles.${key}.description`)}
                                        </p>
                                    </div>
                                </div>
                                {/* <Button
                                    asChild
                                    className="btn-hero btn-hero--blue text-black w-full sm:w-auto"
                                    size={'lg'}
                                    variant="default"
                                >
                                    <Link href={defaultHref}>{t(`tiles.${key}.cta`)}</Link>
                                </Button> */}
                            </AnimatedContent>
                        ))}
                    </div>
                </div>
            </>
        </section>
    )
}
