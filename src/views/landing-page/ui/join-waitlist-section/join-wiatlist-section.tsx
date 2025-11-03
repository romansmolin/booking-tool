'use client'

import { signUpOnNewsletter } from '@/features/waitlist/api/sign-up-on-newsletter'
import { DoodleArrow2 } from '@/shared/assets'
import { emailValidationErrorMessage, isValidEmail, normalizeEmail } from '@/shared/lib/validators'
import { Avatar, AvatarImage } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useTranslations } from 'next-intl'

import React from 'react'

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
                setErrorMessage(message === emailValidationErrorMessage ? t('invalidEmail') : t('error'))
            } finally {
                setIsSubmitting(false)
            }
        }

        void submitEmail()
    }

    return (
        <section className="relative flex items-center justify-center px-4">
            <div className="flex w-full max-w-3xl flex-col items-center justify-center text-center">
                <h2 className="pt-2 text-4xl font-semibold leading-tight tracking-tighter md:py-10 md:text-6xl lg:text-7xl">
                    {t('title')}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-center text-base text-muted-foreground sm:text-lg">
                    {t('description')}
                </p>
                <form
                    noValidate
                    className="mt-10 flex w-full max-w-md flex-col gap-4"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-3 p-2 sm:flex-row sm:items-center">
                        <Input
                            aria-invalid={errorMessage ? true : undefined}
                            aria-label={t('emailAriaLabel')}
                            autoComplete="email"
                            className="h-12 w-full border-none  px-4 ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-0 active:ring-0 sm:bg-transparent sm:px-4"
                            placeholder={t('emailPlaceholder')}
                            type="email"
                            value={email}
                            onChange={handleChange}
                        />
                        <Button
                            className="btn-hero btn-hero--blue w-full text-black sm:w-auto"
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
                <div className="mt-8 flex items-center gap-3">
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
            <DoodleArrow2 className="absolute hidden md:block md:size-28 md:left-0 fill-primary rotate-32 bottom-0 lg:left-20" />
            <DoodleArrow2 className="absolute hidden md:block md:size-28 md:left-0 fill-primary -rotate-32 -scale-y-100 top-0 lg:left-20" />

            {/* <DoodleArrow2 className="fill-primary" /> */}
            <DoodleArrow2 className="absolute hidden md:block md:size-28 md:right-0 lg:right-20 bottom-0 fill-primary -scale-x-100 -rotate-32" />
            <DoodleArrow2 className="absolute hidden md:block md:size-28 md:right-0 lg:right-20 top-0 fill-primary -scale-x-100 -scale-y-100 rotate-32" />
        </section>
    )
}
