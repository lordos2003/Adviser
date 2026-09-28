import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'

import { BlurFade } from '@/components/magicui/blur-fade'
import { aboutPhoto, aboutText } from '@/content'

const STACK = ['Cisco CUCM', 'Unity', 'Jabber', 'SIP', 'MRA']

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-2.5%', '2.5%'])

  return (
    <section id="about" aria-labelledby="about-title" className="relative border-t border-ink/[0.08] py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="lg:col-span-5">
          <BlurFade>
            <p className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.22em] text-mute uppercase lg:hidden">
              <span className="text-ink">(03)</span>
              <span className="h-px w-8 bg-ink/20" />
              Обо мне
            </p>
          </BlurFade>
          <BlurFade delay={0.05} className="mt-8 lg:sticky lg:top-28 lg:mt-0">
            <div
              ref={ref}
              className="relative mx-auto aspect-[3/4] max-w-[520px] overflow-hidden rounded-[1.75rem] bg-paper-3 shadow-[0_40px_90px_-50px_rgb(13_20_36/0.55)]"
            >
              <m.img
                src={aboutPhoto.src}
                srcSet={aboutPhoto.srcSet}
                sizes="(min-width: 1024px) 520px, (min-width: 640px) 520px, 100vw"
                width={768}
                height={1024}
                alt={aboutPhoto.alt}
                loading="lazy"
                decoding="async"
                style={{ y, scale: 1.06 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night/45 to-transparent" />
              <p className="absolute bottom-5 left-5 font-mono text-[0.6875rem] tracking-[0.2em] text-white/85 uppercase">
                ADVISER — Ideas into reality
              </p>
            </div>
          </BlurFade>
        </div>

        <div className="lg:col-span-7 lg:pt-4">
          <BlurFade>
            <p className="hidden items-center gap-3 font-mono text-[0.6875rem] tracking-[0.22em] text-mute uppercase lg:flex">
              <span className="text-ink">(03)</span>
              <span className="h-px w-8 bg-ink/20" />
              Обо мне
            </p>
          </BlurFade>
          <BlurFade delay={0.06}>
            <h2
              id="about-title"
              className="text-[clamp(2.25rem,5.2vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-balance lg:mt-6"
            >
              Я создаю системы, <span className="font-serif font-normal tracking-[-0.02em] italic">которые работают.</span>
            </h2>
          </BlurFade>

          <div className="mt-10 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-end sm:gap-10">
            <BlurFade delay={0.1}>
              <p className="text-[clamp(5rem,11vw,8.5rem)] leading-[0.8] font-semibold tracking-[-0.06em] text-ink">
                15<span className="text-voice">+</span>
              </p>
            </BlurFade>
            <BlurFade delay={0.14}>
              <p className="max-w-xs pb-1 text-[1.0625rem] leading-snug text-ink-soft">
                лет в корпоративной телефонии и унифицированных коммуникациях
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Технологии">
                {STACK.map((s) => (
                  <li key={s} className="rounded-full bg-ink px-3 py-1 font-mono text-[0.6875rem] tracking-wider text-paper">
                    {s}
                  </li>
                ))}
              </ul>
            </BlurFade>
          </div>

          <div className="mt-12 space-y-6 border-t border-ink/10 pt-10 text-[1.0625rem] leading-[1.75] text-ink-2 sm:text-lg sm:leading-[1.75]">
            {aboutText.map((p, i) => (
              <BlurFade as="p" key={i} delay={0.05 * i} className={i === 0 ? 'first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:font-serif first-letter:text-[4.2rem] first-letter:leading-[0.8] first-letter:text-voice first-letter:italic' : ''}>
                {p}
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
