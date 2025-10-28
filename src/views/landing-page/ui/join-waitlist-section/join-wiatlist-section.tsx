'use client'

import React from 'react'

import { signUpOnNewsletter } from '@/features/waitlist/api/sign-up-on-newsletter'
import { emailValidationErrorMessage, isValidEmail, normalizeEmail } from '@/shared/lib/validators'
import { Avatar, AvatarImage } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useTranslations } from 'next-intl'

export const JoinWaitlistSection = () => {
    const t = useTranslations('Landing.waitlist')
    const [email, setEmail] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const handleChange = (event: React.ChangeEvent<globalThis.HTMLInputElement>) => {
        setEmail(event.target.value)

        if (errorMessage) {
            setErrorMessage(null)
        }

        if (successMessage) {
            setSuccessMessage(null)
        }
    }

    const handleSubmit = (event: React.FormEvent<globalThis.HTMLFormElement>) => {
        event.preventDefault()

        const trimmedEmail = email.trim()

        if (!isValidEmail(trimmedEmail)) {
            setErrorMessage(t('invalidEmail'))
            return
        }

        setErrorMessage(null)
        setIsSubmitting(true)

        const submitEmail = async () => {
            try {
                await signUpOnNewsletter(normalizeEmail(trimmedEmail))

                setSuccessMessage(t('success'))
                setEmail('')
            } catch (error) {
                globalThis.console.error('[waitlist] Failed to submit email', error)
                const message = error instanceof Error ? error.message : null
                setErrorMessage(
                    message === emailValidationErrorMessage ? t('invalidEmail') : t('error'),
                )
            } finally {
                setIsSubmitting(false)
            }
        }

        void submitEmail()
    }

    return (
        <section className="flex items-center justify-center py-16 ">
            <div className="flex items-center justify-center w-full flex-col px-4">
                <h2 className="py-2 text-center text-5xl font-semibold tracking-tighter md:py-10 lg:text-8xl">
                    {t('title')}
                </h2>
                <p className="text-md text-muted-foreground mx-auto max-w-xl text-center lg:text-lg">
                    {t('description')}
                </p>
                <form
                    noValidate
                    className="mt-10 flex flex-col w-full max-w-md gap-3"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col items-center gap-3 rounded-full p-1 sm:flex-row">
                        <Input
                            aria-invalid={errorMessage ? true : undefined}
                            aria-label={t('emailAriaLabel')}
                            autoComplete="email"
                            className="bg-muted h-12 w-full border-none shadow-none ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-0 active:ring-0"
                            placeholder={t('emailPlaceholder')}
                            type="email"
                            value={email}
                            onChange={handleChange}
                        />
                        <Button
                            className="btn-hero  btn-hero--blue text-black w-full sm:w-auto"
                            disabled={isSubmitting}
                            size={'lg'}
                            type="submit"
                        >
                            {isSubmitting ? t('submitting') : t('submit')}
                        </Button>
                    </div>
                    <div aria-live="polite" className="min-h-5 text-sm">
                        {errorMessage && <p className="text-destructive">{errorMessage}</p>}
                        {!errorMessage && successMessage && (
                            <p className="text-emerald-600">{successMessage}</p>
                        )}
                    </div>
                </form>
                <div className="mt-10 flex items-center gap-2">
                    <span className="inline-flex items-center -space-x-2.5">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Avatar key={index} className="size-8">
                                <AvatarImage
                                    alt="placeholder"
                                    src={`https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/avatar${index + 1}.png`}
                                />
                            </Avatar>
                        ))}
                    </span>
                    <p className="text-muted-foreground/80 tracking-tight">{t('joinedCount')}</p>
                </div>
            </div>
        </section>
    )
}
