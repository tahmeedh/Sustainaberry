'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { BRAND } from '@/lib/constants'
import { fadeUpVariants } from '@/lib/animations'

export default function HeroContent() {
  return (
    <div className="relative flex flex-col items-center justify-center h-full text-center px-6 pt-20" style={{ zIndex: 30 }}>
      <motion.div
        variants={fadeUpVariants} custom={0} initial="hidden" animate="visible"
        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 border-2"
        style={{ backgroundColor: 'rgba(233,30,140,0.2)', borderColor: 'rgba(233,30,140,0.5)' }}
      >
        <Image src="/logo.jpg" alt="Sustainaberry" width={22} height={22} className="rounded-full object-cover" />
        <span className="text-sm font-medium" style={{ fontFamily: 'Nunito, sans-serif', color: '#FFF8F0' }}>Sustainaberry Farm</span>
      </motion.div>

      <motion.h1
        variants={fadeUpVariants} custom={1} initial="hidden" animate="visible"
        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight"
        style={{ fontFamily: 'Fredoka, sans-serif', color: '#FFF8F0' }}
      >
        {BRAND.heroHeadline}
      </motion.h1>

      <motion.p
        variants={fadeUpVariants} custom={2} initial="hidden" animate="visible"
        className="text-lg md:text-xl max-w-2xl mb-8 leading-relaxed"
        style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(255,248,240,0.8)' }}
      >
        {BRAND.heroSubhead}
      </motion.p>

      <motion.div
        variants={fadeUpVariants} custom={3} initial="hidden" animate="visible"
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button variant="primary" size="lg"
          onClick={() => document.getElementById('farm')?.scrollIntoView({ behavior: 'smooth' })}>
          🌱 {BRAND.heroCta}
        </Button>
        <Button variant="secondary" size="lg"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
          ✨ {BRAND.heroCtaSecondary}
        </Button>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 flex flex-col items-center"
        style={{ color: 'rgba(255,248,240,0.5)' }}
      >
        <span className="text-xs mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </div>
  )
}
