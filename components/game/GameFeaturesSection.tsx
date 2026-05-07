'use client'
import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import AchievementBadge from './AchievementBadge'
import { fadeUpVariants } from '@/lib/animations'
import { ACHIEVEMENTS } from '@/lib/constants'
import Button from '@/components/ui/Button'

export default function GameFeaturesSection() {
  return (
    <SectionWrapper id="game" className="py-24 px-6 overflow-hidden" style={{ backgroundColor: '#4A1942' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['🫐','🍓','🌱','⭐','🌾','🍇'].map((emoji, i) => (
          <motion.span key={i} className="absolute text-2xl" style={{ opacity: 0.15, left: `${(i+1)*15}%`, top: `${20+i*10}%` }}
            animate={{ y: [0,-20,0], rotate: [0,10,0] }}
            transition={{ duration: 3+i*0.5, repeat: Infinity, ease: 'easeInOut' }}>
            {emoji}
          </motion.span>
        ))}
      </div>

      <motion.div variants={fadeUpVariants} custom={0} className="text-center mb-14 relative" style={{ zIndex: 10 }}>
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
          style={{ backgroundColor: 'rgba(233,30,140,0.2)', border: '2px solid rgba(233,30,140,0.5)' }}>
          <span>🎮</span>
          <span className="text-sm font-medium" style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(255,248,240,0.8)' }}>Join the Movement</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Fredoka, sans-serif', color: '#FFF8F0' }}>
          Level Up Your Land
        </h2>
        <p className="text-lg max-w-2xl mx-auto" style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(255,248,240,0.7)' }}>
          Every step toward sustainable living is an achievement worth celebrating.
        </p>
      </motion.div>

      <motion.div variants={fadeUpVariants} custom={1} className="flex flex-wrap justify-center gap-10 mb-16 relative" style={{ zIndex: 10 }}>
        {ACHIEVEMENTS.map((a, i) => <AchievementBadge key={a.id} {...a} index={i} />)}
      </motion.div>

      <motion.div variants={fadeUpVariants} custom={4} className="text-center relative" style={{ zIndex: 10 }}>
        <div className="rounded-[20px] max-w-md mx-auto p-8"
          style={{ backgroundColor: '#FFF8F0', border: '4px solid #22C55E',
            boxShadow: 'inset -2px -2px 8px rgba(0,0,0,0.10), 4px 6px 12px rgba(0,0,0,0.18)' }}>
          <div className="text-5xl mb-4">🌅</div>
          <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Fredoka, sans-serif', color: '#4A1942' }}>Daily Harvest</h3>
          <p className="text-sm mb-6" style={{ fontFamily: 'Nunito, sans-serif', color: '#8B5E3C' }}>
            Imagine waking up every morning to fresh berries from your own backyard. That&apos;s the Sustainaberry life.
          </p>
          <Button size="lg" className="w-full"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            🫐 Start Growing Today
          </Button>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
