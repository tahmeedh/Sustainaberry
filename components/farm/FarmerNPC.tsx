'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

function FarmerSVG({ facing }: { facing: 'right' | 'left' }) {
  return (
    <svg width="40" height="60" viewBox="0 0 40 60" fill="none"
      style={{ transform: facing === 'left' ? 'scaleX(-1)' : 'none' }}>
      <circle cx="20" cy="12" r="9" fill="#FBBF24"/>
      <ellipse cx="20" cy="5" rx="12" ry="3" fill="#8B5E3C"/>
      <rect x="12" y="2" width="16" height="5" rx="2" fill="#6B4423"/>
      <rect x="12" y="22" width="16" height="18" rx="4" fill="#3B82F6"/>
      <rect x="14" y="22" width="3" height="14" rx="1.5" fill="#1D4ED8"/>
      <rect x="23" y="22" width="3" height="14" rx="1.5" fill="#1D4ED8"/>
      <rect x="4" y="23" width="8" height="14" rx="4" fill="#FBBF24"/>
      <rect x="28" y="23" width="8" height="14" rx="4" fill="#FBBF24"/>
      <rect x="12" y="38" width="7" height="16" rx="3" fill="#1F2937"/>
      <rect x="21" y="38" width="7" height="16" rx="3" fill="#1F2937"/>
      <rect x="10" y="50" width="10" height="8" rx="3" fill="#4B3621"/>
      <rect x="20" y="50" width="10" height="8" rx="3" fill="#4B3621"/>
    </svg>
  )
}

export default function FarmerNPC() {
  const ref = useRef<HTMLDivElement>(null)
  const [facing, setFacing] = useState<'right' | 'left'>('right')

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!ref.current) return
      const tl = gsap.timeline({ repeat: -1 })
      tl.set(ref.current, { x: 60 })
        .to(ref.current, { x: 480, duration: 5, ease: 'none', onStart: () => setFacing('right') })
        .to(ref.current, { duration: 0.5 })
        .to(ref.current, { x: 60, duration: 5, ease: 'none', onStart: () => setFacing('left') })
        .to(ref.current, { duration: 0.5 })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="absolute bottom-0 pointer-events-none" style={{ zIndex: 30 }}>
      <FarmerSVG facing={facing} />
    </div>
  )
}
