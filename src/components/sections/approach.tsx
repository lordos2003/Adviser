import { ChartNoAxesCombined, ShieldCheck, Workflow } from 'lucide-react'

import { BlurFade } from '@/components/magicui/blur-fade'
import { Marquee } from '@/components/magicui/marquee'
import { SectionHead } from '@/components/section-head'
import { keywords, principles } from '@/content'

const ICONS = [Workflow, ChartNoAxesCombined, ShieldCheck]
const DOTS = ['bg-voice', 'bg-code', 'bg-trade']

export function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="relative border-t border-ink/[0.08] py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <SectionHead
          index="02"
          label="Подход"
          id="approach-title"
          title={
            <>
              Технологии. Идеи. <span className="font-serif font-normal tracking-[-0.02em] italic">Результат.</span>
            </>
          }
          aside="Создаю решения, которые работают и приносят реальную ценность."
        />

        <ol className="mt-16 grid border-t border-ink/10 sm:mt-24 md:grid-cols-3">
          {principles.map((p, i) => {
            const Icon = ICONS[i]
            return (
              <BlurFade
                as="li"
                key={p.title}
                delay={i * 0.08}
                className="group relative border-b border-ink/10 py-8 md:border-b-0 md:py-10 md:pr-10 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-10"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.18em] text-mute">0{i + 1}</span>
                  <Icon className="size-6 text-ink/70 transition-transform duration-500 ease-(--ease-out-expo) group-hover:-translate-y-0.5" strokeWidth={1.4} />
                </div>
                <h3 className="mt-10 flex items-center gap-3 text-2xl font-semibold tracking-[-0.03em] sm:text-[1.75rem]">
                  <span className={`size-2 shrink-0 rounded-full ${DOTS[i]}`} aria-hidden />
                  {p.title}
                </h3>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">{p.text}</p>
              </BlurFade>
            )
          })}
        </ol>
      </div>

      <div className="relative mt-20 sm:mt-28" aria-label="Технологии и темы">
        <Marquee pauseOnHover className="[--duration:48s] [--gap:0rem]">
          {keywords.map((k, i) => (
            <span key={k} className="flex items-center text-[clamp(1.75rem,4.2vw,3.5rem)] font-medium tracking-[-0.04em] whitespace-nowrap text-ink/85">
              <span className="px-6 sm:px-10">{k}</span>
              <span className={`size-2 rounded-full sm:size-2.5 ${DOTS[i % 3]}`} aria-hidden />
            </span>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper sm:w-40" />
      </div>
    </section>
  )
}
