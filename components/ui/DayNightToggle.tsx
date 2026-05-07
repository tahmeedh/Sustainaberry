'use client'
import { motion } from 'framer-motion'
import { useDayNight } from '@/context/DayNightContext'

export default function DayNightToggle() {
  const { isNight, toggle } = useDayNight()

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      className="w-14 h-7 rounded-full relative cursor-pointer overflow-hidden border-2 border-[#4A1942]"
      style={{ backgroundColor: isNight ? '#1A0D2E' : '#87CEEB' }}
      aria-label={isNight ? 'Switch to day mode' : 'Switch to night mode'}
    >
      <motion.div
        className="absolute top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-sm"
        animate={{
          x: isNight ? 28 : 2,
          backgroundColor: isNight ? '#F5F0B8' : '#FDB537',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {isNight ? '🌙' : '☀️'}
      </motion.div>
    </motion.button>
  )
}
