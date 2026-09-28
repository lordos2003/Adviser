import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

import { accent, type Mode } from '@/content'
import { cn } from '@/lib/utils'

/**
 * «Сигнал» — фирменный интерактивный эффект.
 * Одна линия, которая перетекает между тремя формами:
 *   Voice  → звуковая волна (+ амплитудные столбики),
 *   Code   → цифровой импульс (+ биты 0/1),
 *   Trader → ценовой тренд (+ свечи).
 * Курсор «задевает» линию — от него расходится затухающая рябь.
 */

const MODES: Mode[] = ['voice', 'code', 'trade']
const LABEL: Record<Mode, string> = { voice: 'VOICE', code: 'CODE', trade: 'TRADE' }

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
const RGB = Object.fromEntries(MODES.map((m) => [m, hexToRgb(accent[m])])) as Record<Mode, [number, number, number]>
const INK: [number, number, number] = [13, 20, 36]

export function SignalCanvas({ mode, className }: { mode: Mode; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const modeRef = useRef<Mode>(mode)
  const redrawRef = useRef<() => void>(() => {})
  const reduce = useReducedMotion()

  useEffect(() => {
    modeRef.current = mode
    redrawRef.current()
  }, [mode])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0
    let H = 0
    let dpr = 1
    let raf = 0
    let running = false
    let inView = true
    let t = reduce ? 2.2 : 0
    let last = performance.now()

    const w: Record<Mode, number> = { voice: 0, code: 0, trade: 0 }
    w[modeRef.current] = 1

    const pointer = { x: -9999, y: -9999, inside: false, energy: 0 }

    // ── формы сигнала (y-смещение относительно базовой линии, «вверх» = минус) ──
    const voice = (x: number) => {
      const env = 0.35 + 0.65 * Math.pow(Math.abs(Math.sin(x * 0.0042 + t * 0.55)), 1.4)
      const s =
        Math.sin(x * 0.043 + t * 3.1) * 0.55 +
        Math.sin(x * 0.109 - t * 4.3) * 0.28 +
        Math.sin(x * 0.019 + t * 1.2) * 0.17
      return s * env * H * 0.27
    }
    const codeRaw = (x: number) => Math.sin(x * 0.017 - t * 1.5) + 0.62 * Math.sin(x * 0.041 - t * 2.1 + 1.1)
    const code = (x: number) => -Math.tanh(codeRaw(x) * 7) * H * 0.2
    const priceNoise = (u: number) =>
      0.5 * Math.sin(u * 0.013) +
      0.3 * Math.sin(u * 0.031 + 1.3) +
      0.2 * Math.sin(u * 0.071 + 0.4) +
      0.12 * Math.sin(u * 0.17 + 2.1)
    const trade = (x: number) => {
      const u = x + t * 22
      const trend = (x / Math.max(W, 1) - 0.5) * -H * 0.44
      return trend + priceNoise(u) * H * 0.17
    }

    const ripple = (x: number) => {
      if (pointer.energy < 0.002) return 0
      const dx = x - pointer.x
      return -pointer.energy * H * 0.16 * Math.exp(-(dx * dx) / (2 * 80 * 80)) * Math.cos(dx * 0.055 - t * 7)
    }

    const yAt = (x: number) => {
      const base = H * 0.54
      let y = base
      if (w.voice > 0.001) y += w.voice * voice(x)
      if (w.code > 0.001) y += w.code * code(x)
      if (w.trade > 0.001) y += w.trade * trade(x)
      return y + ripple(x)
    }

    const mix = (): [number, number, number] => {
      const sum = w.voice + w.code + w.trade || 1
      return [0, 1, 2].map((i) => (RGB.voice[i] * w.voice + RGB.code[i] * w.code + RGB.trade[i] * w.trade) / sum) as [
        number,
        number,
        number,
      ]
    }
    const rgba = (c: [number, number, number], a: number) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = Math.max(1, rect.width)
      H = Math.max(1, rect.height)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const base = H * 0.54
      const c = mix()

      // сетка: базовая линия и риски
      ctx.save()
      ctx.strokeStyle = rgba(INK, 0.1)
      ctx.lineWidth = 1
      ctx.setLineDash([2, 6])
      ctx.beginPath()
      ctx.moveTo(0, base + 0.5)
      ctx.lineTo(W, base + 0.5)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.strokeStyle = rgba(INK, 0.14)
      for (let x = 0; x < W; x += 64) {
        ctx.beginPath()
        ctx.moveTo(x + 0.5, H - 8)
        ctx.lineTo(x + 0.5, H)
        ctx.stroke()
      }
      ctx.restore()

      // слой Voice — амплитудные столбики
      if (w.voice > 0.02) {
        ctx.fillStyle = rgba(RGB.voice, 0.14 * w.voice)
        for (let x = 3; x < W; x += 7) {
          const a = Math.abs(voice(x)) * 0.9 + 2
          ctx.fillRect(x, base - a, 2.5, a * 2)
        }
      }

      // слой Code — биты
      if (w.code > 0.02) {
        ctx.font = '500 11px "JetBrains Mono Variable", ui-monospace, monospace'
        ctx.textAlign = 'center'
        ctx.fillStyle = rgba(RGB.code, 0.5 * w.code)
        for (let x = 24; x < W; x += 44) {
          const bit = codeRaw(x) > 0 ? '1' : '0'
          ctx.fillText(bit, x, H * 0.12 + 6)
        }
      }

      // слой Trader — свечи
      if (w.trade > 0.02) {
        const step = W < 640 ? 18 : 24
        const body = step * 0.52
        for (let x = step / 2; x < W; x += step) {
          const o = base + trade(x - step / 2)
          const cl = base + trade(x + step / 2)
          const wick = Math.abs(Math.sin(x * 0.37 + 1.7)) * H * 0.05 + 3
          const hi = Math.min(o, cl) - wick
          const lo = Math.max(o, cl) + wick * 0.8
          const up = cl < o
          const col = up ? rgba(RGB.trade, 0.55 * w.trade) : rgba(INK, 0.22 * w.trade)
          ctx.strokeStyle = col
          ctx.fillStyle = col
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(x + 0.5, hi)
          ctx.lineTo(x + 0.5, lo)
          ctx.stroke()
          ctx.fillRect(x - body / 2, Math.min(o, cl), body, Math.max(1.5, Math.abs(cl - o)))
        }
      }

      // основная линия
      const pts: number[] = []
      const dx = W < 640 ? 3 : 2.5
      for (let x = -dx; x <= W + dx; x += dx) pts.push(x, yAt(x))

      // заливка под линией
      const grad = ctx.createLinearGradient(0, H * 0.15, 0, H)
      grad.addColorStop(0, rgba(c, 0.13))
      grad.addColorStop(1, rgba(c, 0))
      ctx.beginPath()
      ctx.moveTo(pts[0], H)
      for (let i = 0; i < pts.length; i += 2) ctx.lineTo(pts[i], pts[i + 1])
      ctx.lineTo(pts[pts.length - 2], H)
      ctx.closePath()
      ctx.fillStyle = grad
      ctx.fill()

      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'
      const stroke = (width: number, alpha: number) => {
        ctx.beginPath()
        ctx.moveTo(pts[0], pts[1])
        for (let i = 2; i < pts.length; i += 2) ctx.lineTo(pts[i], pts[i + 1])
        ctx.strokeStyle = rgba(c, alpha)
        ctx.lineWidth = width
        ctx.stroke()
      }
      stroke(10, 0.07)
      stroke(2, 1)

      // перекрестие курсора
      if (pointer.energy > 0.02 && pointer.x > 0 && pointer.x < W) {
        const py = yAt(pointer.x)
        const a = Math.min(1, pointer.energy * 1.4)
        ctx.save()
        ctx.strokeStyle = rgba(INK, 0.22 * a)
        ctx.setLineDash([3, 5])
        ctx.beginPath()
        ctx.moveTo(pointer.x + 0.5, 0)
        ctx.lineTo(pointer.x + 0.5, H)
        ctx.stroke()
        ctx.restore()
        ctx.beginPath()
        ctx.arc(pointer.x, py, 9, 0, Math.PI * 2)
        ctx.fillStyle = rgba(c, 0.16 * a)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(pointer.x, py, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = rgba(c, a)
        ctx.fill()
        ctx.font = '500 10.5px "JetBrains Mono Variable", ui-monospace, monospace'
        ctx.textAlign = pointer.x > W - 120 ? 'right' : 'left'
        ctx.fillStyle = rgba(INK, 0.6 * a)
        const lx = pointer.x + (pointer.x > W - 120 ? -14 : 14)
        ctx.fillText(`${LABEL[modeRef.current]} · ${(pointer.x / W).toFixed(2)}`, lx, Math.max(14, py - 14))
      }
    }

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      t += dt
      const k = 1 - Math.exp(-dt * 3.2)
      for (const m of MODES) w[m] += ((m === modeRef.current ? 1 : 0) - w[m]) * k
      pointer.energy += ((pointer.inside ? 1 : 0) - pointer.energy) * (1 - Math.exp(-dt * (pointer.inside ? 5 : 2.2)))
      draw()
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running || reduce || !inView || document.hidden) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    // при reduced motion — статичная перерисовка по смене режима
    redrawRef.current = () => {
      if (!reduce) return
      for (const m of MODES) w[m] = m === modeRef.current ? 1 : 0
      draw()
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      pointer.x = x
      pointer.y = y
      pointer.inside = x >= 0 && x <= r.width && y >= -40 && y <= r.height + 40
    }
    const onLeave = () => {
      pointer.inside = false
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (inView) start()
      else stop()
    })
    io.observe(canvas)
    const onVis = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVis)
    if (!reduce) {
      window.addEventListener('pointermove', onMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeave)
    }
    resize()
    start()

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [reduce])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        'block h-full w-full [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]',
        className,
      )}
    />
  )
}

