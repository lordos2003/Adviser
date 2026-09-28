import type React from 'react'
import { useCallback } from 'react'
import { m, useMotionTemplate, useMotionValue } from 'motion/react'

import { cn } from '@/lib/utils'

/**
 * Magic UI MagicCard (gradient mode), упрощён: без next-themes,
 * цвет подсветки задаётся акцентом направления.
 */
interface MagicCardProps {
  children?: React.ReactNode
  className?: string
  gradientSize?: number
  gradientColor?: string
  gradientOpacity?: number
  gradientFrom?: string
  gradientTo?: string
}

export function MagicCard({
  children,
  className,
  gradientSize = 260,
  gradientColor = 'rgb(37 99 255 / 0.08)',
  gradientOpacity = 1,
  gradientFrom = '#2563ff',
  gradientTo = '#6b3cf5',
}: MagicCardProps) {
  const mouseX = useMotionValue(-gradientSize)
  const mouseY = useMotionValue(-gradientSize)

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY],
  )
  const reset = useCallback(() => {
    mouseX.set(-gradientSize)
    mouseY.set(-gradientSize)
  }, [mouseX, mouseY, gradientSize])

  const border = useMotionTemplate`
    linear-gradient(var(--color-card) 0 0) padding-box,
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientFrom}, ${gradientTo}, var(--color-border) 100%) border-box`
  const glow = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)`

  return (
    <m.div
      className={cn('group relative isolate overflow-hidden border border-transparent', className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={{ background: border }}
    >
      <m.div
        aria-hidden
        className="pointer-events-none absolute inset-px z-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glow, opacity: gradientOpacity }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </m.div>
  )
}
