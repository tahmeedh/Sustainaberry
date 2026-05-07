'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const CLOUDS = [
  { top: '8%', size: 120, duration: 35, delay: 0 },
  { top: '15%', size: 80, duration: 50, delay: -15 },
  { top: '6%', size: 150, duration: 42, delay: -25 },
  { top: '20%', size: 60, duration: 38, delay: -8 },
]

function CloudSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 120 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="50" rx="55" ry="20" fill="white" fillOpacity="0.9" />
      <ellipse cx="40" cy="40" rx="28" ry="22" fill="white" fillOpacity="0.9" />
      <ellipse cx="75" cy="38" rx="24" ry="20" fill="white" fillOpacity="0.9" />
      <ellipse cx="55" cy="32" rx="22" ry="18" fill="white" fillOpacity="0.95" />
    </svg>
  )
}

export default function CloudLayer() {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      refs.current.forEach((el, i) => {
        if (!el) return
        const cloud = CLOUDS[i]
        gsap.set(el, { x: -cloud.size - 20 })
        gsap.to(el, {
          x: window.innerWidth + cloud.size + 20,
          duration: cloud.duration,
          delay: cloud.delay,
          repeat: -1,
          ease: 'none',
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 10 }}>
      {CLOUDS.map((cloud, i) => (
        <div
          key={i}
          ref={el => { refs.current[i] = el }}
          className="absolute"
          style={{ top: cloud.top }}
        >
          <CloudSVG size={cloud.size} />
        </div>
      ))}
    </div>
  )
}
