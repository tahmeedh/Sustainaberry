import { type Variants } from 'framer-motion'

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.4, delay: i * 0.08 },
  }),
}

export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, type: 'spring', stiffness: 200, damping: 15 },
  }),
}

export const cardHoverVariants: Variants = {
  rest: { y: 0 },
  hover: {
    y: -8,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
}

export const buttonPressVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.04 },
  tap: { scale: 0.96 },
}

export const cropHoverVariants: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.15,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
}

export const containerStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
