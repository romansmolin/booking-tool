export type LandingFeatureId =
    | 'brandedPage'
    | 'smartScheduling'
    | 'omnichannelWidget'
    | 'operationalControl'

export type LandingFeature = {
    id: LandingFeatureId
    imageUrl: string
    position: 'left' | 'right'
    listItemKeys: string[]
    primaryCtaHref: string
}

export const featuresData: LandingFeature[] = [
    {
        id: 'brandedPage',
        imageUrl:
            'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3',
        position: 'right',
        listItemKeys: ['services', 'staff', 'socialProof'],
        primaryCtaHref: '#join',
    },
    {
        id: 'smartScheduling',
        imageUrl:
            'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3',
        position: 'left',
        listItemKeys: ['autoSlots', 'calendarSync', 'reminders'],
        primaryCtaHref: '#join',
    },
    {
        id: 'omnichannelWidget',
        imageUrl:
            'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3',
        position: 'right',
        listItemKeys: ['widget', 'languages', 'flow'],
        primaryCtaHref: '#join',
    },
    {
        id: 'operationalControl',
        imageUrl:
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3',
        position: 'left',
        listItemKeys: ['onboarding', 'updates', 'export'],
        primaryCtaHref: '#join',
    },
]
