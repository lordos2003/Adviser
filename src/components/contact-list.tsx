import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail, MessageCircle, Send } from 'lucide-react'
import { toast } from 'sonner'

import { contacts } from '@/content'
import { cn } from '@/lib/utils'

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/** Список каналов связи: компактный (поповер в шапке) и крупный (секция контактов, тёмный фон) */
export function ContactList({ compact = false, dark = false }: { compact?: boolean; dark?: boolean }) {
  const [copied, setCopied] = useState(false)

  const rows = [
    { key: 'email', label: 'Email', value: contacts.email, href: `mailto:${contacts.email}`, icon: Mail, external: false },
    { key: 'tg', label: 'Telegram', value: contacts.telegram.handle, href: contacts.telegram.url, icon: Send, external: true },
    { key: 'max', label: 'MAX', value: contacts.max.label, href: contacts.max.url, icon: MessageCircle, external: true },
  ]

  const onCopy = async () => {
    const ok = await copy(contacts.email)
    if (ok) {
      setCopied(true)
      toast.success('Email скопирован', { description: contacts.email })
      window.setTimeout(() => setCopied(false), 1800)
    } else {
      toast.error('Не удалось скопировать', { description: contacts.email })
    }
  }

  return (
    <ul className={cn('flex flex-col', !compact && 'border-t', dark ? 'border-white/12' : 'border-ink/10')}>
      {rows.map(({ key, label, value, href, icon: Icon, external }) => (
        <li
          key={key}
          className={cn(
            'relative flex items-center',
            compact ? 'rounded-2xl' : 'border-b',
            dark ? 'border-white/12' : 'border-ink/10',
          )}
        >
          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={cn(
              'group/row flex min-w-0 flex-1 items-center gap-4 transition-colors',
              compact ? 'rounded-2xl px-3 py-3 hover:bg-ink/[0.04]' : 'py-5 sm:py-6',
            )}
          >
            <span
              className={cn(
                'grid shrink-0 place-items-center rounded-full',
                compact ? 'size-10 bg-ink/[0.05] text-ink' : 'size-12 border border-white/15 text-white',
              )}
            >
              <Icon className={compact ? 'size-4' : 'size-5'} strokeWidth={1.6} />
            </span>
            <span className="min-w-0 flex-1">
              <span
                className={cn(
                  'block font-mono text-[0.625rem] tracking-[0.18em] uppercase',
                  dark ? 'text-white/45' : 'text-mute',
                )}
              >
                {label}
              </span>
              <span
                className={cn(
                  'mt-1 block truncate font-medium tracking-[-0.01em]',
                  compact ? 'text-[0.9375rem]' : 'text-lg sm:text-2xl',
                  dark ? 'text-white' : 'text-ink',
                )}
              >
                {value}
              </span>
            </span>
            {!compact && (
              <ArrowUpRight
                className="size-5 shrink-0 text-white/40 transition-[transform,color] duration-300 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 group-hover/row:text-white"
                strokeWidth={1.6}
              />
            )}
          </a>
          {key === 'email' && (
            <button
              type="button"
              onClick={onCopy}
              aria-label="Скопировать email"
              className={cn(
                'grid shrink-0 place-items-center rounded-full transition-colors',
                compact ? 'mr-2 size-9 text-ink-soft hover:bg-ink/[0.06] hover:text-ink' : 'ml-3 size-10 border border-white/15 text-white/70 hover:border-white/40 hover:text-white',
              )}
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" strokeWidth={1.6} />}
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}
