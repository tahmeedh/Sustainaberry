'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode, type CSSProperties } from 'react'
import { containerStagger } from '@/lib/animations'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
  style?: CSSProperties
}

export default function SectionWrapper({ children, className = '', id, style }: SectionWrapperProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={containerStagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`relative ${className}`}
      style={style}
    >
      {children}
    </motion.section>
  )
}
