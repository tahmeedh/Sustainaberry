'use client'
import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import BerryBushCard from './BerryBushCard'
import { fadeUpVariants } from '@/lib/animations'
import { SERVICE_TIERS } from '@/lib/constants'

export default function ServicesSection() {
  return (
    <SectionWrapper id="services" className="py-24 px-6"
      style={{ background: 'linear-gradient(180deg, rgba(34,197,94,0.08) 0%, #FFF8F0 100%)' }}>
      <motion.div variants={fadeUpVariants} custom={0} className="text-center mb-14">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
          style={{ backgroundColor: 'rgba(74,25,66,0.08)', border: '2px solid #4A1942' }}>
          <span>🛒</span>
          <span className="text-sm font-medium" style={{ fontFamily: 'Nunito, sans-serif', color: '#4A1942' }}>Berry Packages</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
          style={{ fontFamily: 'Fredoka, sans-serif', color: '#4A1942' }}>
          Choose Your Berry Journey
        </h2>
        <p className="text-lg max-w-2xl mx-auto" style={{ fontFamily: 'Nunito, sans-serif', color: '#8B5E3C' }}>
          Every package includes expert consultation, organic plants, and your path to food independence.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {SERVICE_TIERS.map((tier, i) => (
          <BerryBushCard key={tier.id} {...tier} index={i + 1} />
        ))}
      </div>
      <motion.p variants={fadeUpVariants} custom={6} className="text-center mt-8 text-sm"
        style={{ fontFamily: 'Nunito, sans-serif', color: '#8B5E3C' }}>
        Contact us for pricing — every property is unique and we tailor each plan to your land.
      </motion.p>
    </SectionWrapper>
  )
}
