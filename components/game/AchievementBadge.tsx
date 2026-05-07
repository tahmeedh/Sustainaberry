'use client'
import { useRef } from 'react'
import { useInView, motion } from 'framer-motion'

interface Props { emoji: string; label: string; description: string; index: number }

export default function AchievementBadge({ emoji, label, description, index }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div ref={ref} initial={{ scale: 0, rotate: -10 }}
      animate={inView ? { scale: 1, rotate: 0 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 15, delay: index * 0.15 }}
      className="flex flex-col items-center gap-2">
      <motion.div
        className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
        style={{
          background: 'linear-gradient(135deg, #FDE047, #EAB308)',
          border: '4px solid #CA8A04',
          boxShadow: '4px 6px 12px rgba(0,0,0,0.2)',
        }}
        animate={inView ? { boxShadow: ['4px 6px 12px rgba(0,0,0,0.2)', '0 0 24px rgba(234,179,8,0.7)', '4px 6px 12px rgba(0,0,0,0.2)'] } : {}}
        transition={{ repeat: 3, duration: 0.6, delay: index * 0.15 + 0.3 }}
      >
        {emoji}
      </motion.div>
      <div className="text-center">
        <div className="text-sm font-bold" style={{ fontFamily: 'Fredoka, sans-serif', color: '#FFF8F0' }}>{label}</div>
        <div className="text-xs" style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(255,248,240,0.6)' }}>{description}</div>
      </div>
    </motion.div>
  )
}
