import { Button } from '@/shared/ui/button'
import { ArrowBigRight } from 'lucide-react'

export const featuresData = [
    {
        badgeText: 'Effortless Setup',
        imageUrl:
            'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3',
        position: 'right' as const,
        title: 'Create your own booking page in minutes',
        subtitle:
            'Launch a clean, professional booking page instantly. Customize colors, layout, and branding — no apps or coding required.',
        listItems: [
            'Personal link like Booqly.eu/salon-lina',
            'Customize colors, fonts, and brand visuals',
            'Works perfectly on any device',
        ],
        mainButton: (
            <Button
                className="btn-hero w-full md:w-auto h-12 text-lg font-semibold text-slate-900"
                size="lg"
                variant="default"
            >
                Create My Page
            </Button>
        ),
        secondaryButton: (
            <Button
                className="btn-hero w-full md:w-auto h-12 btn-hero--blue text-lg font-semibold text-slate-900"
                size="lg"
                variant="default"
            >
                See Demo <ArrowBigRight />
            </Button>
        ),
    },
    {
        badgeText: 'Smart Scheduling',
        imageUrl:
            'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3',
        position: 'left' as const,
        title: 'Stay in control with smart, auto-generated schedules',
        subtitle:
            'Booqly automatically generates available time slots based on your working hours and service durations — no double-bookings, no manual updates.',
        listItems: [
            'Auto-slots by staff availability and service length',
            'Prevent overlaps and double-bookings automatically',
            'Drag-and-drop daily calendar view',
        ],
        mainButton: (
            <Button
                className="btn-hero w-full md:w-auto text-lg font-semibold text-slate-900"
                size="lg"
                variant="default"
            >
                Try Scheduling
            </Button>
        ),
        secondaryButton: (
            <Button
                className="btn-hero w-full md:w-auto btn-hero--blue text-lg font-semibold text-slate-900"
                size="lg"
                variant="default"
            >
                Learn More <ArrowBigRight />
            </Button>
        ),
    },
    {
        badgeText: 'Automated Reminders',
        imageUrl:
            'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3',
        position: 'right' as const,
        title: 'Reduce no-shows with smart notifications',
        subtitle:
            'Automatic reminders keep clients and staff in sync — through email or Telegram. No missed appointments, no manual follow-ups.',
        listItems: [
            '24h and 1h reminders before each visit',
            'Email and Telegram notifications out-of-the-box',
            'Instant updates when clients reschedule or cancel',
        ],
        mainButton: (
            <Button
                className="btn-hero w-full md:w-auto text-lg font-semibold text-slate-900"
                size="lg"
                variant="default"
            >
                Automate My Bookings
            </Button>
        ),
        secondaryButton: (
            <Button
                className="btn-hero w-full md:w-auto btn-hero--blue text-lg font-semibold text-slate-900"
                size="lg"
                variant="default"
            >
                How It Works <ArrowBigRight />
            </Button>
        ),
    },
    {
        badgeText: 'Localization & Trust',
        imageUrl:
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3',
        position: 'left' as const,
        title: 'Built for small European businesses',
        subtitle:
            'Multilingual, GDPR-compliant, and hosted in the EU. Booqly is designed for modern European creators and service providers.',
        listItems: [
            'Available in English, Latvian, and Russian',
            'GDPR-ready with secure EU hosting',
            'Clean, trustworthy design your clients will love',
        ],
        mainButton: (
            <Button
                className="btn-hero w-full md:w-auto text-lg font-semibold text-slate-900"
                size="lg"
                variant="default"
            >
                Join Early Access
            </Button>
        ),
        secondaryButton: (
            <Button
                className="btn-hero w-full md:w-auto btn-hero--blue text-lg font-semibold text-slate-900"
                size="lg"
                variant="default"
            >
                Contact Us <ArrowBigRight />
            </Button>
        ),
    },
]
