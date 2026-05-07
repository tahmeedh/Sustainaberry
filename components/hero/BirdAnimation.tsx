'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function BirdSVG({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 24 12" fill="none">
      <path d="M12 4 Q8 0 2 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M12 4 Q16 0 22 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

const BIRDS = [
  { top: '12%', size: 20, duration: 18, delay: 2, yWave: 15 },
  { top: '18%', size: 16, duration: 22, delay: 8, yWave: 10 },
  { top: '10%', size: 24, duration: 25, delay: 14, yWave: 20 },
]

export default function BirdAnimation() {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      refs.current.forEach((el, i) => {
        if (!el) return
        const bird = BIRDS[i]
        gsap.set(el, { x: -40 })
        gsap.to(el, {
          x: window.innerWidth + 40,
          duration: bird.duration,
          delay: bird.delay,
          repeat: -1,
          repeatDelay: 12,
          ease: 'none',
        })
        gsap.to(el, {
          y: `+=${bird.yWave}`,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      {BIRDS.map((bird, i) => (
        <div
          key={i}
          ref={el => { refs.current[i] = el }}
          className="absolute"
          style={{ top: bird.top }}
        >
          <BirdSVG size={bird.size} />
        </div>
      ))}
    </div>
  )
}
