import type React from 'react'

import { BlurFade } from '@/components/magicui/blur-fade'
import { cn } from '@/lib/utils'

export function SectionHead({
  index,
  label,
  title,
  aside,
  id,
  dark = false,
}: {
  index: string
  label: string
  title: React.ReactNode
  aside?: React.ReactNode
  id: string
  dark?: boolean
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-8">
        <BlurFade>
          <p
            className={cn(
              'flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.22em] uppercase',
              dark ? 'text-white/50' : 'text-mute',
            )}
          >
            <span className={dark ? 'text-white/80' : 'text-ink'}>({index})</span>
            <span className={cn('h-px w-8', dark ? 'bg-white/25' : 'bg-ink/20')} />
            {label}
          </p>
        </BlurFade>
        <BlurFade delay={0.06}>
          <h2
            id={id}
            className={cn(
              'mt-6 text-[clamp(2.25rem,5.6vw,4.75rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-balance',
              dark ? 'text-white' : 'text-ink',
            )}
          >
            {title}
          </h2>
        </BlurFade>
      </div>
      {aside && (
        <BlurFade delay={0.12} className="lg:col-span-4 lg:pb-2">
          <p className={cn('max-w-sm text-[1.0625rem] leading-relaxed', dark ? 'text-white/60' : 'text-ink-soft')}>{aside}</p>
        </BlurFade>
      )}
    </div>
  )
}
