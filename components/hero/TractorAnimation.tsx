'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function TractorSVG() {
  return (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <rect x="30" y="25" width="60" height="30" rx="6" fill="#DC2626" />
      {/* Cab */}
      <rect x="55" y="12" width="32" height="24" rx="4" fill="#B91C1C" />
      {/* Window */}
      <rect x="58" y="15" width="12" height="10" rx="2" fill="#BAE6FD" fillOpacity="0.8" />
      {/* Hood */}
      <rect x="22" y="30" width="20" height="16" rx="3" fill="#991B1B" />
      {/* Exhaust pipe */}
      <rect x="25" y="18" width="5" height="14" rx="2" fill="#4B5563" />
      <circle cx="27" cy="16" r="4" fill="#6B7280" fillOpacity="0.5" />
      {/* Back wheel */}
      <circle cx="45" cy="58" r="18" fill="#1F2937" />
      <circle cx="45" cy="58" r="12" fill="#374151" />
      <circle cx="45" cy="58" r="4" fill="#9CA3AF" />
      {/* Front wheel */}
      <circle cx="88" cy="60" r="12" fill="#1F2937" />
      <circle cx="88" cy="60" r="7" fill="#374151" />
      <circle cx="88" cy="60" r="3" fill="#9CA3AF" />
      {/* Bumper */}
      <rect x="86" y="38" width="8" height="6" rx="2" fill="#6B7280" />
    </svg>
  )
}

export default function TractorAnimation() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!ref.current) return

      const startX = -140
      const endX = window.innerWidth + 140
      const travelWidth = endX - startX
      const amplitude = 12
      const baseY = 6

      const getLandY = (x: number) => {
        const t = (x - startX) / travelWidth
        const angle = t * Math.PI * 2
        return Math.cos(angle) * amplitude + baseY
      }

      gsap.set(ref.current, { x: startX, y: getLandY(startX), scaleX: -1 })

      gsap.to(ref.current, {
        x: endX,
        duration: 14,
        delay: 3,
        repeat: -1,
        repeatDelay: 18,
        ease: 'none',
        onUpdate: () => {
          if (!ref.current) return
          const computedX = gsap.getProperty(ref.current, 'x') as number
          gsap.set(ref.current, { y: getLandY(computedX) })
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="absolute pointer-events-none" style={{ bottom: '10%', zIndex: 20 }}>
      <TractorSVG />
    </div>
  )
}
