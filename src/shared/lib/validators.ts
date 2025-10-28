const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const isValidEmail = (value: unknown): value is string => {
    if (typeof value !== 'string') {
        return false
    }

    return emailRegex.test(value.trim())
}

export const normalizeEmail = (value: string) => value.trim().toLowerCase()

export const emailValidationErrorMessage = 'Please provide a valid email address.'

