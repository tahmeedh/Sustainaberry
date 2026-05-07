import { motion } from 'framer-motion'

interface Props { name: string; savings: string; description: string }

export default function CropTooltip({ name, savings, description }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.9 }}
      transition={{ duration: 0.15 }}
      className="absolute pointer-events-none rounded-[20px] p-3"
      style={{
        bottom: '110%', left: '50%', transform: 'translateX(-50%)',
        width: 176, zIndex: 50,
        backgroundColor: '#FFF8F0',
        border: '3px solid #4A1942',
        boxShadow: 'inset -2px -2px 8px rgba(0,0,0,0.10), 4px 6px 12px rgba(0,0,0,0.18)',
      }}
    >
      <p className="font-semibold text-sm" style={{ fontFamily: 'Fredoka, sans-serif', color: '#4A1942' }}>{name}</p>
      <p className="font-bold text-sm" style={{ fontFamily: 'Nunito, sans-serif', color: '#22C55E' }}>💰 {savings}</p>
      <p className="text-xs mt-1 leading-tight" style={{ fontFamily: 'Nunito, sans-serif', color: '#8B5E3C' }}>{description}</p>
      <div className="absolute w-3 h-3 rotate-45"
        style={{ bottom: -7, left: '50%', marginLeft: -6, backgroundColor: '#FFF8F0', borderRight: '2px solid #4A1942', borderBottom: '2px solid #4A1942' }} />
    </motion.div>
  )
}
