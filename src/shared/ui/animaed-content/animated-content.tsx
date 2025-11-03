'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import React, { CSSProperties, ReactNode, useEffect, useMemo, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedContentProps {
    children: ReactNode
    distance?: number
    direction?: 'vertical' | 'horizontal'
    reverse?: boolean
    duration?: number
    ease?: string | (() => number)
    initialOpacity?: number
    animateOpacity?: boolean
    scale?: number
    threshold?: number
    delay?: number
    onComplete?: () => void
    className?: string
    style?: CSSProperties
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
    children,
    distance = 60,
    direction = 'vertical',
    reverse = false,
    duration = 0.55,
    ease = 'power3.out',
    initialOpacity = 0,
    animateOpacity = true,
    scale = 1,
    threshold = 0.1,
    delay = 0,
    onComplete,
    className = '',
    style,
}) => {
    // eslint-disable-next-line no-undef
    const ref = useRef<HTMLDivElement>(null)
    const axis = direction === 'horizontal' ? 'X' : 'Y'
    const offset = reverse ? -distance : distance

    const initialStyle = useMemo(() => {
        const transformParts = []

        if (offset !== 0) {
            transformParts.push(`translate${axis}(${offset}px)`)
        }

        if (scale !== 1) {
            transformParts.push(`scale(${scale})`)
        }

        const transform = transformParts.length > 0 ? transformParts.join(' ') : undefined

        return {
            ...style,
            opacity: animateOpacity ? initialOpacity : 1,
            transform,
            visibility: 'hidden',
        } as CSSProperties
    }, [animateOpacity, initialOpacity, offset, scale, axis, style])

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const axisKey = direction === 'horizontal' ? 'x' : 'y'
        const startPct = (1 - threshold) * 100

        gsap.set(el, {
            [axisKey]: offset,
            scale,
            opacity: animateOpacity ? initialOpacity : 1,
            visibility: 'visible',
        })

        const tween = gsap.to(el, {
            [axisKey]: 0,
            scale: 1,
            opacity: 1,
            duration,
            ease,
            delay,
            onComplete,
            scrollTrigger: {
                trigger: el,
                start: `top ${startPct}%`,
                toggleActions: 'play none none none',
                once: true,
            },
        })

        return () => {
            tween.scrollTrigger?.kill()
            tween.kill()
        }
    }, [
        distance,
        direction,
        reverse,
        duration,
        ease,
        initialOpacity,
        animateOpacity,
        scale,
        threshold,
        delay,
        onComplete,
    ])

    return (
        <div ref={ref} className={className} style={initialStyle}>
            {children}
        </div>
    )
}

export default AnimatedContent
