import { useId, useRef, useState } from 'react'
import { ArrowUp, ArrowUpRight, Check } from 'lucide-react'
import { toast } from 'sonner'

import { ContactList } from '@/components/contact-list'
import { SectionHead } from '@/components/section-head'
import { BlurFade } from '@/components/magicui/blur-fade'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { accent, contacts, directions, nav, type Mode } from '@/content'
import { cn } from '@/lib/utils'

type Topic = Mode | 'other'
const YEAR = new Date().getFullYear()
const TOPICS: { id: Topic; label: string }[] = [
  ...directions.map((d) => ({ id: d.id as Topic, label: d.id === 'voice' ? 'Voice' : d.name })),
  { id: 'other', label: 'Другое' },
]

interface Errors {
  name?: string
  reply?: string
  message?: string
}

function validate(v: { name: string; reply: string; message: string }): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Как к вам обращаться?'
  const r = v.reply.trim()
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r)
  const isHandle = /^@?[a-zA-Z0-9_]{4,32}$/.test(r)
  const isPhone = /^\+?[\d\s()-]{7,20}$/.test(r)
  if (!r) e.reply = 'Оставьте email, Telegram или телефон'
  else if (!isEmail && !isHandle && !isPhone) e.reply = 'Проверьте формат: email, @telegram или телефон'
  if (v.message.trim().length < 10) e.message = 'Опишите задачу хотя бы парой предложений'
  return e
}

