import { useCallback, useState } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

import { SignalCanvas } from '@/components/signal-canvas'
import { Button } from '@/components/ui/button'
import { accent, directions, type Mode } from '@/content'
import { cn } from '@/lib/utils'

const ORDER: Mode[] = ['voice', 'code', 'trade']
const CYCLE_MS = 5200
const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const reduce = useReducedMotion()
  const [mode, setMode] = useState<Mode>('voice')
  const [hovering, setHovering] = useState(false)
  const [locked, setLocked] = useState(false)
  const autoplay = !reduce && !locked

  const next = useCallback(() => setMode((m) => ORDER[(ORDER.indexOf(m) + 1) % ORDER.length]), [])

  const choose = (m: Mode) => {
    setMode(m)
    setLocked(true)
  }

  const intro = (i: number) =>
    reduce
      ? {}
      : {
          initial: { y: '105%' },
          animate: { y: 0 },
          transition: { duration: 1.1, delay: 0.15 + i * 0.09, ease },
        }
  const fade = (d: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease } }

  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex min-h-svh flex-col pt-24 pb-4 sm:pt-32 lg:pt-28">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 sm:pb-10 lg:px-12">
        <m.div {...fade(0.05)} className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[0.625rem] tracking-[0.26em] text-mute sm:text-[0.6875rem]">
            ТЕХНОЛОГИИ <span className="text-ink/25">•</span> СТРАТЕГИИ <span className="text-ink/25">•</span> ВОЗМОЖНОСТИ
          </p>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-card/70 py-1.5 pr-3.5 pl-2.5 text-[0.8125rem] font-medium text-ink-2 backdrop-blur">
            <span className="relative flex size-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-trade/50 motion-reduce:hidden" />
              <span className="relative size-2.5 rounded-full bg-trade" />
            </span>
            Открыт к сотрудничеству
          </p>
        </m.div>

        <div
          className="relative mt-8 [--fs:16.5vw] sm:mt-12 sm:[--fs:14vw] lg:mt-10 lg:[--fs:clamp(5rem,min(9.6vw,14.5vh),9.75rem)]"
          onPointerEnter={() => setHovering(true)}
          onPointerLeave={() => setHovering(false)}
        >
          <h1
            id="hero-title"
            className="text-(length:--fs) leading-[0.88] font-semibold tracking-[-0.058em] text-ink"
          >
            {directions.map((d, i) => {
              const active = mode === d.id
              return (
                <span key={d.id} className="block overflow-hidden pb-[0.04em]">
                  <m.span
                    {...intro(i)}
                    onPointerEnter={() => setMode(d.id)}
                    className="relative inline-flex items-start transition-colors duration-700 ease-(--ease-out-expo)"
                    style={{ color: active ? accent[d.id] : undefined }}
                  >
                    {d.word}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'mt-[0.2em] ml-[0.12em] font-mono text-[max(0.6875rem,0.085em)] font-medium tracking-[0.1em] transition-opacity duration-500',
                        active ? 'opacity-100' : 'opacity-35',
                      )}
                    >
                      {d.index}
                    </span>
                  </m.span>
                </span>
              )
            })}
          </h1>

          <m.div
            {...fade(0.55)}
            className="mt-8 max-w-md lg:absolute lg:right-0 lg:bottom-[calc(var(--fs)*0.95)] lg:mt-0 lg:max-w-[23rem] xl:max-w-[25rem]"
          >
            <p className="text-[1.0625rem] leading-relaxed text-ink-soft sm:text-lg">
              Коммуникации, технологии и финансы. Создаю решения, которые работают и приносят
              <span className="font-serif text-[1.2em] leading-none text-ink italic"> реальную ценность.</span>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href="#contact">
                  Обсудить задачу
                  <ArrowUpRight className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="#directions">
                  Направления
                  <ArrowDown className="transition-transform duration-300 group-hover/btn:translate-y-0.5" />
                </a>
              </Button>
            </div>
          </m.div>
        </div>
      </div>

      {/* Сигнальная полоса во всю ширину */}
      <m.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.5 }}
        className="relative mt-8 h-[clamp(150px,24vh,250px)] sm:mt-auto lg:h-[clamp(120px,19vh,230px)]"
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
      >
        <SignalCanvas mode={mode} />
      </m.div>

      {/* Переключатель режимов */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div role="group" aria-label="Режим сигнала: выберите направление" className="grid grid-cols-3 gap-2 sm:gap-4">
          {directions.map((d) => {
            const active = mode === d.id
            return (
              <button
                key={d.id}
                type="button"
                aria-pressed={active}
                onClick={() => choose(d.id)}
                onPointerEnter={() => setHovering(true)}
                onPointerLeave={() => setHovering(false)}
                className="group relative pt-4 pb-2 text-left outline-offset-4"
              >
                <span className="absolute inset-x-0 top-0 h-px overflow-hidden bg-ink/12">
                  {active && autoplay ? (
                    <span
                      key={`${d.id}-progress`}
                      onAnimationEnd={next}
                      className="absolute inset-0 origin-left bg-current"
                      style={{
                        color: accent[d.id],
                        animation: `hero-progress ${CYCLE_MS}ms linear forwards`,
                        animationPlayState: hovering ? 'paused' : 'running',
                      }}
                    />
                  ) : (
                    <span
                      className={cn('absolute inset-0 origin-left transition-transform duration-700', active ? 'scale-x-100' : 'scale-x-0')}
                      style={{ background: accent[d.id] }}
                    />
                  )}
                </span>
                <span className="flex items-baseline gap-2 sm:gap-3">
                  <span
                    className="font-mono text-[0.625rem] tracking-[0.16em] transition-colors sm:text-[0.6875rem]"
                    style={{ color: active ? accent[d.id] : 'var(--color-mute)' }}
                  >
                    {d.index}
                  </span>
                  <span
                    className={cn(
                      'truncate text-[0.8125rem] font-medium tracking-[-0.01em] transition-colors sm:text-base',
                      active ? 'text-ink' : 'text-ink-soft group-hover:text-ink',
                    )}
                  >
                    {d.name === 'Voice & Communications' ? 'Voice' : d.name}
                  </span>
                </span>
                <span className="mt-1 hidden pl-[calc(0.6875rem*2+0.75rem)] font-serif text-[1.0625rem] text-ink-soft italic sm:block">
                  {d.tagline}
                </span>
              </button>
            )
          })}
        </div>
      </div>
      <style>{`@keyframes hero-progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
    </section>
  )
}
