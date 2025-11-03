import * as React from 'react'

import { cn } from '@/shared/lib/utils'

const Textarea = React.forwardRef<
    HTMLTextAreaElement,
    React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
    return (
        <textarea
            ref={ref}
            className={cn(
                'border-input bg-background ring-offset-background placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex min-h-[120px] w-full rounded-xl border px-4 py-3 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm',
                'dark:bg-input/30 dark:border-input dark:focus-visible:ring-input',
                className,
            )}
            {...props}
        />
    )
})

Textarea.displayName = 'Textarea'

export { Textarea }
