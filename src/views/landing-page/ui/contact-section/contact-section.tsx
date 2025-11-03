'use client'

import { sendContactMessage } from '@/features/contact/api/send-contact-message'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { useTranslations } from 'next-intl'

import React, { useState } from 'react'

interface ContactFormValues {
    name: string
    email: string
    message: string
}

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

const EMAIL_REGEX =
    // Basic RFC 5322 compliant pattern suitable for simple validation
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

export const ContactSection = () => {
    const t = useTranslations('Landing.contact')
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [feedback, setFeedback] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [values, setValues] = React.useState<ContactFormValues>({
        name: '',
        email: '',
        message: '',
    })
    const [errors, setErrors] = React.useState<ContactFormErrors>({})

    const resetFeedback = React.useCallback(() => {
        setStatus('idle')
        setFeedback(null)
    }, [])

    const handleChange =
        (field: keyof ContactFormValues) =>
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const nextValue = event.target.value
            setValues((prev) => ({ ...prev, [field]: nextValue }))
            setErrors((prev) => ({ ...prev, [field]: undefined }))
            if (status !== 'idle') {
                resetFeedback()
            }
        }

    const validate = React.useCallback(
        (formValues: ContactFormValues): ContactFormErrors => {
            const newErrors: ContactFormErrors = {}
            const trimmedName = formValues.name.trim()
            const trimmedEmail = formValues.email.trim()
            const trimmedMessage = formValues.message.trim()

            if (trimmedName.length < 2) {
                newErrors.name = t('validation.nameMin')
            } else if (trimmedName.length > 120) {
                newErrors.name = t('validation.nameMax')
            }

            if (!EMAIL_REGEX.test(trimmedEmail)) {
                newErrors.email = t('validation.email')
            }

            if (trimmedMessage.length < 10) {
                newErrors.message = t('validation.messageMin')
            } else if (trimmedMessage.length > 2000) {
                newErrors.message = t('validation.messageMax')
            }

            return newErrors
        },
        [t]
    )

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        resetFeedback()

        const trimmedValues: ContactFormValues = {
            name: values.name.trim(),
            email: values.email.trim(),
            message: values.message.trim(),
        }

        const validationErrors = validate(trimmedValues)
        const hasErrors = Object.keys(validationErrors).length > 0

        if (hasErrors) {
            setErrors(validationErrors)
            return
        }

        setErrors({})
        setIsSubmitting(true)

        try {
            await sendContactMessage(trimmedValues)
            setValues({ name: '', email: '', message: '' })
            setStatus('success')
            setFeedback(t('success'))
        } catch (_error) {
            setStatus('error')
            setFeedback(t('errorGeneric'))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="relative flex items-center justify-center px-4">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-border/60 bg-card/90 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.28)] backdrop-blur">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-transparent to-transparent" />
                <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
                        {t('eyebrow')}
                    </span>
                    <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                        {t('title')}
                    </h2>
                    <p className="mt-3 text-base text-muted-foreground sm:text-lg">{t('subtitle')}</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-10 grid gap-6" noValidate>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                            <label
                                className="text-sm font-medium leading-none text-foreground"
                                htmlFor="contact-name"
                            >
                                {t('nameLabel')}
                            </label>
                            <Input
                                id="contact-name"
                                name="name"
                                value={values.name}
                                onChange={handleChange('name')}
                                placeholder={t('namePlaceholder')}
                                autoComplete="name"
                                aria-invalid={Boolean(errors.name)}
                                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                                className="mt-2 h-12 rounded-xl border-none bg-background/80 px-4 shadow-none focus-visible:ring-2 sm:bg-transparent sm:px-4"
                            />
                            {errors.name && (
                                <p id="contact-name-error" className="mt-2 text-sm text-destructive">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                className="text-sm font-medium leading-none text-foreground"
                                htmlFor="contact-email"
                            >
                                {t('emailLabel')}
                            </label>
                            <Input
                                id="contact-email"
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange('email')}
                                placeholder={t('emailPlaceholder')}
                                autoComplete="email"
                                aria-invalid={Boolean(errors.email)}
                                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                                className="mt-2 h-12 rounded-xl border-none bg-background/80 px-4 shadow-none focus-visible:ring-2 sm:bg-transparent sm:px-4"
                            />
                            {errors.email && (
                                <p id="contact-email-error" className="mt-2 text-sm text-destructive">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label
                            className="text-sm font-medium leading-none text-foreground"
                            htmlFor="contact-message"
                        >
                            {t('messageLabel')}
                        </label>
                        <Textarea
                            id="contact-message"
                            name="message"
                            value={values.message}
                            onChange={handleChange('message')}
                            placeholder={t('messagePlaceholder')}
                            aria-invalid={Boolean(errors.message)}
                            aria-describedby={errors.message ? 'contact-message-error' : undefined}
                            className="mt-2 min-h-[160px] rounded-2xl border-none bg-background/80 px-4 py-3 shadow-none focus-visible:ring-2 sm:bg-transparent sm:px-4"
                        />
                        {errors.message && (
                            <p id="contact-message-error" className="mt-2 text-sm text-destructive">
                                {errors.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-muted-foreground sm:max-w-sm sm:text-left">
                            {t('disclaimer')}
                        </p>
                        <Button
                            type="submit"
                            size="lg"
                            className="btn-hero btn-hero--blue min-w-[180px] justify-center text-base font-semibold text-slate-900"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? t('submitting') : t('submit')}
                        </Button>
                    </div>
                </form>

                {feedback && (
                    <div
                        className={`mt-6 rounded-xl px-4 py-3 text-sm ${
                            status === 'success'
                                ? 'bg-emerald-500/10 text-emerald-500'
                                : 'bg-destructive/10 text-destructive'
                        }`}
                    >
                        {feedback}
                    </div>
                )}
            </div>
        </section>
    )
}
