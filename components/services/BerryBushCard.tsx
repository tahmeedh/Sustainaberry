'use client'
import { motion } from 'framer-motion'
import { cardHoverVariants, fadeUpVariants } from '@/lib/animations'
import RarityBadge from './RarityBadge'
import Button from '@/components/ui/Button'

const BERRY_EMOJIS: Record<string, string> = {
  Blueberries: '🫐', Raspberries: '🍇', Strawberries: '🍓', Blackberries: '🫐', 'All varieties': '🌱',
}

interface Props {
  name: string; description: string; berries: string[]
  badges: string[]; borderColor: string; bgColor: string
  accent: string; highlight: boolean; index: number
}

export default function BerryBushCard({ name, description, berries, badges, borderColor, bgColor, accent, highlight, index }: Props) {
  return (
    <motion.div variants={fadeUpVariants} custom={index} whileHover="hover" initial="rest" animate="rest">
      <motion.div variants={cardHoverVariants}
        className="rounded-[20px] p-6 h-full flex flex-col relative"
        style={{ backgroundColor: bgColor, border: `4px solid ${borderColor}`,
          boxShadow: highlight
            ? `inset -2px -2px 8px rgba(0,0,0,0.10), 4px 6px 12px rgba(0,0,0,0.18), 0 0 0 4px #E91E8C, 0 0 0 6px rgba(233,30,140,0.3)`
            : 'inset -2px -2px 8px rgba(0,0,0,0.10), 4px 6px 12px rgba(0,0,0,0.18)' }}>
        {highlight && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap"
            style={{ backgroundColor: '#E91E8C', fontFamily: 'Fredoka, sans-serif' }}>
            ⭐ Most Popular
          </div>
        )}
        {/* Crate visual */}
        <div className="w-full rounded-[12px] mb-4 flex items-center justify-center relative overflow-hidden"
          style={{ height: 112, backgroundColor: accent + '18', border: `2px solid ${accent}` }}>
          <div className="absolute inset-0 flex flex-col justify-around opacity-15 pointer-events-none">
            {[0,1,2].map(i => <div key={i} className="h-px w-full" style={{ backgroundColor: accent }} />)}
          </div>
          <div className="absolute top-0 bottom-0 w-px opacity-15" style={{ left: '33%', backgroundColor: accent }} />
          <div className="absolute top-0 bottom-0 w-px opacity-15" style={{ left: '66%', backgroundColor: accent }} />
          <div className="flex gap-2 text-4xl" style={{ zIndex: 1 }}>
            {berries.slice(0, 3).map((b, i) => (
              <motion.span key={i} animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}>
                {BERRY_EMOJIS[b] ?? '🌱'}
              </motion.span>
            ))}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Fredoka, sans-serif', color: '#4A1942' }}>{name}</h3>
        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ fontFamily: 'Nunito, sans-serif', color: '#8B5E3C' }}>{description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {badges.map(b => <RarityBadge key={b} label={b} />)}
        </div>
        <Button variant="primary" size="sm" className="w-full"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
          🌱 Get Started
        </Button>
      </motion.div>
    </motion.div>
  )
}
