'use client'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Logo } from '@/shared/ui/logo'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/ui/sheet'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'

import React from 'react'

const NAV_ITEMS = [
    { label: 'Features', href: '#features' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Join Us', href: '#join-us' },
]

type NavListProps = {
    direction?: 'horizontal' | 'vertical'
    className?: string
}

const NavList = ({ direction = 'vertical', className }: NavListProps) => (
    <ul
        className={cn(
            'list-none',
            direction === 'vertical'
                ? 'flex flex-col gap-4 text-lg'
                : 'flex items-center gap-4 text-sm mt-[5px]',
            className
        )}
    >
        {NAV_ITEMS.map((item) => (
            <li key={item.href} className="group">
                <Link
                    className="block text-lg font-extrabold rounded-md px-2  border-primary transition-all duration-300 "
                    href={item.href}
                >
                    {item.label}
                </Link>
                <div className="group-hover:opacity-100 group-hover:w-full w-0 opacity-0 transition-all ease-in-out duration-300 h-0.5 rounded-2xl bg-primary"></div>
            </li>
        ))}
    </ul>
)

export const Header = () => {
    return (
        <header className="flex w-full bg-card items-center justify-between gap-3 rounded-xl border border-primary px-3 py-4 shadow-sm">
            <div className="flex gap-12 items-center">
                <Link aria-label="Booqly home" className="flex items-center gap-2 text-primary" href="/">
                    <Logo />
                    <span className="text-xl font-extrabold italic">Booqly</span>
                </Link>

                <nav aria-label="Primary navigation" className="hidden md:block">
                    <NavList className="text-primary" direction="horizontal" />
                </nav>
            </div>

            <div className="hidden gap-3 md:flex">
                <Button
                    className="btn-hero text-lg font-semibold text-slate-900 "
                    size="lg"
                    variant="ghost"
                >
                    <span>Demo</span>
                </Button>
                <Button
                    className="btn-hero btn-hero--blue  text-lg font-semibold text-slate-900"
                    size="lg"
                    variant="ghost"
                >
                    <span>Contact</span>
                </Button>
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
                        <SheetTitle className="sr-only">Navigation</SheetTitle>
                        <Link
                            aria-label="Booqly home"
                            className="flex items-center gap-2 text-primary"
                            href="/"
                        >
                            <Logo />
                            <span className="text-xl font-extrabold italic">Booqly</span>
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
