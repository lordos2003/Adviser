import { useState } from 'react'
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'

import { Toaster } from '@/components/ui/sonner'
import { About } from '@/components/sections/about'
import { Contact } from '@/components/sections/contact'
import { Directions } from '@/components/sections/directions'
import { Header } from '@/components/sections/header'
import { Hero } from '@/components/sections/hero'
import type { Mode } from '@/content'

export default function App() {
  const [topic, setTopic] = useState<Mode | 'other'>('code')

  const discuss = (m: Mode) => {
    setTopic(m)
    // даём диалогу закрыться, затем плавно ведём к форме
    window.setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 280)
  }

  return (
    <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Перейти к содержанию
      </a>
      <div className="grain">
        <Header />
        <main id="main">
          <Hero />
          <Directions onDiscuss={discuss} />
          <About />
          <Contact topic={topic} onTopic={setTopic} />
        </main>
      </div>
      <Toaster />
    </MotionConfig>
    </LazyMotion>
  )
}
