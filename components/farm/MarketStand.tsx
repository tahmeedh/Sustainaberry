'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function MarketStand() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(true)}
        className="cursor-pointer flex flex-col items-center gap-1">
        <div className="rounded-[16px] flex flex-col items-center overflow-hidden"
          style={{ width: 88, height: 76, backgroundColor: 'rgba(139,94,60,0.2)', border: '3px solid #8B5E3C',
            boxShadow: 'inset -2px -2px 8px rgba(0,0,0,0.10), 4px 6px 12px rgba(0,0,0,0.18)' }}>
          <div className="w-full flex items-center justify-center" style={{ height: 24, backgroundColor: '#DC2626' }}>
            <span className="font-bold text-white" style={{ fontFamily: 'Fredoka, sans-serif', fontSize: 9 }}>BERRY MARKET</span>
          </div>
          <div className="flex gap-1 mt-2 text-lg">🫐🍓🍇</div>
        </div>
        <span className="text-xs font-medium" style={{ fontFamily: 'Nunito, sans-serif', color: '#8B5E3C' }}>Click to shop!</span>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-6"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100 }}
            onClick={() => setOpen(false)}>
            <motion.div initial={{ scale: 0.8, y: 40 }} animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="rounded-[20px] p-8 max-w-sm w-full"
              style={{ backgroundColor: '#FFF8F0', border: '4px solid #4A1942',
                boxShadow: 'inset -2px -2px 8px rgba(0,0,0,0.10), 4px 6px 12px rgba(0,0,0,0.18)' }}
              onClick={e => e.stopPropagation()}>
              <h3 className="text-3xl font-bold text-center mb-2" style={{ fontFamily: 'Fredoka, sans-serif', color: '#4A1942' }}>🏪 Berry Market</h3>
              <p className="text-center mb-6" style={{ fontFamily: 'Nunito, sans-serif', color: '#8B5E3C' }}>Ready to grow your own free fruit every year?</p>
              <Button className="w-full mb-3" onClick={() => { setOpen(false); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) }}>
                🌱 View Berry Packages
              </Button>
              <Button variant="secondary" className="w-full" onClick={() => setOpen(false)}>Maybe later</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
