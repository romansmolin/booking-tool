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
        <header className="flex max-w-7xl m-auto bg-card items-center justify-between gap-3 rounded-xl border border-primary px-3 py-4 shadow-sm">
            <div className="flex gap-12 items-center">
                <Link
                    aria-label="EasyBooq home"
                    className="flex items-center gap-2 text-primary"
                    href="/"
                >
                    <Logo />
                    <span className="text-xl font-extrabold italic">EasyBooq</span>
                </Link>

                <nav aria-label="Primary navigation" className="hidden md:block">
                    <NavList className="text-primary" direction="horizontal" />
                </nav>
            </div>

            <div className="hidden md:flex gap-3">
                <Button
                    className="relative border border-slate-900 bg-linear-to-b from-[#f9f9fb] to-[#e5e7eb]  text-lg font-semibold text-slate-900 shadow-[0_3px_0_rgba(15,23,42,0.85)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_9px_0_rgba(15,23,42,0.75)] focus-visible:ring-0 active:translate-y-[2px] active:shadow-[0_6px_0_rgba(15,23,42,0.85)] "
                    size="lg"
                    variant="ghost"
                >
                    <span className="block  from-white/90 to-transparent px-2 py-0.5">Demo</span>
                </Button>
                <Button
                    className="relative  border border-slate-900 bg-linear-to-b from-[#e7f0ff] to-[#cfdfff]  text-lg font-semibold text-slate-900 shadow-[0_3px_0_rgba(15,23,42,0.85)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_9px_0_rgba(15,23,42,0.75)] focus-visible:ring-0 active:translate-y-[2px] active:shadow-[0_6px_0_rgba(15,23,42,0.85)] "
                    size="lg"
                    variant="ghost"
                >
                    <span className="block  from-white/80 to-transparent px-2 py-0.5">Contact</span>
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
                            aria-label="EasyBooq home"
                            className="flex items-center gap-2 text-primary"
                            href="/"
                        >
                            <Logo />
                            <span className="text-xl font-extrabold italic">EasyBooq</span>
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
