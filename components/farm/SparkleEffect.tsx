'use client'
import { motion } from 'framer-motion'

const POSITIONS = [
  { x: -20, y: -30 }, { x: 20, y: -35 }, { x: -30, y: -10 },
  { x: 30, y: -15 }, { x: 0, y: -40 }, { x: -15, y: -45 },
]

export default function SparkleEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {POSITIONS.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute font-bold"
          style={{ left: '50%', top: '50%', fontSize: 14, color: '#EAB308' }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
          animate={{ opacity: 0, x: pos.x, y: pos.y, scale: 1, rotate: 180 }}
          transition={{ duration: 0.5, delay: i * 0.04, ease: 'easeOut' }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  )
}
