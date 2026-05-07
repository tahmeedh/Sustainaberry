'use client'
import { useScroll, useTransform, motion } from 'framer-motion'

export default function XPBar() {
  const { scrollYProgress } = useScroll()
  const widthPercent = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full px-5 py-2.5"
      style={{ zIndex: 40, backgroundColor: 'rgba(74,25,66,0.92)', backdropFilter: 'blur(8px)',
        border: '2px solid rgba(233,30,140,0.5)',
        boxShadow: '4px 6px 12px rgba(0,0,0,0.3)' }}>
      <span className="text-sm font-semibold whitespace-nowrap" style={{ fontFamily: 'Fredoka, sans-serif', color: '#FFF8F0' }}>
        ⚡ Farm Level
      </span>
      <div className="w-32 h-3 rounded-full overflow-hidden"
        style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(233,30,140,0.3)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ width: widthPercent, background: 'linear-gradient(90deg, #22C55E, #E91E8C)' }}
        />
      </div>
      <motion.span className="text-xs font-bold" style={{ fontFamily: 'Fredoka, sans-serif', color: '#E91E8C' }}>
        {useTransform(scrollYProgress, v => `${Math.floor(v * 100)}%`)}
      </motion.span>
    </div>
  )
}
