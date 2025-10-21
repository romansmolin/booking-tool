import { Button } from '@/shared/ui/button'
import { ArrowBigRight } from 'lucide-react'

export const featuresData = [
    {
        badgeText: 'Enhance Your Business',
        imageUrl:
            'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3',
        position: 'right' as const,
        title: 'Create a professional booking page in minutes',
        subtitle:
            'Build a sleek, customizable booking interface that reflects your brand. No coding required, just drag and drop.',
        listItems: [
            'Customize your look and feel.',
            'Match your brand colors and style.',
            'Mobile responsive design.',
        ],
        mainButton: (
            <Button size="lg" variant="default">
                Explore templates
            </Button>
        ),
        secondaryButton: (
            <Button className="flex items-center" size="lg" variant="outline">
                Contact Us <ArrowBigRight />
            </Button>
        ),
    },
    {
        badgeText: 'Teams & Workflows',
        imageUrl:
            'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3',
        position: 'left' as const,
        title: 'Track and manage your bookings with powerful analytics',
        subtitle:
            'Gain real-time insights into your scheduling patterns, client interactions, and business performance.',
        listItems: [
            'Drag-and-drop builder for multi-step booking flows.',
            'Conditional logic to gather the right details every time.',
            'Instant hand-offs to your CRM, helpdesk, or payment tools.',
        ],
        mainButton: (
            <Button size="lg" variant="default">
                Build a workflow
            </Button>
        ),
        secondaryButton: (
            <Button size="lg" variant="outline">
                See templates
            </Button>
        ),
    },
]
