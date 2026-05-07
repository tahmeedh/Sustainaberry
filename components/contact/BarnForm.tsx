'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedMailbox from './AnimatedMailbox'
import Button from '@/components/ui/Button'

interface FormState { name: string; email: string; phone: string; message: string }
interface FormErrors { name?: string; email?: string; message?: string }

export default function BarnForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [focused, setFocused] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!form.name.trim()) e.name = 'Your name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'A valid email is required'
    if (!form.message.trim()) e.message = 'Tell us about your land!'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    await new Promise(r => setTimeout(r, 1500))
    setStatus('success')
  }

  const inputStyle = (field: keyof FormErrors): React.CSSProperties => ({
    width: '100%', padding: '12px 16px', borderRadius: 12,
    border: `2px solid ${errors[field] ? '#EF4444' : 'rgba(139,94,60,0.35)'}`,
    backgroundColor: 'rgba(255,248,240,0.8)', color: '#4A1942',
    fontFamily: 'Nunito, sans-serif', fontSize: 15, outline: 'none',
  })

  if (status === 'success') {
    return (
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
        <motion.div animate={{ rotate: [0,-10,10,0], scale: [1,1.2,1] }} transition={{ duration: 0.8 }} className="text-6xl mb-4">🌱</motion.div>
        <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Fredoka, sans-serif', color: '#4A1942' }}>Message Received!</h3>
        <p style={{ fontFamily: 'Nunito, sans-serif', color: '#8B5E3C' }}>We&apos;ll be in touch soon to start your berry journey.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <AnimatedMailbox focused={focused} />
      <div className="space-y-4">
        {[
          { id: 'name', label: 'Your Name *', type: 'text', placeholder: 'e.g. Jane Smith', field: 'name' as keyof FormState },
          { id: 'email', label: 'Email Address *', type: 'email', placeholder: 'you@example.com', field: 'email' as keyof FormState },
          { id: 'phone', label: 'Phone (optional)', type: 'tel', placeholder: '+1 (604) 555-0100', field: 'phone' as keyof FormState },
        ].map(({ id, label, type, placeholder, field }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-semibold mb-1"
              style={{ fontFamily: 'Nunito, sans-serif', color: '#4A1942' }}>{label}</label>
            <input id={id} type={type} placeholder={placeholder} value={form[field]}
              onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
              onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
              style={inputStyle(field as keyof FormErrors)} />
            {errors[field as keyof FormErrors] && (
              <p className="text-xs mt-1" style={{ color: '#EF4444', fontFamily: 'Nunito, sans-serif' }}>
                {errors[field as keyof FormErrors]}
              </p>
            )}
          </div>
        ))}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold mb-1"
            style={{ fontFamily: 'Nunito, sans-serif', color: '#4A1942' }}>Tell Us About Your Land *</label>
          <textarea id="message" rows={4} placeholder="What kind of land do you have? How big? Any specific berries you love?..."
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={{ ...inputStyle('message'), resize: 'none' }} />
          {errors.message && <p className="text-xs mt-1" style={{ color: '#EF4444', fontFamily: 'Nunito, sans-serif' }}>{errors.message}</p>}
        </div>
        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <span className="flex items-center justify-center gap-2">
              <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>🌱</motion.span>
              Planting your message...
            </span>
          ) : '🌿 Send Message'}
        </Button>
      </div>
    </form>
  )
}
