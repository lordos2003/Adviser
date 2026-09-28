import { useState } from 'react'
import { ArrowRight, ArrowUpRight, AudioLines, Braces, CandlestickChart, Maximize2, Minimize2 } from 'lucide-react'

import { BlurFade } from '@/components/magicui/blur-fade'
import { MagicCard } from '@/components/magicui/magic-card'
import { SignalGlyph } from '@/components/signal-canvas'
import { SectionHead } from '@/components/section-head'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { accent, directions, type Direction, type Mode } from '@/content'
import { cn } from '@/lib/utils'

const ICON: Record<Mode, typeof AudioLines> = { voice: AudioLines, code: Braces, trade: CandlestickChart }

export function Directions({ onDiscuss }: { onDiscuss: (m: Mode) => void }) {
  const [open, setOpen] = useState<Direction | null>(null)

  return (
    <section id="directions" aria-labelledby="directions-title" className="relative py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <SectionHead
          index="01"
          label="Направления"
          id="directions-title"
          title={
            <>
              Коммуникации, технологии <span className="font-serif font-normal tracking-[-0.02em] italic">и финансы.</span>
            </>
          }
          aside="Три направления — один системный подход: от идеи до работающего результата."
        />

        <ul className="mt-14 grid gap-4 sm:mt-20 lg:grid-cols-3 lg:gap-5">
          {directions.map((d, i) => {
            const Icon = ICON[d.id]
            return (
              <BlurFade as="li" key={d.id} delay={i * 0.08}>
                <div id={d.anchor} className="h-full scroll-mt-28">
                  <MagicCard
                    className="h-full rounded-[1.75rem] shadow-[0_1px_0_rgb(255_255_255/0.8)_inset,0_24px_60px_-40px_rgb(13_20_36/0.35)]"
                    gradientFrom={accent[d.id]}
                    gradientTo={`${accent[d.id]}33`}
                    gradientColor={`${accent[d.id]}12`}
                  >
                    <article className="flex h-full flex-col p-6 sm:p-8">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs tracking-[0.18em]" style={{ color: accent[d.id] }}>
                          {d.index} / 03
                        </span>
                        <span
                          className="grid size-12 place-items-center rounded-full transition-transform duration-500 ease-(--ease-out-expo) group-hover:-rotate-6"
                          style={{ background: `${accent[d.id]}14`, color: accent[d.id] }}
                        >
                          <Icon className="size-5" strokeWidth={1.7} />
                        </span>
                      </div>

                      <SignalGlyph
                        mode={d.id}
                        className="mt-8 h-14 w-full text-ink/15"
                      />
                      <div style={{ color: accent[d.id] }} className="-mt-14 h-14 [&>svg]:h-full [&>svg]:w-full" aria-hidden>
                        <SignalGlyph mode={d.id} className="[clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-1000 ease-(--ease-out-expo) group-hover:[clip-path:inset(0_0_0_0)]" />
                      </div>

                      <h3 className="mt-8 text-[1.75rem] leading-[1.05] font-semibold tracking-[-0.035em] sm:text-[2rem]">
                        {d.name}
                      </h3>
                      <p className="mt-2 font-serif text-xl italic" style={{ color: accent[d.id] }}>
                        {d.tagline}
                      </p>
                      <p className="mt-5 text-[0.975rem] leading-relaxed text-ink-soft">{d.summary}</p>

                      <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Ключевые темы">
                        {d.tags.map((t) => (
                          <li key={t} className="rounded-full border border-ink/10 px-3 py-1 text-[0.8125rem] text-ink-2">
                            {t}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pt-8">
                        <button
                          type="button"
                          onClick={() => setOpen(d)}
                          className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink after:absolute after:inset-0 after:rounded-[1.75rem] after:content-['']"
                          aria-haspopup="dialog"
                        >
                          <span className="link-underline pb-0.5">Узнать больше</span>
                          <span
                            className="grid size-8 place-items-center rounded-full text-white transition-transform duration-500 ease-(--ease-out-expo) group-hover:translate-x-1"
                            style={{ background: accent[d.id] }}
                          >
                            <ArrowRight className="size-4" />
                          </span>
                        </button>
                      </div>
                    </article>
                  </MagicCard>
                </div>
              </BlurFade>
            )
          })}
        </ul>
      </div>

      <DirectionDialog
        direction={open}
        onOpenChange={(v) => !v && setOpen(null)}
        onDiscuss={(m) => {
          setOpen(null)
          onDiscuss(m)
        }}
      />
    </section>
  )
}

function DirectionDialog({
  direction,
  onOpenChange,
  onDiscuss,
}: {
  direction: Direction | null
  onOpenChange: (v: boolean) => void
  onDiscuss: (m: Mode) => void
}) {
  const [zoom, setZoom] = useState(false)
  // держим последний контент, чтобы анимация закрытия не «мигала» пустотой
  const [last, setLast] = useState<Direction | null>(direction)
  if (direction && direction !== last) setLast(direction)
  const d = direction ?? last

  return (
    <>
      <Dialog open={!!direction} onOpenChange={onOpenChange}>
        {d && (
          <DialogContent
            aria-describedby={`dlg-desc-${d.id}`}
            className="max-h-[calc(100dvh-1.25rem)] max-w-[1180px] overflow-y-auto overscroll-contain rounded-[1.75rem] bg-card shadow-[0_40px_120px_-30px_rgb(10_15_28/0.6)] sm:max-h-[calc(100dvh-3rem)] lg:overflow-hidden"
          >
            <div className="grid lg:max-h-[calc(100dvh-3rem)] lg:grid-cols-[1.08fr_0.92fr]">
              <div className="relative bg-paper-2 p-3 sm:p-5 lg:flex lg:items-center lg:p-7">
                <button
                  type="button"
                  onClick={() => setZoom(true)}
                  className="group/zoom relative block w-full cursor-zoom-in overflow-hidden rounded-2xl bg-white shadow-[0_18px_50px_-24px_rgb(13_20_36/0.4)]"
                  aria-label="Открыть схему на весь экран"
                >
                  <img
                    src={d.image.src}
                    srcSet={d.image.srcSet}
                    sizes="(min-width: 1024px) 620px, 100vw"
                    width={d.image.width}
                    height={d.image.height}
                    alt={d.image.alt}
                    className="block max-h-[34dvh] w-full object-contain transition-transform duration-700 ease-(--ease-out-expo) group-hover/zoom:scale-[1.015] sm:max-h-[46dvh] lg:max-h-[calc(100dvh-7.5rem)]"
                  />
                  <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 text-xs text-paper backdrop-blur transition-opacity group-hover/zoom:opacity-100 sm:opacity-0">
                    <Maximize2 className="size-3.5" /> Увеличить
                  </span>
                </button>
              </div>

              <div className="flex flex-col px-5 pt-7 pb-6 sm:px-10 sm:pt-12 sm:pb-10 lg:overflow-y-auto lg:px-12 lg:pt-16">
                <p className="flex items-center gap-2.5 font-mono text-[0.6875rem] tracking-[0.2em] uppercase" style={{ color: accent[d.id] }}>
                  <span className="size-1.5 rounded-full" style={{ background: accent[d.id] }} />
                  {d.index} — {d.kicker}
                </p>
                <DialogTitle className="mt-4 pr-10 text-[2rem] leading-[1.02] font-semibold tracking-[-0.04em] sm:text-[2.75rem]">
                  {d.modalTitle}
                </DialogTitle>
                <span className="mt-6 block h-0.5 w-12 rounded-full" style={{ background: accent[d.id] }} />
                <DialogDescription asChild id={`dlg-desc-${d.id}`}>
                  <div className="mt-6 space-y-4 text-[1rem] leading-relaxed text-ink-soft sm:text-[1.0625rem]">
                    {d.modalLead && (
                      <p className="font-serif text-[1.6rem] leading-tight text-ink italic sm:text-[1.9rem]">{d.modalLead}</p>
                    )}
                    {d.modalBody.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>
                </DialogDescription>

                {d.pipeline && (
                  <ol className="mt-7 flex flex-wrap items-center gap-x-1.5 gap-y-2" aria-label="Системный подход">
                    {d.pipeline.map((s, i) => (
                      <li key={s} className="flex items-center gap-1.5">
                        <span
                          className="rounded-full border px-3 py-1.5 text-[0.8125rem] text-ink-2"
                          style={{ borderColor: `${accent[d.id]}40`, background: `${accent[d.id]}0d` }}
                        >
                          {s}
                        </span>
                        {i < d.pipeline!.length - 1 && <ArrowRight className="size-3.5 text-mute" aria-hidden />}
                      </li>
                    ))}
                  </ol>
                )}

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-9">
                  <Button onClick={() => onDiscuss(d.id)}>
                    Обсудить задачу
                    <ArrowUpRight />
                  </Button>
                  <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-mute">ESC — закрыть</span>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Полноэкранный просмотр схемы */}
      <Dialog open={zoom && !!direction} onOpenChange={setZoom}>
        {d && (
          <DialogContent
            aria-describedby={undefined}
            className="h-[calc(100dvh-1.25rem)] max-w-none overflow-hidden rounded-3xl bg-night sm:h-[calc(100dvh-3rem)]"
            closeClassName="border-white/15 bg-night/70 text-white hover:bg-night"
            closeLabel="Закрыть просмотр"
          >
            <DialogTitle className="sr-only">{d.image.alt}</DialogTitle>
            <Lightbox src={d.image.full} alt={d.image.alt} width={d.image.width} height={d.image.height} />
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}

function Lightbox({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  const [actual, setActual] = useState(false)
  return (
    <div className={cn('relative h-full w-full', actual ? 'overflow-auto' : 'grid place-items-center overflow-hidden p-4 sm:p-10')}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        onClick={() => setActual((v) => !v)}
        className={cn(
          'block rounded-xl bg-white',
          actual ? 'max-w-none cursor-zoom-out' : 'max-h-full w-auto max-w-full cursor-zoom-in object-contain',
        )}
        style={actual ? { width, height: 'auto' } : undefined}
      />
      <button
        type="button"
        onClick={() => setActual((v) => !v)}
        className="fixed bottom-6 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full whitespace-nowrap border border-white/15 bg-night/80 px-4 py-2.5 text-sm text-white backdrop-blur hover:bg-night"
      >
        {actual ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
        {actual ? 'Вписать в экран' : 'Оригинальный размер'}
      </button>
    </div>
  )
}
