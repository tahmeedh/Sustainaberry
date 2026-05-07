'use client'
import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useDayNight } from '@/context/DayNightContext'
import CloudLayer from './CloudLayer'
import TractorAnimation from './TractorAnimation'
import BirdAnimation from './BirdAnimation'
import ParticleSystem from './ParticleSystem'
import ThreeBerries from './ThreeBerries'
import HeroContent from './HeroContent'

export default function HeroSection() {
  const { isNight } = useDayNight()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const skyY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const skyGradient = isNight
    ? 'linear-gradient(180deg, #0F0A1E 0%, #1A0D2E 60%, #2D1F0A 100%)'
    : 'linear-gradient(180deg, #87CEEB 0%, #B0E2FF 55%, #C8F09A 100%)'

  const groundColor = isNight ? '#2D4A1F' : '#5D8A3C'
  const groundDark = isNight ? '#1F3315' : '#4A7A2E'

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ height: '100vh' }}>
      {/* Sky */}
      <motion.div
        className="absolute inset-0 transition-all duration-1000"
        style={{ y: skyY, background: skyGradient }}
      />

      {/* Stars (night only) */}
      {isNight && Array.from({ length: 60 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2, height: 2,
            backgroundColor: 'white',
            left: `${(i * 17.3) % 100}%`,
            top: `${(i * 11.7) % 60}%`,
            zIndex: 5,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: (i % 3) + 1, repeat: Infinity, delay: (i * 0.13) % 2 }}
        />
      ))}

      {/* Three.js berries */}
      <ThreeBerries />

      {/* Clouds */}
      <CloudLayer />

      {/* Birds */}
      <BirdAnimation />

      {/* Particles */}
      <ParticleSystem />

      {/* Ground hills */}
      <div className="absolute bottom-0 left-0 right-0" style={{ zIndex: 20 }}>
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 200V80 Q200 20 400 80 Q600 140 800 60 Q1000 -20 1200 80 Q1320 120 1440 60V200Z" fill={groundColor} />
          <path d="M0 200V120 Q180 80 360 120 Q540 160 720 100 Q900 40 1080 120 Q1260 160 1440 100V200Z" fill={groundDark} />
        </svg>
      </div>

      {/* Tractor */}
      <TractorAnimation />

      {/* Berry plants on ground */}
      <div className="absolute w-full flex justify-around px-8 pointer-events-none" style={{ bottom: '10%', zIndex: 25 }}>
        {['🍓', '🫐', '🍇', '🍓', '🫐', '🍇', '🍓'].map((berry, i) => (
          <motion.span
            key={i}
            className="text-2xl md:text-3xl select-none"
            animate={{ rotate: [-2, 2, -2], y: [0, -4, 0] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
          >
            {berry}
          </motion.span>
        ))}
      </div>

      {/* Hero content */}
      <motion.div
        className="absolute inset-0"
        style={{ y: contentY, opacity, zIndex: 30 }}
      >
        <HeroContent />
      </motion.div>
    </div>
  )
}
