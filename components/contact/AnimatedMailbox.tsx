'use client'
import { motion } from 'framer-motion'

export default function AnimatedMailbox({ focused }: { focused: boolean }) {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative" style={{ width: 96, height: 80 }}>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-sm" style={{ width: 16, height: 40, backgroundColor: '#8B5E3C' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-[12px] flex items-end justify-center pb-1 overflow-visible"
          style={{ width: 80, height: 56, backgroundColor: '#B91C1C', border: '4px solid #7F1D1D' }}>
          <div className="rounded-full" style={{ width: 40, height: 6, backgroundColor: '#7F1D1D', marginBottom: 4 }} />
          <motion.div className="absolute"
            animate={{ rotate: focused ? -80 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            style={{ right: -4, top: 4, transformOrigin: 'bottom center' }}>
            <div className="rounded-sm" style={{ width: 6, height: 32, backgroundColor: '#4B5563' }} />
            <div className="absolute top-0 rounded-sm" style={{ left: 6, width: 20, height: 16, backgroundColor: '#EF4444' }} />
          </motion.div>
        </div>
      </div>
      <p className="text-sm mt-2" style={{ fontFamily: 'Nunito, sans-serif', color: '#8B5E3C' }}>
        {focused ? '✉️ Ready to send!' : '📬 Drop us a message'}
      </p>
    </div>
  )
}
