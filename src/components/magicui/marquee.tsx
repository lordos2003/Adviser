import { type ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/utils'

/** Magic UI Marquee (адаптирован под Tailwind v4 токены проекта) */
interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  reverse?: boolean
  pauseOnHover?: boolean
  repeat?: number
}

export function Marquee({ className, reverse = false, pauseOnHover = false, children, repeat = 4, ...props }: MarqueeProps) {
  return (
    <div {...props} className={cn('group flex gap-(--gap) overflow-hidden [--duration:40s] [--gap:1rem]', className)}>
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 || undefined}
          className={cn(
            'flex shrink-0 animate-marquee flex-row justify-around gap-(--gap) motion-reduce:animate-none',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
            reverse && '[animation-direction:reverse]',
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
