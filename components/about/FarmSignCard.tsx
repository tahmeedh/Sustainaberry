import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/lib/animations'

interface Props { title: string; body: string; icon: string; borderColor: string; bgColor: string; index: number }

export default function FarmSignCard({ title, body, icon, borderColor, bgColor, index }: Props) {
  return (
    <motion.div
      variants={fadeUpVariants} custom={index}
      whileHover={{ y: -8, rotate: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="relative p-6 rounded-[20px]"
      style={{ backgroundColor: bgColor, border: `3px solid ${borderColor}`, boxShadow: 'inset -2px -2px 8px rgba(0,0,0,0.10), 4px 6px 12px rgba(0,0,0,0.18)' }}
    >
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3 h-6 rounded-sm" style={{ backgroundColor: '#8B5E3C' }} />
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-2 rounded-sm" style={{ backgroundColor: '#8B5E3C' }} />
      <div className="text-4xl mb-3 text-center">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-center" style={{ fontFamily: 'Fredoka, sans-serif', color: '#4A1942' }}>{title}</h3>
      <p className="text-sm leading-relaxed text-center" style={{ fontFamily: 'Nunito, sans-serif', color: '#8B5E3C' }}>{body}</p>
    </motion.div>
  )
}
