'use client'
import { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import DayNightToggle from './DayNightToggle'
import Button from './Button'

const NAV_LINKS = [
  { label: 'Farm', href: '#farm' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.95])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: 'rgba(74,25,66,0)' }}
    >
      <motion.div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ opacity: bgOpacity, backgroundColor: '#4A1942' }}
      />
      <div className="relative px-6 py-4 flex items-center justify-between">
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 no-underline"
          style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#FFF8F0' }}
        >
          <Image src="/logo.jpg" alt="Sustainaberry" width={44} height={44} className="rounded-full object-cover" style={{ border: '2px solid rgba(233,30,140,0.5)' }} />
          Sustainaberry
        </motion.a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="no-underline text-sm font-medium transition-colors duration-200"
              style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(255,248,240,0.8)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FFF8F0')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,248,240,0.8)')}
            >
              {link.label}
            </motion.a>
          ))}
          <DayNightToggle />
          <Button
            variant="primary"
            size="sm"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Join Now
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 cursor-pointer"
          style={{ color: '#FFF8F0', background: 'none', border: 'none' }}
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-6 py-4 flex flex-col gap-4"
            style={{ backgroundColor: 'rgba(74,25,66,0.97)' }}
          >
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="no-underline py-2 text-base"
                style={{
                  fontFamily: 'Nunito, sans-serif',
                  color: '#FFF8F0',
                  borderBottom: '1px solid rgba(255,248,240,0.1)',
                }}
              >
                {link.label}
              </a>
            ))}
            <DayNightToggle />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
