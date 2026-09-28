import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

import { ContactList } from '@/components/contact-list'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { contacts, nav } from '@/content'
import { useActiveSection } from '@/hooks/use-active-section'
import { cn } from '@/lib/utils'

export function Wordmark({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <a href="#top" className={cn('group inline-flex flex-col leading-none', className)} aria-label="ADVISER — на главную">
      <span className={cn('text-[0.95rem] font-semibold tracking-[0.32em]', light ? 'text-paper' : 'text-ink')}>ADVISER</span>
      <span
        className={cn(
          'mt-1.5 font-mono text-[0.5625rem] tracking-[0.24em] transition-colors',
          light ? 'text-white/45' : 'text-mute group-hover:text-ink-soft',
        )}
      >
        IDEAS INTO REALITY
      </span>
    </a>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(nav.map((n) => n.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500',
        scrolled ? 'border-b border-ink/[0.07] bg-paper/75 backdrop-blur-xl backdrop-saturate-150' : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-4 sm:h-[4.5rem] sm:px-8 lg:px-12">
        <Wordmark />

        <nav aria-label="Основная навигация" className="mx-auto hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-ink/[0.08] bg-paper/60 p-1 backdrop-blur">
            {nav.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative block rounded-full px-4 py-2 text-sm transition-colors duration-300',
                      isActive ? 'bg-ink text-paper' : 'text-ink-soft hover:text-ink',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm" className="h-10 pr-3.5 pl-4.5">
                Связаться
                <ArrowUpRight className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent aria-label="Контакты">
              <ContactList compact />
              <a
                href="#contact"
                className="mt-1 flex items-center justify-between rounded-2xl bg-ink px-4 py-3 text-sm text-paper transition-colors hover:bg-ink-2"
              >
                Написать сообщение
                <ArrowUpRight className="size-4" />
              </a>
            </PopoverContent>
          </Popover>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="iconSm" className="size-10 md:hidden" aria-label="Открыть меню">
                <Menu className="size-[1.1rem]" strokeWidth={1.8} />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="sr-only">Меню</SheetTitle>
              <SheetDescription className="sr-only">Навигация по разделам сайта</SheetDescription>
              <div className="flex h-16 items-center justify-between px-4 sm:px-8">
                <SheetClose asChild>
                  <span>
                    <Wordmark light />
                  </span>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="outlineLight" size="iconSm" className="size-10" aria-label="Закрыть меню">
                    <X className="size-[1.1rem]" strokeWidth={1.8} />
                  </Button>
                </SheetClose>
              </div>
              <nav aria-label="Мобильная навигация" className="flex flex-1 flex-col justify-center px-4 sm:px-8">
                <ul className="flex flex-col">
                  {nav.map((item, i) => (
                    <li key={item.id} className="border-b border-white/10 first:border-t">
                      <SheetClose asChild>
                        <a href={item.href} className="flex items-baseline justify-between py-5 text-[2.25rem] font-medium tracking-[-0.04em]">
                          {item.label}
                          <span className="font-mono text-xs tracking-widest text-white/40">0{i + 1}</span>
                        </a>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex flex-wrap gap-x-6 gap-y-2 px-4 pb-[max(2rem,env(safe-area-inset-bottom))] font-mono text-xs tracking-wider text-white/55 sm:px-8">
                <a href={`mailto:${contacts.email}`} className="hover:text-white">{contacts.email}</a>
                <a href={contacts.telegram.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Telegram {contacts.telegram.handle}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
