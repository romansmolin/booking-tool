import { Button } from '@/shared/ui/button'

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

export const AboutSection = ({
    title = 'About Booqly',
    description = 'We help small European businesses and freelancers accept bookings without the complexity — beautiful public pages, smart schedules, and automated reminders in one simple platform.',
    mainImage = {
        src: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3',
        alt: 'Small business using EasyBooking on laptop and phone',
    },
    breakout = {
        src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg',
        alt: 'EasyBooking mark',
        title: 'Easy to start',
        description: 'Launch a branded booking page in minutes — no apps or coding.',
        buttonText: 'Create your page',
        buttonUrl: '#get-started',
    },
}: About3Props = {}) => {
    // Four unique tiles (no repetition)
    const tiles = [
        {
            title: 'Instant onboarding',
            description:
                'Add services and working hours — your booking page goes live immediately. No apps, no training.',
            buttonText: 'Start now',
            buttonUrl: '#get-started',
        },
        {
            title: 'Share & embed anywhere',
            description:
                'Use a single link or drop our widget into your website. Works great in Instagram bio and messengers.',
            buttonText: 'Get the widget',
            buttonUrl: '#widget',
        },
        {
            title: 'Availability rules that fit you',
            description:
                'Set buffers, quiet hours, days off, and staff-specific schedules. Slots adapt automatically.',
            buttonText: 'Set availability',
            buttonUrl: '#availability',
        },
        {
            title: 'EU privacy & easy export',
            description:
                'Multilingual (EN/LV/RU), GDPR-minded, and simple CSV/Sheets export when you need your data.',
            buttonText: 'Learn more',
            buttonUrl: '#privacy',
        },
    ]

    return (
        <section className="py-16">
            <>
                <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
                    <h1 className="text-5xl font-semibold">{title}</h1>
                    <p className="text-muted-foreground">{description}</p>
                </div>

                <div className="grid gap-4 lg:grid-cols-4">
                    <img
                        alt={mainImage.alt}
                        className="size-full rounded-xl object-cover w-full col-span-2"
                        src={mainImage.src}
                    />

                    <div className="grid md:grid-cols-2 md:grid-rows-2 col-span-2 gap-4">
                        {tiles.map((t, i) => (
                            <div
                                key={i}
                                className="bg-muted flex row-span-1 flex-col justify-between gap-6 rounded-xl p-7 lg:w-auto"
                            >
                                {/* Reuse the provided breakout image/mark to keep brand consistent */}
                                <img alt={breakout.alt} className="mr-auto h-12" src={breakout.src} />
                                <div>
                                    <p className="mb-2 text-lg font-semibold">{t.title}</p>
                                    <p className="text-muted-foreground">{t.description}</p>
                                </div>
                                <Button
                                    asChild
                                    className="btn-hero btn-hero--blue text-black w-full sm:w-auto"
                                    size={'lg'}
                                    variant="default"
                                >
                                    <a
                                        href={t.buttonUrl}
                                        target={t.buttonUrl.startsWith('http') ? '_blank' : undefined}
                                    >
                                        {t.buttonText}
                                    </a>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        </section>
    )
}
