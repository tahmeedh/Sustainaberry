'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => setVisible(false), 400)
          return 100
        }
        return p + 2
      })
    }, 36)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#4A1942' }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="mb-6 select-none"
          >
            <Image src="/logo.jpg" alt="Sustainaberry" width={120} height={120} className="rounded-full object-cover" style={{ border: '3px solid rgba(233,30,140,0.5)' }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: 'Fredoka, sans-serif', color: '#FFF8F0' }}
          >
            Sustainaberry
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm mb-8"
            style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(255,248,240,0.6)' }}
          >
            Loading your farm...
          </motion.p>

          <div
            className="w-64 h-4 rounded-full overflow-hidden"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '2px solid rgba(233,30,140,0.4)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #E91E8C, #22C55E)',
                width: `${progress}%`,
              }}
              transition={{ ease: 'linear' }}
            />
          </div>

          <p
            className="text-xs mt-2"
            style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(255,248,240,0.4)' }}
          >
            {progress}%
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-3 mt-8"
          >
            {[null, '🍓', '🌱', '🍇', '🌾'].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-xl flex items-center"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
              >
                {emoji === null
                  ? <Image src="/logo.jpg" alt="Sustainaberry" width={28} height={28} className="rounded-full object-cover" />
                  : emoji}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
