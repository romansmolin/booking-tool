'use client'

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
    { key: 'solutions', href: '#solutions' },
    { key: 'faq', href: '#faq' },
    { key: 'join', href: '#join' },
] as const

type NavListProps = {
    direction?: 'horizontal' | 'vertical'
    className?: string
}

const NavList = ({ direction = 'vertical', className }: NavListProps) => {
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
                        className="block rounded-md px-2 text-lg font-extrabold border-primary transition-all duration-300"
                        href={item.href}
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

                <nav aria-label="Primary navigation" className="hidden md:block">
                    <NavList className="text-primary" direction="horizontal" />
                </nav>
            </div>

            <div className="hidden gap-3 md:flex">
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
                <ThemeToggler />
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        aria-controls="mobile-navigation"
                        className="border-primary bg-transparent text-primary md:hidden"
                        size="icon"
                        type="button"
                        variant="outline"
                    >
                        <MenuIcon aria-hidden="true" />
                    </Button>
                </SheetTrigger>

                <SheetContent
                    aria-label="Mobile navigation"
                    className="md:hidden gap-8 border-l border-primary px-4 py-6"
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
                        <NavList className="text-primary" />
                    </nav>
                </SheetContent>
            </Sheet>
        </header>
    )
}
