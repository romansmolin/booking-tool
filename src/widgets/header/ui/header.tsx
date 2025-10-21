'use client'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Logo } from '@/shared/ui/logo'
import { MenuIcon, X } from 'lucide-react'

import React, { useEffect, useRef, useState } from 'react'

const NAV_ITEMS = [
    { label: 'Features', href: '#features' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Join Us', href: '#join-us' },
]

const NavLinks = ({ className }: { className?: string }) => (
    <ul className={cn('list-none', className)}>
        {NAV_ITEMS.map((item) => (
            <li key={item.href}>
                <a
                    className="block rounded-md px-2 py-1 font-medium transition-colors duration-200 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    href={item.href}
                >
                    {item.label}
                </a>
            </li>
        ))}
    </ul>
)

export const Header = () => {
    const [open, setOpen] = useState(false)
    const headerRef = useRef<HTMLElement | null>(null)
    const [menuTop, setMenuTop] = useState<number | null>(null)

    useEffect(() => {
        const updateMenuTop = () => {
            if (!headerRef.current) {
                return
            }

            const { bottom } = headerRef.current.getBoundingClientRect()
            setMenuTop(bottom + 16) // place the menu just below the header with 1rem gap
        }

        updateMenuTop()
        window.addEventListener('resize', updateMenuTop)

        return () => {
            window.removeEventListener('resize', updateMenuTop)
        }
    }, [])

    useEffect(() => {
        if (!open) {
            return
        }

        if (!headerRef.current) {
            return
        }

        const { bottom } = headerRef.current.getBoundingClientRect()
        setMenuTop(bottom + 16)
    }, [open])

    return (
        <>
            <header ref={headerRef} className="rounded-xl border border-primary px-3 py-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                    <a
                        aria-label="EasyBooq home"
                        className="flex items-center gap-2 text-primary"
                        href="/"
                    >
                        <Logo />
                        <span className="text-xl font-extrabold italic">EasyBooq</span>
                    </a>

                    <nav aria-label="Primary navigation" className="hidden md:block">
                        <NavLinks className="flex items-center gap-6 text-sm text-primary" />
                    </nav>

                    <div className="md:hidden">
                        <Button
                            aria-controls="mobile-navigation"
                            aria-expanded={open}
                            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
                            className="border-primary bg-transparent text-primary"
                            size="icon"
                            type="button"
                            variant="outline"
                            onClick={() => setOpen((prev) => !prev)}
                        >
                            {open ? <X aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
                        </Button>
                    </div>
                </div>
            </header>

            <nav
                aria-hidden={!open}
                aria-label="Primary navigation"
                id="mobile-navigation"
                style={menuTop ? { top: `${menuTop}px` } : undefined}
                className={cn(
                    'pointer-events-none fixed inset-x-4 z-50 md:hidden rounded-xl border border-primary bg-background/95 px-4 text-center text-primary text-lg shadow-lg backdrop-blur transition-all duration-300 ease-in-out',
                    open
                        ? 'pointer-events-auto opacity-100 translate-y-0 py-4'
                        : 'opacity-0 -translate-y-2 py-0'
                )}
            >
                <NavLinks className="flex flex-col gap-3" />
            </nav>
        </>
    )
}
