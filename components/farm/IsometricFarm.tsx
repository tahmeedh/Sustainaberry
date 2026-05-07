'use client'
import { motion } from 'framer-motion'
import { CROPS } from '@/lib/constants'
import CropPlot from './CropPlot'
import FarmerNPC from './FarmerNPC'
import MarketStand from './MarketStand'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { fadeUpVariants } from '@/lib/animations'

export default function IsometricFarm() {
  return (
    <SectionWrapper id="farm" className="py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, rgba(34,197,94,0.15) 0%, #FFF8F0 100%)' }}>
      <motion.div variants={fadeUpVariants} custom={0} className="text-center mb-12 px-6">
        <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Fredoka, sans-serif', color: '#4A1942' }}>
          🌾 The Sustainaberry Farm
        </h2>
        <p className="mt-3 text-lg" style={{ fontFamily: 'Nunito, sans-serif', color: '#8B5E3C' }}>
          Hover over the crops to discover your savings. Click to harvest!
        </p>
      </motion.div>

      <motion.div variants={fadeUpVariants} custom={1} className="relative max-w-3xl mx-auto px-6">
        <div className="relative rounded-[28px] p-8 overflow-hidden"
          style={{ backgroundColor: 'rgba(34,197,94,0.2)', border: '4px solid #8B5E3C', minHeight: 420 }}>
          {/* Fence top */}
          <div className="absolute top-0 left-0 right-0 flex justify-around">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="w-3 h-6 rounded-t-sm border border-gray-200" style={{ backgroundColor: 'white' }} />
            ))}
          </div>
          <div className="absolute top-4 left-0 right-0 h-2 border-b-2 border-gray-200" style={{ backgroundColor: 'white' }} />

          {/* Crop grid */}
          <div className="grid grid-cols-3 gap-4 justify-items-center pt-6">
            {CROPS.map((crop, i) => (
              <motion.div key={crop.id} variants={fadeUpVariants} custom={i + 2}>
                <CropPlot crop={crop} />
              </motion.div>
            ))}
          </div>

          {/* Market stand */}
          <div className="absolute top-4 right-4">
            <MarketStand />
          </div>

          {/* Farmer NPC path */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: 64 }}>
            <FarmerNPC />
          </div>

          {/* Soil patches */}
          <div className="absolute bottom-12 left-0 right-0 flex justify-around px-8 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-full" style={{ width: 64, height: 12, backgroundColor: 'rgba(139,94,60,0.3)' }} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Crop legend */}
      <motion.div variants={fadeUpVariants} custom={8} className="flex flex-wrap justify-center gap-3 mt-8 px-6">
        {CROPS.map(crop => (
          <div key={crop.id} className="flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{ backgroundColor: 'white', border: `2px solid ${crop.color}` }}>
            <span>{crop.emoji}</span>
            <span className="text-sm font-medium" style={{ fontFamily: 'Nunito, sans-serif', color: crop.color }}>{crop.name}</span>
            <span className="text-xs font-bold" style={{ fontFamily: 'Nunito, sans-serif', color: '#22C55E' }}>{crop.savings}</span>
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