/** Статичный «глиф» сигнала для карточек направлений (SVG, без JS-анимации) */
export function SignalGlyph({ mode, className }: { mode: Mode; className?: string }) {
  const Wd = 320
  const Hd = 64
  const pts: string[] = []
  for (let x = 0; x <= Wd; x += 2) {
    let y = Hd / 2
    if (mode === 'voice') {
      const env = 0.35 + 0.65 * Math.abs(Math.sin(x * 0.012 + 0.6))
      y += (Math.sin(x * 0.12) * 0.6 + Math.sin(x * 0.29) * 0.4) * env * Hd * 0.38
    } else if (mode === 'code') {
      y += -Math.tanh((Math.sin(x * 0.045) + 0.6 * Math.sin(x * 0.11 + 1)) * 8) * Hd * 0.3
    } else {
      y += (x / Wd - 0.5) * -Hd * 0.62 + (Math.sin(x * 0.05) * 0.5 + Math.sin(x * 0.13 + 1.3) * 0.3) * Hd * 0.2
    }
    pts.push(`${x},${y.toFixed(1)}`)
  }
  return (
    <svg viewBox={`0 0 ${Wd} ${Hd}`} preserveAspectRatio="none" aria-hidden="true" className={className}>
      <polyline points={pts.join(' ')} fill="none" stroke="currentColor" strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  )
}
