'use client'
import { motion } from 'framer-motion'

export default function CoinAnimation({ savings }: { savings: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none flex items-center gap-1 rounded-full px-2 py-0.5 font-bold text-sm whitespace-nowrap"
      style={{
        top: -32, left: '50%', transform: 'translateX(-50%)',
        backgroundColor: '#EAB308', color: '#4A1942',
        fontFamily: 'Fredoka, sans-serif',
        zIndex: 50,
      }}
      initial={{ opacity: 1, y: 0, scale: 0.5 }}
      animate={{ opacity: 0, y: -60, scale: 1.1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      🪙 +{savings}
    </motion.div>
  )
}
