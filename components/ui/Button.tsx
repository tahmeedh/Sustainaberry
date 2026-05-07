'use client'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { buttonPressVariants } from '@/lib/animations'
import { type ReactNode } from 'react'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const variantStyles: Record<string, string> = {
  primary:
    'text-white border-4 border-[#2E0F28]',
  secondary:
    'border-4 border-[#4A1942]',
  ghost:
    'bg-transparent border-2 border-white/50 hover:border-white text-white',
}

const variantBg: Record<string, string> = {
  primary: '#E91E8C',
  secondary: '#FFF8F0',
  ghost: 'transparent',
}

const variantColor: Record<string, string> = {
  primary: '#ffffff',
  secondary: '#4A1942',
  ghost: '#ffffff',
}

const sizeStyles: Record<string, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  style,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      variants={buttonPressVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={`font-bold cursor-pointer transition-colors duration-200 rounded-[20px] shadow-[inset_-2px_-2px_8px_rgba(0,0,0,0.10),_4px_6px_12px_rgba(0,0,0,0.18)] ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      style={{
        fontFamily: 'Fredoka, sans-serif',
        backgroundColor: variantBg[variant],
        color: variantColor[variant],
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
