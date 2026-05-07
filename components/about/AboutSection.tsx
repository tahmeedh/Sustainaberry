'use client'
import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import StatCounter from './StatCounter'
import FarmSignCard from './FarmSignCard'
import { fadeUpVariants } from '@/lib/animations'
import { ABOUT_CARDS, STATS } from '@/lib/constants'

export default function AboutSection() {
  return (
    <SectionWrapper id="about" className="py-24 px-6" style={{ backgroundColor: '#FFF8F0' }}>
      <motion.div variants={fadeUpVariants} custom={0} className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
          style={{ backgroundColor: 'rgba(34,197,94,0.15)', border: '2px solid #22C55E' }}>
          <span>🌍</span>
          <span className="text-sm font-medium" style={{ fontFamily: 'Nunito, sans-serif', color: '#4A1942' }}>Our Mission</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
          style={{ fontFamily: 'Fredoka, sans-serif', color: '#4A1942' }}>
          Maximizing Your Land.<br />Maximizing Your Life.
        </h2>
        <p className="text-lg leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif', color: '#8B5E3C' }}>
          Environmental sustainability involves making responsible choices that ensure the long-term health of our planet.
          We help everyday people become food-independent — one berry bush at a time.
        </p>
      </motion.div>

      <motion.div variants={fadeUpVariants} custom={1} className="flex flex-wrap justify-center gap-12 mb-20">
        {STATS.map(stat => <StatCounter key={stat.label} {...stat} />)}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-8">
        {ABOUT_CARDS.map((card, i) => (
          <FarmSignCard key={card.title} {...card} index={i + 2} />
        ))}
      </div>
    </SectionWrapper>
  )
}
