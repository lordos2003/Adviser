import type React from 'react'
import { m, useReducedMotion, type Variants } from 'motion/react'

/** Magic UI BlurFade — сдержанное появление при попадании во вьюпорт */
interface BlurFadeProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  offset?: number
  blur?: string
  as?: 'div' | 'li' | 'span' | 'p' | 'h2'
  inViewMargin?: `${number}px`
}

export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.8,
  offset = 18,
  blur = '8px',
  as = 'div',
  inViewMargin = '-60px',
}: BlurFadeProps) {
  const reduce = useReducedMotion()
  const variants: Variants = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { y: offset, opacity: 0, filter: `blur(${blur})` },
        visible: { y: 0, opacity: 1, filter: 'blur(0px)' },
      }
  const Comp = m[as]
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: inViewMargin }}
      variants={variants}
      transition={{ delay, duration, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  )
}
