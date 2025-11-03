const CONTACT_ENDPOINT = '/api/contact'

export interface ContactRequestPayload {
    name: string
    email: string
    message: string
}

export const sendContactMessage = async (payload: ContactRequestPayload) => {
    const response = await globalThis.fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    let data: { status?: string; message?: string } | null = null

    try {
        data = await response.json()
    } catch {
        data = null
    }

    if (!response.ok) {
        globalThis.console.error('[contact] API responded with an error', data)

        throw new Error(data?.message ?? 'Unable to send your message.')
    }

    return data
}

export type SendContactMessageResponse = Awaited<typeof sendContactMessage>