export function Contact({ topic, onTopic }: { topic: Topic; onTopic: (t: Topic) => void }) {
  const uid = useId()
  const [values, setValues] = useState({ name: '', reply: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [sentFor, setSentFor] = useState<Topic | null>(null)
  const sent = sentFor === topic
  const formRef = useRef<HTMLFormElement>(null)

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    const firstBad = (['name', 'reply', 'message'] as const).find((k) => errs[k])
    if (firstBad) {
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)
      el?.focus({ preventScroll: true })
      el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      return
    }
    const topicLabel = TOPICS.find((t) => t.id === topic)?.label ?? 'Другое'
    const subject = `ADVISER — ${topicLabel}: запрос от ${values.name.trim()}`
    const body = [`Имя: ${values.name.trim()}`, `Как связаться: ${values.reply.trim()}`, `Направление: ${topicLabel}`, '', values.message.trim()].join('\n')
    window.location.href = `mailto:${contacts.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSentFor(topic)
    toast.success('Письмо подготовлено', {
      description: 'Откроется ваш почтовый клиент. Если этого не произошло — напишите в Telegram.',
    })
  }

  const errId = (k: keyof Errors) => `${uid}-${k}-err`

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-clip bg-night text-white">
      {/* мягкие акцентные свечения */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-[8%] size-[36rem] rounded-full bg-voice/20 blur-[140px]" />
        <div className="absolute top-1/3 right-[-10%] size-[32rem] rounded-full bg-code/20 blur-[140px]" />
        <div className="absolute bottom-[-12rem] left-1/3 size-[30rem] rounded-full bg-trade/15 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 pt-24 sm:px-8 sm:pt-32 lg:px-12 lg:pt-40">
        <SectionHead
          dark
          index="03"
          label="Контакты"
          id="contact-title"
          title={
            <>
              Есть идея или задача? <span className="font-serif font-normal tracking-[-0.02em] text-white/80 italic">Давайте обсудим.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-16">
          <BlurFade className="lg:col-span-5">
            <ContactList dark />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-white/50">
              Удобнее всего — Telegram или email. Отвечу и помогу понять, как превратить идею в работающее решение.
            </p>
          </BlurFade>

          <BlurFade delay={0.08} className="lg:col-span-7">
            <form
              ref={formRef}
              noValidate
              onSubmit={onSubmit}
              aria-labelledby={`${uid}-form-title`}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm sm:p-8"
            >
              <h3 id={`${uid}-form-title`} className="text-xl font-medium tracking-[-0.02em]">
                Написать сообщение
              </h3>

              <fieldset className="mt-6">
                <legend className="font-mono text-[0.6875rem] tracking-[0.14em] text-white/60 uppercase">Направление</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {TOPICS.map((t) => {
                    const checked = topic === t.id
                    const color = t.id === 'other' ? '#ffffff' : accent[t.id]
                    return (
                      <label
                        key={t.id}
                        className={cn(
                          'relative inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-voice',
                          checked ? 'border-white bg-white text-night' : 'border-white/15 text-white/75 hover:border-white/40 hover:text-white',
                        )}
                      >
                        <input
                          type="radio"
                          name="topic"
                          value={t.id}
                          checked={checked}
                          onChange={() => onTopic(t.id)}
                          className="sr-only"
                        />
                        <span className="size-1.5 rounded-full" style={{ background: checked && t.id === 'other' ? '#0a0f1c' : color }} />
                        {t.label}
                      </label>
                    )
                  })}
                </div>
              </fieldset>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor={`${uid}-name`}>Имя</Label>
                  <Input
                    id={`${uid}-name`}
                    name="name"
                    autoComplete="name"
                    placeholder="Как к вам обращаться"
                    value={values.name}
                    onChange={set('name')}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? errId('name') : undefined}
                  />
                  {errors.name && <FieldError id={errId('name')}>{errors.name}</FieldError>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`${uid}-reply`}>Email, Telegram или телефон</Label>
                  <Input
                    id={`${uid}-reply`}
                    name="reply"
                    autoComplete="email"
                    placeholder="@username или you@mail.ru"
                    value={values.reply}
                    onChange={set('reply')}
                    aria-invalid={!!errors.reply}
                    aria-describedby={errors.reply ? errId('reply') : undefined}
                  />
                  {errors.reply && <FieldError id={errId('reply')}>{errors.reply}</FieldError>}
                </div>
              </div>

              <div className="mt-5 grid gap-2">
                <Label htmlFor={`${uid}-message`}>Задача</Label>
                <Textarea
                  id={`${uid}-message`}
                  name="message"
                  placeholder="Коротко опишите идею, задачу или вопрос"
                  value={values.message}
                  onChange={set('message')}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? errId('message') : `${uid}-hint`}
                />
                {errors.message ? (
                  <FieldError id={errId('message')}>{errors.message}</FieldError>
                ) : (
                  <p id={`${uid}-hint`} className="text-xs text-white/40">
                    Письмо откроется в вашем почтовом клиенте — ничего не хранится на сайте.
                  </p>
                )}
              </div>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Button type="submit" variant="light" size="lg" className="w-full sm:w-auto">
                  {sent ? <Check /> : null}
                  {sent ? 'Письмо подготовлено' : 'Отправить'}
                  {!sent && <ArrowUpRight className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />}
                </Button>
                <a
                  href={contacts.telegram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline self-center pb-0.5 text-sm text-white/60 hover:text-white sm:self-auto"
                >
                  или сразу в Telegram {contacts.telegram.handle}
                </a>
              </div>
              <p role="status" aria-live="polite" className="sr-only">
                {sent ? 'Письмо подготовлено, открывается почтовый клиент' : ''}
              </p>
            </form>
          </BlurFade>
        </div>

        <Footer />
      </div>
    </section>
  )
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="text-xs text-[#ff9b8f]">
      {children}
    </p>
  )
}

function Footer() {
  return (
    <footer className="mt-24 sm:mt-32">
      <div className="flex flex-col gap-6 border-t border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="Навигация в подвале">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={n.href} className="link-underline pb-0.5 hover:text-white">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center justify-between gap-6 sm:justify-end">
          <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-white/40">© {YEAR} ADVISER</p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            Наверх <ArrowUp className="size-4" />
          </a>
        </div>
      </div>
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.07em] text-center text-[clamp(4rem,19.5vw,19rem)] leading-[0.8] font-semibold tracking-[-0.06em] text-transparent select-none"
        style={{ WebkitTextStroke: '1px rgb(255 255 255 / 0.14)', backgroundImage: 'linear-gradient(180deg, rgb(255 255 255 / 0.08), transparent 80%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
      >
        ADVISER
      </p>
    </footer>
  )
}
