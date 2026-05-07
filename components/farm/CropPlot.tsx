'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CropTooltip from './CropTooltip'
import SparkleEffect from './SparkleEffect'
import CoinAnimation from '@/components/game/CoinAnimation'

interface Crop {
  id: string; name: string; emoji: string
  savings: string; color: string; bgColor: string; description: string
}

export default function CropPlot({ crop }: { crop: Crop }) {
  const [hovered, setHovered] = useState(false)
  const [showSparkle, setShowSparkle] = useState(false)
  const [coinKey, setCoinKey] = useState(0)
  const [showCoin, setShowCoin] = useState(false)

  const handleHoverStart = () => {
    setHovered(true)
    setShowSparkle(true)
    setTimeout(() => setShowSparkle(false), 600)
  }

  const handleClick = () => {
    setCoinKey(k => k + 1)
    setShowCoin(true)
    setTimeout(() => setShowCoin(false), 1200)
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width: 96, height: 96 }}>
      <motion.div
        onHoverStart={handleHoverStart}
        onHoverEnd={() => setHovered(false)}
        onClick={handleClick}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="relative flex items-center justify-center cursor-pointer rounded-[20px]"
        style={{
          width: 80, height: 80,
          backgroundColor: crop.bgColor,
          border: `4px solid ${crop.color}`,
          boxShadow: 'inset -2px -2px 8px rgba(0,0,0,0.10), 4px 6px 12px rgba(0,0,0,0.18)',
        }}
      >
        <span className="text-4xl select-none">{crop.emoji}</span>
        {showSparkle && <SparkleEffect />}
      </motion.div>

      <AnimatePresence>
        {hovered && <CropTooltip name={crop.name} savings={crop.savings} description={crop.description} />}
      </AnimatePresence>

      {showCoin && <CoinAnimation key={coinKey} savings={crop.savings} />}
    </div>
  )
}
