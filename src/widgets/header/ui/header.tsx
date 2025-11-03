'use client'

import { LanguageSwitcher } from '@/features/i18n'
import { ThemeToggler } from '@/features/theme'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Logo } from '@/shared/ui/logo'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/ui/sheet'
import { MenuIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import React from 'react'

const NAV_ITEMS = [
    { key: 'features', href: '#features' },
    { key: 'howItWorks', href: '#how-it-works' },
    { key: 'about', href: '#about' },
    { key: 'contact', href: '#contact' },
    { key: 'join', href: '#join' },
] as const

type NavListProps = {
    direction?: 'horizontal' | 'vertical'
    className?: string
    onNavigate?: (href: string) => void
}

const NavList = ({ direction = 'vertical', className, onNavigate }: NavListProps) => {
    const t = useTranslations('Header.nav')

    return (
        <ul
            className={cn(
                'list-none',
                direction === 'vertical'
                    ? 'flex flex-col gap-4 text-lg'
                    : 'mt-[5px] flex items-center gap-4 text-sm',
                className
            )}
        >
            {NAV_ITEMS.map((item) => (
                <li key={item.href} className="group">
                    <Link
                        className="block rounded-lg px-2 text-lg font-extrabold border-primary transition-all duration-300"
                        href={item.href}
                        onClick={(event) => {
                            if (onNavigate) {
                                event.preventDefault()
                                onNavigate(item.href)
                            }
                        }}
                    >
                        {t(item.key)}
                    </Link>
                    <div className="h-0.5 w-0 rounded-2xl bg-primary opacity-0 transition-all duration-300 ease-in-out group-hover:w-full group-hover:opacity-100"></div>
                </li>
            ))}
        </ul>
    )
}

export const Header = () => {
    const t = useTranslations('Header')
    const [isSheetOpen, setIsSheetOpen] = React.useState(false)
    const [pendingHref, setPendingHref] = React.useState<string | null>(null)

    const handleMobileNavigate = React.useCallback((href: string) => {
        setPendingHref(href)
        setIsSheetOpen(false)
    }, [])

    React.useEffect(() => {
        if (typeof window === 'undefined') return
        if (isSheetOpen) return
        if (!pendingHref) return

        const href = pendingHref
        const scrollToTarget = () => {
            if (href.startsWith('#')) {
                const target = document.querySelector(href)
                if (target instanceof HTMLElement) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    if ('history' in window) {
                        window.history.replaceState(null, '', href)
                    }
                }
            } else {
                window.location.href = href
            }
            setPendingHref(null)
        }

        const timer = window.setTimeout(() => {
            window.requestAnimationFrame(scrollToTarget)
        }, 250)

        return () => {
            window.clearTimeout(timer)
        }
    }, [isSheetOpen, pendingHref])

    return (
        <header className="flex w-full bg-card items-center justify-between gap-3 rounded-xl border border-primary px-3 py-4 shadow-sm">
            <div className="flex gap-12 items-center">
                <Link
                    aria-label={t('brandAriaLabel')}
                    className="flex items-center gap-2 text-primary"
                    href="/"
                >
                    <Logo />
                    <span className="text-xl font-extrabold ">Booqly</span>
                </Link>

                <nav aria-label="Primary navigation" className="hidden lg:block">
                    <NavList className="text-primary" direction="horizontal" />
                </nav>
            </div>

            <div className="hidden gap-3 lg:flex">
                {/* <Button
                    asChild
                    className="btn-hero text-lg font-semibold text-slate-900 "
                    size="lg"
                    variant="ghost"
                >
                    <Link href="#how-it-works">
                        <span>{t('demo')}</span>
                    </Link>
                </Button> */}
                <Button
                    asChild
                    className="btn-hero btn-hero--blue  text-lg font-semibold text-slate-900"
                    size="lg"
                    variant="ghost"
                >
                    <Link href="#contact">
                        <span>{t('contact')}</span>
                    </Link>
                </Button>
                <LanguageSwitcher />
                <ThemeToggler />
            </div>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                    <Button
                        aria-controls="mobile-navigation"
                        className="border-primary bg-transparent text-primary lg:hidden"
                        size="icon"
                        type="button"
                        variant="outline"
                    >
                        <MenuIcon aria-hidden="true" />
                    </Button>
                </SheetTrigger>

                <SheetContent
                    aria-label="Mobile navigation"
                    className="lg:hidden gap-8 border-l border-primary px-4 py-6 z-500"
                >
                    <SheetHeader className="flex items-start gap-3 p-0">
                        <SheetTitle className="sr-only">{t('navTitle')}</SheetTitle>
                        <Link
                            aria-label={t('brandAriaLabel')}
                            className="flex items-center gap-2 text-primary"
                            href="/"
                        >
                            <Logo />
                            <span className="text-xl font-extrabold ">Booqly</span>
                        </Link>
                    </SheetHeader>

                    <nav id="mobile-navigation">
                        <NavList className="text-primary" onNavigate={handleMobileNavigate} />
                    </nav>
                </SheetContent>
            </Sheet>
        </header>
    )
}
