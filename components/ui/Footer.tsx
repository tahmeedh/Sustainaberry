import Image from 'next/image'
import { BRAND } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="py-12 px-6 text-center" style={{ backgroundColor: '#4A1942' }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Image src="/logo.jpg" alt="Sustainaberry" width={40} height={40} className="rounded-full object-cover" style={{ border: '2px solid rgba(233,30,140,0.5)' }} />
          <span className="text-2xl font-bold" style={{ fontFamily: 'Fredoka, sans-serif', color: '#FFF8F0' }}>Sustainaberry</span>
        </div>
        <p className="text-sm mb-6 max-w-lg mx-auto" style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(255,248,240,0.55)' }}>
          {BRAND.tagline} — helping families grow food independence one berry bush at a time.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm mb-6" style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(255,248,240,0.55)' }}>
          {([['📞', BRAND.phone], ['✉️', BRAND.email], ['📱', BRAND.social]] as [string, string][]).map(([icon, val]) => (
            <span key={val} className="flex items-center gap-1">{icon} {val}</span>
          ))}
        </div>
        <div className="pt-6" style={{ borderTop: '1px solid rgba(255,248,240,0.1)' }}>
          <p className="text-xs" style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(255,248,240,0.3)' }}>
            © 2024 Sustainaberry. All rights reserved. Growing a sustainable future.
          </p>
        </div>
      </div>
    </footer>
  )
}
