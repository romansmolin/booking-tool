const WAITLIST_ENDPOINT = '/api/waitlist'

export const signUpOnNewsletter = async (
    emailAddress: string,
    status: 'subscribed' = 'subscribed',
) => {
    const response = await globalThis.fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            emailAddress,
            status,
        }),
    })

    let data: { message?: string } | null = null

    try {
        data = await response.json()
    } catch {
        data = null
    }

    if (!response.ok) {
        globalThis.console.error('[waitlist] API responded with an error', data)

        throw new Error(data?.message ?? 'Unable to join the waitlist.')
    }

    return data
}

export type SignUpOnNewsletterResponse = Awaited<ReturnType<typeof signUpOnNewsletter>>
