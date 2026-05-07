'use client'
import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import BarnForm from './BarnForm'
import { fadeUpVariants } from '@/lib/animations'
import { BRAND } from '@/lib/constants'

export default function ContactSection() {
  return (
    <SectionWrapper id="contact" className="py-24 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #E8F5D0 100%)' }}>
      <div className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none" style={{ height: 64 }}>
        <svg viewBox="0 0 1440 64" className="w-full" fill="none" preserveAspectRatio="none">
          <path d="M0 64 L720 0 L1440 64" fill="rgba(139,94,60,0.12)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUpVariants} custom={0} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{ backgroundColor: 'rgba(139,94,60,0.12)', border: '2px solid #8B5E3C' }}>
            <span>🏚️</span>
            <span className="text-sm font-medium" style={{ fontFamily: 'Nunito, sans-serif', color: '#8B5E3C' }}>Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Fredoka, sans-serif', color: '#4A1942' }}>
            Join Us in Taking Action!
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ fontFamily: 'Nunito, sans-serif', color: '#8B5E3C' }}>
            Ready to grow free fruit every year? Let&apos;s talk about your land.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div variants={fadeUpVariants} custom={1}
            className="rounded-[20px] p-8"
            style={{ backgroundColor: '#FFF8F0', border: '4px solid #8B5E3C',
              boxShadow: 'inset -2px -2px 8px rgba(0,0,0,0.10), 4px 6px 12px rgba(0,0,0,0.18)' }}>
            <BarnForm />
          </motion.div>

          <motion.div variants={fadeUpVariants} custom={2} className="space-y-6">
            <div className="rounded-[20px] p-6"
              style={{ backgroundColor: 'rgba(34,197,94,0.12)', border: '4px solid #22C55E',
                boxShadow: 'inset -2px -2px 8px rgba(0,0,0,0.10), 4px 6px 12px rgba(0,0,0,0.18)' }}>
              <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Fredoka, sans-serif', color: '#4A1942' }}>Contact Us Directly</h3>
              {[
                { icon: '📞', label: 'Phone', value: BRAND.phone, href: `tel:+16047856929` },
                { icon: '✉️', label: 'Email', value: BRAND.email, href: `mailto:${BRAND.email}` },
                { icon: '📱', label: 'Social', value: BRAND.social, href: '#' },
              ].map(item => (
                <a key={item.label} href={item.href}
                  className="flex items-center gap-4 p-4 rounded-[12px] mb-3 no-underline transition-colors duration-200"
                  style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'white')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.6)')}>
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="text-xs" style={{ fontFamily: 'Nunito, sans-serif', color: '#8B5E3C' }}>{item.label}</div>
                    <div className="font-semibold" style={{ fontFamily: 'Nunito, sans-serif', color: '#4A1942' }}>{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="rounded-[20px] p-6 text-center"
              style={{ backgroundColor: '#4A1942', border: '4px solid #E91E8C',
                boxShadow: 'inset -2px -2px 8px rgba(0,0,0,0.10), 4px 6px 12px rgba(0,0,0,0.18)' }}>
              <div className="text-4xl mb-3">🫐</div>
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Fredoka, sans-serif', color: '#FFF8F0' }}>{BRAND.tagline}</h3>
              <p className="text-sm" style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(255,248,240,0.65)' }}>
                Environmental sustainability involves making responsible choices that ensure the long-term health of our planet.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
