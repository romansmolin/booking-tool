import { Button } from '@/shared/ui/button'
import Image from 'next/image'

const HERO_IMAGE =
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3'

export const HeroSection = () => {
    return (
        <section className=" mx-auto flex w-full max-w-6xl flex-col items-center gap-10 rounded-3xl px-6 text-center  md:gap-12 md:px-14">
            <div className="flex flex-col gap-6 md:gap-8">
                <div className="text-sm font-semibold uppercase tracking-[0.35em] text-white px-8 py-2 rounded-full bg-primary/70 w-fit mx-auto">
                    Booking made easy
                </div>
                <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl md:leading-[1.1]">
                    Simplify your scheduling with
                    <span className="text-primary"> EasyBooq</span>
                </h1>
                <p className="mx-auto max-w-2xl text-base text-primary sm:text-lg md:text-xl">
                    Manage meetings effortlessly across platforms. Connect your calendar, send invites,
                    and sync with one powerful tool.
                </p>
            </div>

            <div className="flex flex-col items-center gap-4 w-full sm:justify-center sm:flex-row sm:max-w-3xs">
                <Button
                    className="btn-hero h-12 text-lg font-semibold text-slate-900 w-full"
                    size="lg"
                    variant="ghost"
                >
                    <span>Get Started</span>
                </Button>
                <Button
                    className="btn-hero h-12 btn-hero--blue text-lg font-semibold text-slate-900 w-full"
                    size="lg"
                    variant="ghost"
                >
                    <span>Learn More</span>
                </Button>
            </div>

            <div className="relative w-full overflow-hidden rounded-[36px] border border-white/10 bg-slate-200/10 shadow-[0_30px_80px_rgba(15,23,42,0.5)]">
                <div className="aspect-video w-full">
                    <Image
                        priority
                        alt="People collaborating in an office setting"
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
