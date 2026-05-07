'use client'
import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

interface Props { value: number; prefix?: string; suffix?: string; label: string; color: string }

export default function StatCounter({ value, prefix = '', suffix = '', label, color }: Props) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(value)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  const colorMap: Record<string, string> = {
    green: '#22C55E', berry: '#E91E8C', sky: '#38BDF8',
  }
  const textColor = colorMap[color] ?? '#4A1942'

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-bold" style={{ fontFamily: 'Fredoka, sans-serif', color: textColor }}>
        {prefix}{count}{suffix}
      </div>
      <div className="mt-1 text-sm font-medium" style={{ fontFamily: 'Nunito, sans-serif', color: '#8B5E3C' }}>{label}</div>
    </div>
  )
}
