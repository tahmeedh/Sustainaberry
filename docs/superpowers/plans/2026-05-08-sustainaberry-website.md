# Sustainaberry Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready, FarmVille-inspired animated Next.js website for Sustainaberry — a sustainable berry-bush planting service.

**Architecture:** Next.js 14 App Router with TypeScript and Tailwind CSS. GSAP handles ambient hero animations (tractor, clouds, birds). Framer Motion handles scroll-triggered section entrances and interaction states. Three.js adds 3D berry orbs in the hero. All sections are lazy-loaded client components assembled in `app/page.tsx`.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, GSAP + @gsap/react, Three.js + @react-three/fiber + @react-three/drei, Fredoka + Nunito (Google Fonts)

---

## File Map

```
app/
  layout.tsx                   # fonts, metadata, DayNightProvider wrapper
  page.tsx                     # section assembler (lazy imports)
  globals.css                  # CSS variables, base resets, keyframes

components/
  hero/
    HeroSection.tsx            # fullscreen layered parallax container
    CloudLayer.tsx             # GSAP cloud drift animation
    TractorAnimation.tsx       # GSAP tractor loop
    BirdAnimation.tsx          # SVG bird path animation
    ParticleSystem.tsx         # canvas floating leaves/pollen
    HeroContent.tsx            # headline, subhead, CTA buttons
    ThreeBerries.tsx           # Three.js berry orb scene

  farm/
    IsometricFarm.tsx          # CSS isometric grid + fence + title
    CropPlot.tsx               # individual crop tile with hover state
    SparkleEffect.tsx          # sparkle particles emitted on hover
    CropTooltip.tsx            # tooltip card with crop stats
    FarmerNPC.tsx              # animated walking farmer SVG
    MarketStand.tsx            # clickable market stand with modal

  about/
    AboutSection.tsx           # section wrapper + layout
    StatCounter.tsx            # scroll-triggered animated number counter
    FarmSignCard.tsx           # wooden sign claymorphism card

  services/
    ServicesSection.tsx        # section wrapper + grid layout
    BerryBushCard.tsx          # service tier crate card
    RarityBadge.tsx            # Organic / Fresh Picked / Carbon Neutral badge

  game/
    XPBar.tsx                  # scroll-driven XP progress bar
    AchievementBadge.tsx       # scroll-unlocked achievement badge
    CoinAnimation.tsx          # floating coin burst on crop click

  contact/
    ContactSection.tsx         # barn-themed section wrapper
    BarnForm.tsx               # styled form with validation
    AnimatedMailbox.tsx        # SVG mailbox with raising flag

  ui/
    Button.tsx                 # game-style claymorphism button
    SectionWrapper.tsx         # scroll-triggered entrance wrapper
    DayNightToggle.tsx         # toggle button for day/night mode
    LoadingScreen.tsx          # 2s farm-game boot sequence

lib/
  animations.ts                # shared Framer Motion variants + GSAP helpers
  constants.ts                 # brand tokens, crop data, service tiers, copy

context/
  DayNightContext.tsx          # React context for day/night state

tailwind.config.ts             # extended theme: colors, fonts, keyframes
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`

- [ ] **Step 1: Scaffold Next.js app**

Run from `/Users/tahmeed/Documents/GitHub/Sustainaberry`:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*" --yes
```
Expected: Next.js project created with app router, TypeScript, Tailwind.

- [ ] **Step 2: Install animation and 3D dependencies**
```bash
npm install framer-motion gsap @gsap/react three @react-three/fiber @react-three/drei
npm install --save-dev @types/three
```
Expected: All packages install without errors.

- [ ] **Step 3: Verify dev server starts**
```bash
npm run dev &
sleep 5 && curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```
Expected: `200`

- [ ] **Step 4: Kill dev server and commit**
```bash
kill $(lsof -t -i:3000) 2>/dev/null; git add -A && git commit -m "feat: scaffold Next.js app with animation dependencies"
git push origin main
```

---

## Task 2: Design System Foundation

**Files:**
- Modify: `tailwind.config.ts`
- Create: `app/globals.css`, `lib/constants.ts`, `lib/animations.ts`

- [ ] **Step 1: Configure Tailwind with brand tokens**

Replace `tailwind.config.ts`:
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './context/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        plum: { DEFAULT: '#4A1942', light: '#6B2860', dark: '#2E0F28' },
        'berry-pink': { DEFAULT: '#E91E8C', light: '#F060A8', dark: '#C01070' },
        'green-bright': { DEFAULT: '#22C55E', light: '#4ADE80', dark: '#16A34A' },
        'sky-blue': { DEFAULT: '#38BDF8', light: '#7DD3FC', dark: '#0EA5E9' },
        cream: { DEFAULT: '#FFF8F0', dark: '#F5EDDF' },
        'earth-brown': { DEFAULT: '#8B5E3C', light: '#A67C52', dark: '#6B4423' },
        night: { DEFAULT: '#1A0D2E', sky: '#0F0A1E' },
      },
      fontFamily: {
        heading: ['var(--font-fredoka)', 'sans-serif'],
        body: ['var(--font-nunito)', 'sans-serif'],
      },
      borderRadius: { clay: '20px', 'clay-sm': '12px', 'clay-lg': '28px' },
      boxShadow: {
        clay: 'inset -2px -2px 8px rgba(0,0,0,0.10), 4px 6px 12px rgba(0,0,0,0.18)',
        'clay-hover': 'inset -2px -2px 8px rgba(0,0,0,0.10), 6px 10px 20px rgba(0,0,0,0.22)',
        glow: '0 0 20px rgba(233,30,140,0.5), 0 0 40px rgba(233,30,140,0.2)',
        'glow-green': '0 0 20px rgba(34,197,94,0.5), 0 0 40px rgba(34,197,94,0.2)',
      },
      keyframes: {
        sway: { '0%,100%': { transform: 'rotate(-1.5deg)' }, '50%': { transform: 'rotate(1.5deg)' } },
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        'leaf-drift': {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-120px) rotate(360deg)', opacity: '0' },
        },
        'coin-float': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-80px) scale(0.5)', opacity: '0' },
        },
        sparkle: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1) rotate(180deg)', opacity: '1' },
          '100%': { transform: 'scale(0) rotate(360deg)', opacity: '0' },
        },
        'flag-raise': { '0%': { transform: 'translateY(8px)' }, '100%': { transform: 'translateY(0px)' } },
        'grow-crop': {
          '0%': { transform: 'scaleY(0)', 'transform-origin': 'bottom' },
          '100%': { transform: 'scaleY(1)', 'transform-origin': 'bottom' },
        },
        'xp-fill': { '0%': { width: '0%' }, '100%': { width: 'var(--xp-width)' } },
        'boot-progress': { '0%': { width: '0%' }, '100%': { width: '100%' } },
      },
      animation: {
        sway: 'sway 3s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        'coin-float': 'coin-float 1s ease-out forwards',
        sparkle: 'sparkle 0.6s ease-out forwards',
        'flag-raise': 'flag-raise 0.4s ease-out forwards',
        'grow-crop': 'grow-crop 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'boot-progress': 'boot-progress 1.8s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Write global CSS**

Replace `app/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@300;400;500;600;700&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-fredoka: 'Fredoka', sans-serif;
  --font-nunito: 'Nunito', sans-serif;
  --sky-top: #87CEEB;
  --sky-bottom: #B0E2FF;
  --ground: #5D8A3C;
}

[data-theme="night"] {
  --sky-top: #0F0A1E;
  --sky-bottom: #1A0D2E;
  --ground: #2D4A1F;
}

html { scroll-behavior: smooth; }
body { font-family: var(--font-nunito); background-color: #FFF8F0; overflow-x: hidden; }
h1, h2, h3, h4 { font-family: var(--font-fredoka); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

.clay-card {
  border-radius: 20px;
  border: 3px solid;
  box-shadow: inset -2px -2px 8px rgba(0,0,0,0.10), 4px 6px 12px rgba(0,0,0,0.18);
}

.isometric-container {
  transform: rotateX(30deg) rotateZ(-45deg);
  transform-style: preserve-3d;
}
```

- [ ] **Step 3: Write constants**

Create `lib/constants.ts`:
```typescript
export const BRAND = {
  name: 'Sustainaberry',
  tagline: 'Fruits for Free?!? Every Year!?',
  heroHeadline: 'Grow the Future Sustainably',
  heroSubhead: 'Plant once. Harvest every year. One blueberry bush gives 20lbs of fruit — over $200 in annual savings.',
  heroCta: 'Explore the Farm',
  heroCtaSecondary: 'Join the Movement',
  phone: '+1 (604) 785-6929',
  email: 'Sustainaberry@gmail.com',
  social: '@Sustainaberry',
}

export const STATS = [
  { value: 20, suffix: 'lbs', label: 'Fruit per bush yearly', color: 'green-bright' },
  { value: 200, prefix: '$', suffix: '+', label: 'Annual food savings', color: 'berry-pink' },
  { value: 100, suffix: '%', label: 'Organic & natural', color: 'sky-blue' },
]

export const ABOUT_CARDS = [
  {
    title: 'Food Financial Relief',
    body: 'With just one mature blueberry bush you will get over 20lbs of fruit. At $8 a pound, that\'s over $200 in savings every year.',
    icon: '🌱',
    color: 'bg-green-bright/20 border-green-bright',
  },
  {
    title: 'Sustainable Living',
    body: 'Become self-reliant by protecting yourself from recession-driven food insecurity. Your land, your food, your freedom.',
    icon: '🏡',
    color: 'bg-sky-blue/20 border-sky-blue',
  },
  {
    title: 'Eco Impact',
    body: 'A collective push to transition to sustainable living models will reduce emissions and promote the local economy.',
    icon: '🌍',
    color: 'bg-berry-pink/20 border-berry-pink',
  },
]

export const CROPS = [
  { id: 'blueberry', name: 'Blueberries', emoji: '🫐', savings: '$200+/yr', color: '#4169E1', bgColor: '#DBEAFE', description: 'High-yield perennial. 20lbs per mature bush.' },
  { id: 'raspberry', name: 'Raspberries', emoji: '🍇', savings: '$150+/yr', color: '#E91E8C', bgColor: '#FCE7F3', description: 'Fast-growing canes. Harvest in year 2.' },
  { id: 'strawberry', name: 'Strawberries', emoji: '🍓', savings: '$100+/yr', color: '#EF4444', bgColor: '#FEE2E2', description: 'Ground cover variety. Spreads naturally.' },
  { id: 'blackberry', name: 'Blackberries', emoji: '🍇', savings: '$180+/yr', color: '#6B21A8', bgColor: '#F3E8FF', description: 'Thornless variety. Thrives in any soil.' },
  { id: 'corn', name: 'Sweet Corn', emoji: '🌽', savings: '$80+/yr', color: '#EAB308', bgColor: '#FEF9C3', description: 'Summer staple. Companion plant for berries.' },
  { id: 'watermelon', name: 'Watermelon', emoji: '🍉', savings: '$60+/yr', color: '#22C55E', bgColor: '#DCFCE7', description: 'Sprawling vines. Great for large plots.' },
]

export const SERVICE_TIERS = [
  {
    id: 'starter',
    name: 'Starter Patch',
    description: 'Perfect for a small backyard. Get started with one premium blueberry bush, soil prep guide, and planting consultation.',
    berries: ['Blueberries'],
    badges: ['Organic', 'Fresh Picked'],
    color: 'bg-blue-100 border-sky-blue',
    accent: '#38BDF8',
    highlight: false,
  },
  {
    id: 'bundle',
    name: 'Berry Bundle',
    description: 'Mixed berry selection — blueberries, raspberries, and strawberries. Includes seasonal planting calendar.',
    berries: ['Blueberries', 'Raspberries', 'Strawberries'],
    badges: ['Organic', 'Fresh Picked', 'Carbon Neutral'],
    color: 'bg-pink-100 border-berry-pink',
    accent: '#E91E8C',
    highlight: true,
  },
  {
    id: 'orchard',
    name: 'Full Orchard',
    description: 'Complete berry garden setup. All 4 berry varieties, full soil analysis, landscape plan, and 2 follow-up visits.',
    berries: ['Blueberries', 'Raspberries', 'Strawberries', 'Blackberries'],
    badges: ['Organic', 'Fresh Picked', 'Carbon Neutral'],
    color: 'bg-purple-100 border-plum',
    accent: '#4A1942',
    highlight: false,
  },
  {
    id: 'community',
    name: 'Community Garden',
    description: 'Group or neighborhood plan. Shared berry plots designed for 5–20 households. Maximum eco and community impact.',
    berries: ['All varieties'],
    badges: ['Carbon Neutral', 'Organic'],
    color: 'bg-green-100 border-green-bright',
    accent: '#22C55E',
    highlight: false,
  },
]

export const ACHIEVEMENTS = [
  { id: 'first-harvest', label: 'First Harvest', description: 'You discovered the farm!', emoji: '🌱' },
  { id: 'eco-warrior', label: 'Eco Warrior', description: 'You explored sustainable living', emoji: '🌍' },
  { id: 'berry-master', label: 'Berry Master', description: 'You found all crop types!', emoji: '🫐' },
]
```

- [ ] **Step 4: Write animation utilities**

Create `lib/animations.ts`:
```typescript
import { Variants } from 'framer-motion'

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.4, delay: i * 0.08 },
  }),
}

export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, type: 'spring', stiffness: 200, damping: 15 },
  }),
}

export const cardHoverVariants: Variants = {
  rest: { y: 0, boxShadow: 'inset -2px -2px 8px rgba(0,0,0,0.10), 4px 6px 12px rgba(0,0,0,0.18)' },
  hover: {
    y: -8,
    boxShadow: 'inset -2px -2px 8px rgba(0,0,0,0.10), 6px 10px 20px rgba(0,0,0,0.22)',
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
  hover: { scale: 1.15, rotate: [-1, 1, -1], transition: { rotate: { repeat: Infinity, duration: 0.4 } } },
}

export const containerStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
```

- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: add design system — tailwind tokens, constants, animation utils, global CSS"
git push origin main
```

---

## Task 3: App Layout + Context + Loading Screen

**Files:**
- Modify: `app/layout.tsx`
- Create: `context/DayNightContext.tsx`, `components/ui/LoadingScreen.tsx`

- [ ] **Step 1: Create DayNight context**

Create `context/DayNightContext.tsx`:
```typescript
'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type DayNightContextType = { isNight: boolean; toggle: () => void }
const DayNightContext = createContext<DayNightContextType>({ isNight: false, toggle: () => {} })

export function DayNightProvider({ children }: { children: ReactNode }) {
  const [isNight, setIsNight] = useState(false)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isNight ? 'night' : 'day')
  }, [isNight])
  return (
    <DayNightContext.Provider value={{ isNight, toggle: () => setIsNight(n => !n) }}>
      {children}
    </DayNightContext.Provider>
  )
}

export const useDayNight = () => useContext(DayNightContext)
```

- [ ] **Step 2: Create LoadingScreen**

Create `components/ui/LoadingScreen.tsx`:
```typescript
'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(() => setVisible(false), 300); return 100 }
        return p + 2
      })
    }, 36)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-plum"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="text-8xl mb-6"
          >
            🫐
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-heading text-4xl text-cream mb-2"
          >
            Sustainaberry
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-body text-cream/70 mb-8"
          >
            Loading your farm...
          </motion.p>
          <div className="w-64 h-4 bg-plum-light rounded-full overflow-hidden border-2 border-berry-pink/40">
            <motion.div
              className="h-full bg-gradient-to-r from-berry-pink to-green-bright rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
          <p className="font-body text-cream/50 text-sm mt-2">{progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 3: Update app/layout.tsx**

Replace `app/layout.tsx`:
```typescript
import type { Metadata } from 'next'
import { Fredoka, Nunito } from 'next/font/google'
import './globals.css'
import { DayNightProvider } from '@/context/DayNightContext'
import LoadingScreen from '@/components/ui/LoadingScreen'

const fredoka = Fredoka({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-fredoka', display: 'swap' })
const nunito = Nunito({ subsets: ['latin'], weight: ['300','400','500','600','700'], variable: '--font-nunito', display: 'swap' })

export const metadata: Metadata = {
  title: 'Sustainaberry — Grow the Future Sustainably',
  description: 'Plant berry bushes on your land and get fruits for free every year. Food independence, eco impact, and $200+ in annual savings.',
  keywords: 'sustainable farming, berry bushes, food independence, eco living, blueberries',
  openGraph: {
    title: 'Sustainaberry — Fruits for Free?!? Every Year!?',
    description: 'Join the sustainable living movement. Plant once, harvest forever.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <body>
        <DayNightProvider>
          <LoadingScreen />
          {children}
        </DayNightProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Commit**
```bash
git add -A && git commit -m "feat: add layout, DayNight context, loading screen"
git push origin main
```

---

## Task 4: Shared UI Primitives

**Files:**
- Create: `components/ui/Button.tsx`, `components/ui/SectionWrapper.tsx`, `components/ui/DayNightToggle.tsx`, `components/ui/Navbar.tsx`

- [ ] **Step 1: Create Button component**

Create `components/ui/Button.tsx`:
```typescript
'use client'
import { motion, HTMLMotionProps } from 'framer-motion'
import { buttonPressVariants } from '@/lib/animations'
import { ReactNode } from 'react'

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const variantStyles = {
  primary: 'bg-berry-pink text-white border-4 border-plum shadow-clay hover:shadow-clay-hover',
  secondary: 'bg-cream text-plum border-4 border-plum shadow-clay hover:shadow-clay-hover',
  ghost: 'bg-transparent text-cream border-2 border-cream/50 hover:border-cream',
}

const sizeStyles = {
  sm: 'px-4 py-2 text-sm rounded-clay-sm',
  md: 'px-6 py-3 text-base rounded-clay',
  lg: 'px-8 py-4 text-lg rounded-clay-lg',
}

export default function Button({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) {
  return (
    <motion.button
      variants={buttonPressVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={`font-heading font-semibold cursor-pointer transition-colors duration-200 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
```

- [ ] **Step 2: Create SectionWrapper**

Create `components/ui/SectionWrapper.tsx`:
```typescript
'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { containerStagger, fadeUpVariants } from '@/lib/animations'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function SectionWrapper({ children, className = '', id }: SectionWrapperProps) {
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
    >
      {children}
    </motion.section>
  )
}

export { fadeUpVariants }
```

- [ ] **Step 3: Create DayNightToggle**

Create `components/ui/DayNightToggle.tsx`:
```typescript
'use client'
import { motion } from 'framer-motion'
import { useDayNight } from '@/context/DayNightContext'

export default function DayNightToggle() {
  const { isNight, toggle } = useDayNight()
  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      className="w-14 h-7 rounded-full border-2 border-plum relative cursor-pointer overflow-hidden"
      style={{ backgroundColor: isNight ? '#1A0D2E' : '#87CEEB' }}
      aria-label={isNight ? 'Switch to day mode' : 'Switch to night mode'}
    >
      <motion.div
        className="absolute top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-sm"
        animate={{ x: isNight ? 28 : 2, backgroundColor: isNight ? '#F5F0B8' : '#FDB537' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {isNight ? '🌙' : '☀️'}
      </motion.div>
    </motion.button>
  )
}
```

- [ ] **Step 4: Create Navbar**

Create `components/ui/Navbar.tsx`:
```typescript
'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import DayNightToggle from './DayNightToggle'
import Button from './Button'

const NAV_LINKS = [
  { label: 'Farm', href: '#farm' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const { scrollY } = useScroll()
  const bg = useTransform(scrollY, [0, 80], ['rgba(74,25,66,0)', 'rgba(74,25,66,0.95)'])
  const blur = useTransform(scrollY, [0, 80], [0, 12])

  return (
    <motion.nav
      style={{ backgroundColor: bg, backdropFilter: blur.get() > 0 ? `blur(${blur}px)` : 'none' }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
    >
      <motion.a
        href="#"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="font-heading text-2xl font-bold text-cream flex items-center gap-2"
      >
        <span className="text-3xl">🫐</span> Sustainaberry
      </motion.a>
      <div className="hidden md:flex items-center gap-6">
        {NAV_LINKS.map(link => (
          <a key={link.href} href={link.href} className="font-body text-cream/80 hover:text-cream transition-colors duration-200 text-sm font-medium">
            {link.label}
          </a>
        ))}
        <DayNightToggle />
        <Button variant="primary" size="sm" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
          Join Now
        </Button>
      </div>
    </motion.nav>
  )
}
```

- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: add shared UI primitives — Button, SectionWrapper, Navbar, DayNightToggle"
git push origin main
```

---

## Task 5: Hero Section

**Files:**
- Create: `components/hero/HeroSection.tsx`, `components/hero/HeroContent.tsx`, `components/hero/CloudLayer.tsx`, `components/hero/TractorAnimation.tsx`, `components/hero/BirdAnimation.tsx`, `components/hero/ParticleSystem.tsx`, `components/hero/ThreeBerries.tsx`

- [ ] **Step 1: Create CloudLayer**

Create `components/hero/CloudLayer.tsx`:
```typescript
'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const CLOUDS = [
  { top: '8%', size: 120, duration: 35, delay: 0 },
  { top: '15%', size: 80, duration: 50, delay: -15 },
  { top: '6%', size: 150, duration: 42, delay: -25 },
  { top: '20%', size: 60, duration: 38, delay: -8 },
]

function CloudSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 120 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="50" rx="55" ry="20" fill="white" fillOpacity="0.9"/>
      <ellipse cx="40" cy="40" rx="28" ry="22" fill="white" fillOpacity="0.9"/>
      <ellipse cx="75" cy="38" rx="24" ry="20" fill="white" fillOpacity="0.9"/>
      <ellipse cx="55" cy="32" rx="22" ry="18" fill="white" fillOpacity="0.95"/>
    </svg>
  )
}

export default function CloudLayer() {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      refs.current.forEach((el, i) => {
        if (!el) return
        const cloud = CLOUDS[i]
        gsap.set(el, { x: -cloud.size - 20 })
        gsap.to(el, {
          x: window.innerWidth + cloud.size + 20,
          duration: cloud.duration,
          delay: cloud.delay,
          repeat: -1,
          ease: 'none',
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {CLOUDS.map((cloud, i) => (
        <div key={i} ref={el => { refs.current[i] = el }} className="absolute" style={{ top: cloud.top }}>
          <CloudSVG size={cloud.size} />
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Create TractorAnimation**

Create `components/hero/TractorAnimation.tsx`:
```typescript
'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function TractorSVG() {
  return (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <rect x="30" y="25" width="60" height="30" rx="6" fill="#DC2626"/>
      {/* Cab */}
      <rect x="55" y="12" width="32" height="24" rx="4" fill="#B91C1C"/>
      <rect x="58" y="15" width="12" height="10" rx="2" fill="#BAE6FD" fillOpacity="0.8"/>
      {/* Hood */}
      <rect x="22" y="30" width="20" height="16" rx="3" fill="#991B1B"/>
      {/* Exhaust */}
      <rect x="25" y="18" width="5" height="14" rx="2" fill="#4B5563"/>
      <circle cx="27" cy="16" r="4" fill="#6B7280" fillOpacity="0.5"/>
      {/* Back wheel */}
      <circle cx="45" cy="58" r="18" fill="#1F2937"/>
      <circle cx="45" cy="58" r="12" fill="#374151"/>
      <circle cx="45" cy="58" r="4" fill="#9CA3AF"/>
      {/* Front wheel */}
      <circle cx="88" cy="60" r="12" fill="#1F2937"/>
      <circle cx="88" cy="60" r="7" fill="#374151"/>
      <circle cx="88" cy="60" r="3" fill="#9CA3AF"/>
      {/* Bumper */}
      <rect x="86" y="38" width="8" height="6" rx="2" fill="#6B7280"/>
    </svg>
  )
}

export default function TractorAnimation() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!ref.current) return
      gsap.set(ref.current, { x: -140 })
      gsap.to(ref.current, {
        x: window.innerWidth + 140,
        duration: 14,
        delay: 3,
        repeat: -1,
        repeatDelay: 18,
        ease: 'none',
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="absolute bottom-[18%] z-20 pointer-events-none">
      <TractorSVG />
    </div>
  )
}
```

- [ ] **Step 3: Create BirdAnimation**

Create `components/hero/BirdAnimation.tsx`:
```typescript
'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function BirdSVG({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 24 12" fill="none">
      <path d="M12 4 Q8 0 2 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M12 4 Q16 0 22 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

const BIRDS = [
  { top: '12%', size: 20, duration: 18, delay: 2, yWave: 15 },
  { top: '18%', size: 16, duration: 22, delay: 8, yWave: 10 },
  { top: '10%', size: 24, duration: 25, delay: 14, yWave: 20 },
]

export default function BirdAnimation() {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      refs.current.forEach((el, i) => {
        if (!el) return
        const bird = BIRDS[i]
        gsap.set(el, { x: -40 })
        gsap.to(el, {
          x: window.innerWidth + 40,
          duration: bird.duration,
          delay: bird.delay,
          repeat: -1,
          repeatDelay: 12,
          ease: 'none',
        })
        gsap.to(el, {
          y: `+=${bird.yWave}`,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
        // Wing flap
        const wings = el.querySelectorAll('path')
        wings.forEach((wing, wi) => {
          gsap.to(wing, {
            scaleY: wi === 0 ? 0.3 : 1.5,
            duration: 0.25,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            transformOrigin: 'center',
          })
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {BIRDS.map((bird, i) => (
        <div key={i} ref={el => { refs.current[i] = el }} className="absolute" style={{ top: bird.top }}>
          <BirdSVG size={bird.size} />
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Create ParticleSystem**

Create `components/hero/ParticleSystem.tsx`:
```typescript
'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number; vx: number; vy: number
  size: number; rotation: number; rotSpeed: number
  opacity: number; color: string; life: number; maxLife: number
}

const COLORS = ['#22C55E', '#4ADE80', '#E91E8C', '#38BDF8', '#FFF8F0']

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width, y: height + 10,
    vx: (Math.random() - 0.5) * 0.8, vy: -(Math.random() * 1.5 + 0.5),
    size: Math.random() * 6 + 3, rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 3, opacity: 1,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    life: 0, maxLife: Math.random() * 120 + 80,
  }
}

export default function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const reduceMotion = useRef(false)

  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion.current) return

    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (particles.current.length < 25 && Math.random() < 0.08) {
        particles.current.push(createParticle(canvas.width, canvas.height))
      }
      particles.current = particles.current.filter(p => p.life < p.maxLife)
      particles.current.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.rotation += p.rotSpeed; p.life++
        p.opacity = 1 - p.life / p.maxLife
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        // Leaf shape
        ctx.beginPath()
        ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />
}
```

- [ ] **Step 5: Create ThreeBerries**

Create `components/hero/ThreeBerries.tsx`:
```typescript
'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

function Berry({ position, color, speed }: { position: [number,number,number]; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed + position[0]) * 0.3
    ref.current.rotation.y += 0.01
  })
  return (
    <Sphere ref={ref} position={position} args={[0.3, 16, 16]}>
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
    </Sphere>
  )
}

const BERRIES = [
  { position: [-3, 1, -2] as [number,number,number], color: '#4169E1', speed: 0.8 },
  { position: [3, -1, -3] as [number,number,number], color: '#E91E8C', speed: 1.1 },
  { position: [-1, 2, -4] as [number,number,number], color: '#22C55E', speed: 0.6 },
  { position: [2, 0, -2] as [number,number,number], color: '#6B21A8', speed: 0.9 },
  { position: [0, -2, -3] as [number,number,number], color: '#EF4444', speed: 1.3 },
]

export default function ThreeBerries() {
  return (
    <div className="absolute inset-0 pointer-events-none z-5" style={{ opacity: 0.6 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        {BERRIES.map((b, i) => <Berry key={i} {...b} />)}
      </Canvas>
    </div>
  )
}
```

- [ ] **Step 6: Create HeroContent**

Create `components/hero/HeroContent.tsx`:
```typescript
'use client'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { BRAND } from '@/lib/constants'
import { fadeUpVariants } from '@/lib/animations'

export default function HeroContent() {
  return (
    <div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-6 pt-20">
      <motion.div
        variants={fadeUpVariants}
        custom={0}
        initial="hidden"
        animate="visible"
        className="inline-flex items-center gap-2 bg-berry-pink/20 border-2 border-berry-pink/50 rounded-full px-4 py-1.5 mb-6"
      >
        <span className="text-lg">🫐</span>
        <span className="font-body text-sm text-cream font-medium">Sustainaberry Farm</span>
      </motion.div>
      <motion.h1
        variants={fadeUpVariants}
        custom={1}
        initial="hidden"
        animate="visible"
        className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-cream mb-4 leading-tight"
      >
        {BRAND.heroHeadline}
      </motion.h1>
      <motion.p
        variants={fadeUpVariants}
        custom={2}
        initial="hidden"
        animate="visible"
        className="font-body text-lg md:text-xl text-cream/80 max-w-2xl mb-8 leading-relaxed"
      >
        {BRAND.heroSubhead}
      </motion.p>
      <motion.div
        variants={fadeUpVariants}
        custom={3}
        initial="hidden"
        animate="visible"
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button
          variant="primary"
          size="lg"
          onClick={() => document.getElementById('farm')?.scrollIntoView({ behavior: 'smooth' })}
        >
          🌱 {BRAND.heroCta}
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          ✨ {BRAND.heroCtaSecondary}
        </Button>
      </motion.div>
      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 flex flex-col items-center text-cream/50"
      >
        <span className="font-body text-xs mb-1">Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 7: Create HeroSection**

Create `components/hero/HeroSection.tsx`:
```typescript
'use client'
import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useDayNight } from '@/context/DayNightContext'
import CloudLayer from './CloudLayer'
import TractorAnimation from './TractorAnimation'
import BirdAnimation from './BirdAnimation'
import ParticleSystem from './ParticleSystem'
import ThreeBerries from './ThreeBerries'
import HeroContent from './HeroContent'

export default function HeroSection() {
  const { isNight } = useDayNight()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const skyY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const cloudsY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const hillsY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      {/* Sky layer */}
      <motion.div
        style={{ y: skyY }}
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          y: skyY,
          background: isNight
            ? 'linear-gradient(180deg, #0F0A1E 0%, #1A0D2E 60%, #2D1F0A 100%)'
            : 'linear-gradient(180deg, #87CEEB 0%, #B0E2FF 60%, #C8F09A 100%)',
        }}
      />

      {/* Stars (night only) */}
      {isNight && (
        <div className="absolute inset-0 z-5">
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 60}%` }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>
      )}

      {/* Three.js berries */}
      <ThreeBerries />

      {/* Clouds */}
      <motion.div style={{ y: cloudsY }} className="absolute inset-0">
        <CloudLayer />
      </motion.div>

      {/* Birds */}
      <BirdAnimation />

      {/* Particles */}
      <ParticleSystem />

      {/* Hills / ground */}
      <motion.div style={{ y: hillsY }} className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 200V80 Q200 20 400 80 Q600 140 800 60 Q1000 -20 1200 80 Q1320 120 1440 60V200Z"
            fill={isNight ? '#2D4A1F' : '#5D8A3C'} />
          <path d="M0 200V120 Q180 80 360 120 Q540 160 720 100 Q900 40 1080 120 Q1260 160 1440 100V200Z"
            fill={isNight ? '#1F3315' : '#4A7A2E'} />
        </svg>
      </motion.div>

      {/* Tractor */}
      <TractorAnimation />

      {/* Berry plants on ground */}
      <div className="absolute bottom-[10%] w-full z-25 flex justify-around px-8 pointer-events-none">
        {['🍓','🫐','🍇','🍓','🫐','🍇','🍓'].map((berry, i) => (
          <motion.span
            key={i}
            className="text-2xl md:text-3xl"
            animate={{ rotate: [-2, 2, -2], y: [0, -4, 0] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {berry}
          </motion.span>
        ))}
      </div>

      {/* Content */}
      <motion.div style={{ y: contentY, opacity }} className="absolute inset-0 z-30">
        <HeroContent />
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 8: Commit**
```bash
git add -A && git commit -m "feat: add hero section with GSAP clouds, tractor, birds, Three.js berries, particle system"
git push origin main
```

---

## Task 6: Interactive Farm Section

**Files:**
- Create: `components/farm/CropTooltip.tsx`, `components/farm/SparkleEffect.tsx`, `components/farm/CropPlot.tsx`, `components/farm/FarmerNPC.tsx`, `components/farm/MarketStand.tsx`, `components/farm/IsometricFarm.tsx`

- [ ] **Step 1: Create CropTooltip**

Create `components/farm/CropTooltip.tsx`:
```typescript
import { motion } from 'framer-motion'

interface CropTooltipProps { name: string; savings: string; description: string }

export default function CropTooltip({ name, savings, description }: CropTooltipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.9 }}
      transition={{ duration: 0.15 }}
      className="absolute -top-24 left-1/2 -translate-x-1/2 z-50 w-44 clay-card bg-cream border-plum p-3 pointer-events-none"
    >
      <p className="font-heading text-plum text-sm font-semibold">{name}</p>
      <p className="font-body text-green-bright font-bold text-sm">💰 {savings}</p>
      <p className="font-body text-earth-brown text-xs mt-1 leading-tight">{description}</p>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-cream border-r-2 border-b-2 border-plum rotate-45" />
    </motion.div>
  )
}
```

- [ ] **Step 2: Create SparkleEffect**

Create `components/farm/SparkleEffect.tsx`:
```typescript
'use client'
import { motion } from 'framer-motion'

const SPARKLE_POSITIONS = [
  { x: -20, y: -30 }, { x: 20, y: -35 }, { x: -30, y: -10 },
  { x: 30, y: -15 }, { x: 0, y: -40 }, { x: -15, y: -45 },
]

export default function SparkleEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {SPARKLE_POSITIONS.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-400 font-bold"
          style={{ left: '50%', top: '50%', fontSize: '14px' }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
          animate={{ opacity: 0, x: pos.x, y: pos.y, scale: 1, rotate: 180 }}
          transition={{ duration: 0.5, delay: i * 0.04, ease: 'easeOut' }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Create CropPlot**

Create `components/farm/CropPlot.tsx`:
```typescript
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CropTooltip from './CropTooltip'
import SparkleEffect from './SparkleEffect'
import CoinAnimation from '@/components/game/CoinAnimation'
import type { (typeof import('@/lib/constants'))['CROPS'][number] } from '@/lib/constants'

interface CropPlotProps {
  crop: { id: string; name: string; emoji: string; savings: string; color: string; bgColor: string; description: string }
  onCoinTrigger?: () => void
}

export default function CropPlot({ crop, onCoinTrigger }: CropPlotProps) {
  const [hovered, setHovered] = useState(false)
  const [showSparkle, setShowSparkle] = useState(false)
  const [showCoin, setShowCoin] = useState(false)
  const [coinKey, setCoinKey] = useState(0)

  const handleHoverStart = () => {
    setHovered(true)
    setShowSparkle(true)
    setTimeout(() => setShowSparkle(false), 600)
  }

  const handleClick = () => {
    setCoinKey(k => k + 1)
    setShowCoin(true)
    setTimeout(() => setShowCoin(false), 1200)
    onCoinTrigger?.()
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width: 96, height: 96 }}>
      <motion.div
        onHoverStart={handleHoverStart}
        onHoverEnd={() => setHovered(false)}
        onClick={handleClick}
        whileHover={{ scale: 1.15, rotate: [0, -2, 2, 0] }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="relative w-20 h-20 rounded-clay flex items-center justify-center cursor-pointer border-4"
        style={{ backgroundColor: crop.bgColor, borderColor: crop.color }}
      >
        <span className="text-4xl select-none">{crop.emoji}</span>
        {showSparkle && <SparkleEffect />}
      </motion.div>

      <AnimatePresence>
        {hovered && (
          <CropTooltip name={crop.name} savings={crop.savings} description={crop.description} />
        )}
      </AnimatePresence>

      {showCoin && <CoinAnimation key={coinKey} savings={crop.savings} />}
    </div>
  )
}
```

- [ ] **Step 4: Create FarmerNPC**

Create `components/farm/FarmerNPC.tsx`:
```typescript
'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

function FarmerSVG({ facing }: { facing: 'right' | 'left' }) {
  return (
    <svg width="40" height="60" viewBox="0 0 40 60" fill="none" style={{ transform: facing === 'left' ? 'scaleX(-1)' : 'none' }}>
      {/* Head */}
      <circle cx="20" cy="12" r="9" fill="#FBBF24"/>
      {/* Hat */}
      <ellipse cx="20" cy="5" rx="12" ry="3" fill="#8B5E3C"/>
      <rect x="12" y="2" width="16" height="5" rx="2" fill="#6B4423"/>
      {/* Body */}
      <rect x="12" y="22" width="16" height="18" rx="4" fill="#3B82F6"/>
      {/* Overalls strap */}
      <rect x="14" y="22" width="3" height="14" rx="1.5" fill="#1D4ED8"/>
      <rect x="23" y="22" width="3" height="14" rx="1.5" fill="#1D4ED8"/>
      {/* Arms */}
      <rect x="4" y="23" width="8" height="14" rx="4" fill="#FBBF24"/>
      <rect x="28" y="23" width="8" height="14" rx="4" fill="#FBBF24"/>
      {/* Legs */}
      <rect x="12" y="38" width="7" height="16" rx="3" fill="#1F2937"/>
      <rect x="21" y="38" width="7" height="16" rx="3" fill="#1F2937"/>
      {/* Boots */}
      <rect x="10" y="50" width="10" height="8" rx="3" fill="#4B3621"/>
      <rect x="20" y="50" width="10" height="8" rx="3" fill="#4B3621"/>
    </svg>
  )
}

export default function FarmerNPC() {
  const ref = useRef<HTMLDivElement>(null)
  const [facing, setFacing] = useState<'right' | 'left'>('right')

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!ref.current) return
      const tl = gsap.timeline({ repeat: -1 })
      tl.set(ref.current, { x: 80 })
        .to(ref.current, {
          x: 520, duration: 5, ease: 'none',
          onStart: () => setFacing('right'),
        })
        .to(ref.current, { x: 80, duration: 5, ease: 'none', onStart: () => setFacing('left') })
        .to(ref.current, { x: 80, duration: 1 }) // pause
    })
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="absolute bottom-0 z-30 pointer-events-none">
      <FarmerSVG facing={facing} />
    </div>
  )
}
```

- [ ] **Step 5: Create MarketStand**

Create `components/farm/MarketStand.tsx`:
```typescript
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function MarketStand() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(true)}
        className="cursor-pointer flex flex-col items-center gap-1"
      >
        <div className="w-24 h-20 rounded-clay clay-card bg-earth-brown/30 border-earth-brown flex flex-col items-center justify-center">
          <div className="w-full h-6 bg-red-600 rounded-t-clay flex items-center justify-center">
            <span className="font-heading text-white text-xs font-bold">BERRY MARKET</span>
          </div>
          <div className="flex gap-1 mt-2">
            <span className="text-lg">🫐</span><span className="text-lg">🍓</span><span className="text-lg">🍇</span>
          </div>
        </div>
        <span className="font-body text-xs text-earth-brown font-medium">Click to shop!</span>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="clay-card bg-cream border-plum max-w-md w-full p-8"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="font-heading text-3xl text-plum mb-2 text-center">🏪 Berry Market</h3>
              <p className="font-body text-earth-brown text-center mb-6">Ready to grow your own free fruit every year?</p>
              <Button
                className="w-full mb-3"
                onClick={() => { setOpen(false); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) }}
              >
                🌱 View Berry Packages
              </Button>
              <Button variant="secondary" className="w-full" onClick={() => setOpen(false)}>
                Maybe later
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 6: Create IsometricFarm**

Create `components/farm/IsometricFarm.tsx`:
```typescript
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
    <SectionWrapper id="farm" className="py-20 bg-gradient-to-b from-green-bright/20 to-cream overflow-hidden">
      <motion.div variants={fadeUpVariants} custom={0} className="text-center mb-12 px-6">
        <span className="font-heading text-4xl md:text-5xl text-plum font-bold">🌾 The Sustainaberry Farm</span>
        <p className="font-body text-earth-brown mt-3 text-lg">Hover over the crops to discover your savings. Click to harvest!</p>
      </motion.div>

      {/* Farm container */}
      <motion.div variants={fadeUpVariants} custom={1} className="relative max-w-3xl mx-auto px-6">
        {/* White picket fence */}
        <div className="relative bg-green-bright/30 rounded-clay-lg border-4 border-earth-brown p-8 overflow-hidden" style={{ minHeight: 420 }}>
          {/* Fence posts */}
          <div className="absolute top-0 left-0 right-0 flex justify-around">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-3 h-6 bg-white rounded-t-sm border border-gray-200" />
            ))}
          </div>
          <div className="absolute top-0 left-0 right-0 h-3 bg-white border-b-2 border-gray-200 flex" />

          {/* Crop grid — 3x2 */}
          <div className="grid grid-cols-3 gap-6 justify-items-center pt-4">
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

          {/* Farmer NPC */}
          <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
            <FarmerNPC />
          </div>

          {/* Soil patches */}
          <div className="absolute bottom-12 left-0 right-0 flex justify-around px-4 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-16 h-3 rounded-full bg-earth-brown/40" />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div variants={fadeUpVariants} custom={8} className="flex flex-wrap justify-center gap-3 mt-8 px-6">
        {CROPS.map(crop => (
          <div key={crop.id} className="flex items-center gap-2 bg-white rounded-full px-3 py-1.5 border-2"
            style={{ borderColor: crop.color }}>
            <span>{crop.emoji}</span>
            <span className="font-body text-sm font-medium" style={{ color: crop.color }}>{crop.name}</span>
            <span className="font-body text-xs text-green-bright font-bold">{crop.savings}</span>
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 7: Commit**
```bash
git add -A && git commit -m "feat: add interactive isometric farm with crop plots, sparkles, NPC farmer, market stand"
git push origin main
```

---

## Task 7: About Section

**Files:**
- Create: `components/about/StatCounter.tsx`, `components/about/FarmSignCard.tsx`, `components/about/AboutSection.tsx`
- Create: `components/game/CoinAnimation.tsx` (needed by CropPlot)

- [ ] **Step 1: Create CoinAnimation** (needed by CropPlot from Task 6)

Create `components/game/CoinAnimation.tsx`:
```typescript
'use client'
import { motion } from 'framer-motion'

export default function CoinAnimation({ savings }: { savings: string }) {
  return (
    <motion.div
      className="absolute -top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex items-center gap-1 bg-yellow-400 text-plum rounded-full px-2 py-0.5 font-heading font-bold text-sm whitespace-nowrap"
      initial={{ opacity: 1, y: 0, scale: 0.5 }}
      animate={{ opacity: 0, y: -60, scale: 1.1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      🪙 +{savings}
    </motion.div>
  )
}
```

- [ ] **Step 2: Create StatCounter**

Create `components/about/StatCounter.tsx`:
```typescript
'use client'
import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

interface StatCounterProps { value: number; prefix?: string; suffix?: string; label: string; color: string }

export default function StatCounter({ value, prefix = '', suffix = '', label, color }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(value)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  const colorMap: Record<string, string> = {
    'green-bright': 'text-green-bright', 'berry-pink': 'text-berry-pink', 'sky-blue': 'text-sky-blue',
  }

  return (
    <div ref={ref} className="text-center">
      <div className={`font-heading text-5xl md:text-6xl font-bold ${colorMap[color] ?? 'text-plum'}`}>
        {prefix}{count}{suffix}
      </div>
      <div className="font-body text-earth-brown mt-1 text-sm font-medium">{label}</div>
    </div>
  )
}
```

- [ ] **Step 3: Create FarmSignCard**

Create `components/about/FarmSignCard.tsx`:
```typescript
import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/lib/animations'

interface FarmSignCardProps { title: string; body: string; icon: string; color: string; index: number }

export default function FarmSignCard({ title, body, icon, color, index }: FarmSignCardProps) {
  return (
    <motion.div
      variants={fadeUpVariants}
      custom={index}
      whileHover={{ y: -8, rotate: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className={`clay-card p-6 ${color} relative`}
    >
      {/* Sign post */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3 h-6 bg-earth-brown rounded-sm" />
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-earth-brown rounded-sm" />
      <div className="text-4xl mb-3 text-center">{icon}</div>
      <h3 className="font-heading text-xl font-bold text-plum mb-2 text-center">{title}</h3>
      <p className="font-body text-earth-brown text-sm leading-relaxed text-center">{body}</p>
    </motion.div>
  )
}
```

- [ ] **Step 4: Create AboutSection**

Create `components/about/AboutSection.tsx`:
```typescript
'use client'
import SectionWrapper from '@/components/ui/SectionWrapper'
import StatCounter from './StatCounter'
import FarmSignCard from './FarmSignCard'
import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/lib/animations'
import { ABOUT_CARDS, STATS } from '@/lib/constants'

export default function AboutSection() {
  return (
    <SectionWrapper id="about" className="py-24 bg-cream px-6">
      {/* Mission statement */}
      <motion.div variants={fadeUpVariants} custom={0} className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-green-bright/20 border-2 border-green-bright rounded-full px-4 py-1.5 mb-6">
          <span>🌍</span>
          <span className="font-body text-sm text-plum font-medium">Our Mission</span>
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-plum mb-6 leading-tight">
          Maximizing Your Land.<br/>Maximizing Your Life.
        </h2>
        <p className="font-body text-earth-brown text-lg leading-relaxed">
          Environmental sustainability involves making responsible choices that ensure the long-term health of our planet.
          We help everyday people become food-independent — one berry bush at a time.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeUpVariants} custom={1} className="flex flex-wrap justify-center gap-12 mb-20">
        {STATS.map(stat => <StatCounter key={stat.label} {...stat} />)}
      </motion.div>

      {/* Farm sign cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-8">
        {ABOUT_CARDS.map((card, i) => (
          <FarmSignCard key={card.title} {...card} index={i + 2} />
        ))}
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: add about section with animated stat counters and farm sign cards"
git push origin main
```

---

## Task 8: Services Section

**Files:**
- Create: `components/services/RarityBadge.tsx`, `components/services/BerryBushCard.tsx`, `components/services/ServicesSection.tsx`

- [ ] **Step 1: Create RarityBadge**

Create `components/services/RarityBadge.tsx`:
```typescript
const BADGE_STYLES: Record<string, string> = {
  'Organic': 'bg-green-bright/20 text-green-bright border-green-bright',
  'Fresh Picked': 'bg-berry-pink/20 text-berry-pink border-berry-pink',
  'Carbon Neutral': 'bg-sky-blue/20 text-sky-blue border-sky-blue',
}

const BADGE_ICONS: Record<string, string> = {
  'Organic': '🌿', 'Fresh Picked': '🍓', 'Carbon Neutral': '♻️',
}

export default function RarityBadge({ label }: { label: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border-2 text-xs font-body font-semibold ${BADGE_STYLES[label] ?? 'bg-gray-100 text-gray-600 border-gray-300'}`}>
      {BADGE_ICONS[label] ?? '✓'} {label}
    </span>
  )
}
```

- [ ] **Step 2: Create BerryBushCard**

Create `components/services/BerryBushCard.tsx`:
```typescript
'use client'
import { motion } from 'framer-motion'
import { cardHoverVariants, fadeUpVariants } from '@/lib/animations'
import RarityBadge from './RarityBadge'
import Button from '@/components/ui/Button'

interface BerryBushCardProps {
  name: string; description: string; berries: string[]; badges: string[]
  color: string; accent: string; highlight: boolean; index: number
}

export default function BerryBushCard({ name, description, berries, badges, color, accent, highlight, index }: BerryBushCardProps) {
  return (
    <motion.div
      variants={fadeUpVariants}
      custom={index}
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <motion.div
        variants={cardHoverVariants}
        className={`clay-card p-6 h-full flex flex-col relative ${color} ${highlight ? 'ring-4 ring-berry-pink ring-offset-2' : ''}`}
        style={{ borderColor: accent }}
      >
        {highlight && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-berry-pink text-white text-xs font-heading font-bold px-3 py-1 rounded-full">
            ⭐ Most Popular
          </div>
        )}
        {/* Wooden crate visual */}
        <div className="w-full h-28 rounded-clay-sm mb-4 flex items-center justify-center relative overflow-hidden"
          style={{ backgroundColor: accent + '22', border: `2px solid ${accent}` }}>
          <div className="absolute inset-0 flex flex-col justify-around opacity-20 pointer-events-none">
            {[0,1,2].map(i => <div key={i} className="h-px w-full" style={{ backgroundColor: accent }} />)}
          </div>
          <div className="absolute top-0 bottom-0 left-1/3 w-px opacity-20" style={{ backgroundColor: accent }} />
          <div className="absolute top-0 bottom-0 left-2/3 w-px opacity-20" style={{ backgroundColor: accent }} />
          <div className="flex gap-2 text-4xl z-10">
            {berries.slice(0, 3).map((b, i) => <span key={i} className="animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
              {b === 'Blueberries' ? '🫐' : b === 'Raspberries' ? '🍇' : b === 'Strawberries' ? '🍓' : b === 'Blackberries' ? '🍇' : '🌱'}
            </span>)}
          </div>
        </div>
        <h3 className="font-heading text-xl font-bold text-plum mb-2">{name}</h3>
        <p className="font-body text-earth-brown text-sm leading-relaxed mb-4 flex-1">{description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {badges.map(badge => <RarityBadge key={badge} label={badge} />)}
        </div>
        <Button
          variant="primary"
          size="sm"
          className="w-full"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          🌱 Get Started
        </Button>
      </motion.div>
    </motion.div>
  )
}
```

- [ ] **Step 3: Create ServicesSection**

Create `components/services/ServicesSection.tsx`:
```typescript
'use client'
import SectionWrapper from '@/components/ui/SectionWrapper'
import BerryBushCard from './BerryBushCard'
import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/lib/animations'
import { SERVICE_TIERS } from '@/lib/constants'

export default function ServicesSection() {
  return (
    <SectionWrapper id="services" className="py-24 bg-gradient-to-b from-green-bright/10 to-cream px-6">
      <motion.div variants={fadeUpVariants} custom={0} className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-plum/10 border-2 border-plum rounded-full px-4 py-1.5 mb-6">
          <span>🛒</span>
          <span className="font-body text-sm text-plum font-medium">Berry Packages</span>
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-plum mb-4 leading-tight">
          Choose Your Berry Journey
        </h2>
        <p className="font-body text-earth-brown text-lg max-w-2xl mx-auto">
          Every package includes expert consultation, organic plants, and your path to food independence.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {SERVICE_TIERS.map((tier, i) => (
          <BerryBushCard key={tier.id} {...tier} index={i + 1} />
        ))}
      </div>

      <motion.p variants={fadeUpVariants} custom={6} className="text-center font-body text-earth-brown mt-8 text-sm">
        Contact us for pricing — every property is unique and we tailor each plan to your land.
      </motion.p>
    </SectionWrapper>
  )
}
```

- [ ] **Step 4: Commit**
```bash
git add -A && git commit -m "feat: add services section with berry bush cards, rarity badges, crate visuals"
git push origin main
```

---

## Task 9: Game Features

**Files:**
- Create: `components/game/XPBar.tsx`, `components/game/AchievementBadge.tsx`, `components/game/GameFeaturesSection.tsx`

- [ ] **Step 1: Create XPBar**

Create `components/game/XPBar.tsx`:
```typescript
'use client'
import { useScroll, useTransform, motion } from 'framer-motion'

export default function XPBar() {
  const { scrollYProgress } = useScroll()
  const xp = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-plum/90 backdrop-blur-sm rounded-full px-5 py-2.5 border-2 border-berry-pink/50 shadow-clay">
      <span className="font-heading text-cream text-sm font-semibold whitespace-nowrap">⚡ Farm Level</span>
      <div className="w-32 h-3 bg-plum-dark rounded-full overflow-hidden border border-berry-pink/30">
        <motion.div
          className="h-full bg-gradient-to-r from-green-bright to-berry-pink rounded-full"
          style={{ width: useTransform(xp, v => `${v}%`) }}
        />
      </div>
      <motion.span className="font-heading text-berry-pink text-xs font-bold">
        {useTransform(xp, v => `${Math.floor(v)}%`)}
      </motion.span>
    </div>
  )
}
```

- [ ] **Step 2: Create AchievementBadge**

Create `components/game/AchievementBadge.tsx`:
```typescript
'use client'
import { useRef } from 'react'
import { useInView, motion } from 'framer-motion'

interface AchievementBadgeProps { emoji: string; label: string; description: string; index: number }

export default function AchievementBadge({ emoji, label, description, index }: AchievementBadgeProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, rotate: -10 }}
      animate={inView ? { scale: 1, rotate: 0 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 15, delay: index * 0.15 }}
      className="flex flex-col items-center gap-2"
    >
      <motion.div
        className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 border-4 border-yellow-600 shadow-clay flex items-center justify-center text-3xl"
        animate={inView ? { boxShadow: ['0 0 0px rgba(234,179,8,0)', '0 0 20px rgba(234,179,8,0.6)', '0 0 0px rgba(234,179,8,0)'] } : {}}
        transition={{ repeat: 3, duration: 0.6, delay: index * 0.15 + 0.3 }}
      >
        {emoji}
      </motion.div>
      <div className="text-center">
        <div className="font-heading text-sm font-bold text-plum">{label}</div>
        <div className="font-body text-xs text-earth-brown">{description}</div>
      </div>
      {inView && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -30 }}
          transition={{ duration: 1.5, delay: index * 0.15 }}
          className="absolute -top-4 font-heading text-yellow-500 font-bold text-sm pointer-events-none"
        >
          🏆 Unlocked!
        </motion.div>
      )}
    </motion.div>
  )
}
```

- [ ] **Step 3: Create GameFeaturesSection**

Create `components/game/GameFeaturesSection.tsx`:
```typescript
'use client'
import SectionWrapper from '@/components/ui/SectionWrapper'
import AchievementBadge from './AchievementBadge'
import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/lib/animations'
import { ACHIEVEMENTS } from '@/lib/constants'
import Button from '@/components/ui/Button'

export default function GameFeaturesSection() {
  return (
    <SectionWrapper id="game" className="py-24 bg-plum px-6 overflow-hidden">
      {/* Floating decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['🫐','🍓','🌱','⭐','🌾','🍇'].map((emoji, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl opacity-20"
            style={{ left: `${(i + 1) * 15}%`, top: `${20 + i * 10}%` }}
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>

      <motion.div variants={fadeUpVariants} custom={0} className="text-center mb-14 relative z-10">
        <div className="inline-flex items-center gap-2 bg-berry-pink/20 border-2 border-berry-pink/50 rounded-full px-4 py-1.5 mb-6">
          <span>🎮</span>
          <span className="font-body text-sm text-cream/80 font-medium">Join the Movement</span>
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-cream mb-4">
          Level Up Your Land
        </h2>
        <p className="font-body text-cream/70 text-lg max-w-2xl mx-auto">
          Every step toward sustainable living is an achievement worth celebrating.
        </p>
      </motion.div>

      {/* Achievements */}
      <motion.div variants={fadeUpVariants} custom={1} className="flex flex-wrap justify-center gap-10 mb-16 relative z-10">
        {ACHIEVEMENTS.map((achievement, i) => (
          <div key={achievement.id} className="relative">
            <AchievementBadge {...achievement} index={i} />
          </div>
        ))}
      </motion.div>

      {/* Daily harvest CTA */}
      <motion.div variants={fadeUpVariants} custom={4} className="text-center relative z-10">
        <div className="clay-card bg-cream border-green-bright max-w-md mx-auto p-8">
          <div className="text-5xl mb-4">🌅</div>
          <h3 className="font-heading text-2xl text-plum font-bold mb-2">Daily Harvest</h3>
          <p className="font-body text-earth-brown text-sm mb-6">
            Imagine waking up every morning to fresh berries from your own backyard. That's the Sustainaberry life.
          </p>
          <Button
            size="lg"
            className="w-full"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            🫐 Start Growing Today
          </Button>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 4: Commit**
```bash
git add -A && git commit -m "feat: add game features section — XP bar, achievement badges, daily harvest CTA"
git push origin main
```

---

## Task 10: Contact Section

**Files:**
- Create: `components/contact/AnimatedMailbox.tsx`, `components/contact/BarnForm.tsx`, `components/contact/ContactSection.tsx`

- [ ] **Step 1: Create AnimatedMailbox**

Create `components/contact/AnimatedMailbox.tsx`:
```typescript
'use client'
import { motion } from 'framer-motion'

export default function AnimatedMailbox({ focused }: { focused: boolean }) {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative w-24 h-20">
        {/* Post */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-10 bg-earth-brown rounded-sm" />
        {/* Box */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-14 bg-red-700 rounded-clay-sm border-4 border-red-900 flex items-end justify-center pb-1 overflow-visible">
          {/* Slot */}
          <div className="w-10 h-1.5 bg-red-900 rounded-full mb-1" />
          {/* Flag */}
          <motion.div
            className="absolute -right-1 top-1"
            animate={{ rotate: focused ? -80 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            style={{ transformOrigin: 'bottom center' }}
          >
            <div className="w-1.5 h-8 bg-gray-600 rounded-sm" />
            <div className="absolute top-0 left-1.5 w-5 h-4 bg-red-500 rounded-sm" />
          </motion.div>
        </div>
      </div>
      <p className="font-body text-earth-brown text-sm mt-2">
        {focused ? '✉️ Ready to send!' : '📬 Drop us a message'}
      </p>
    </div>
  )
}
```

- [ ] **Step 2: Create BarnForm**

Create `components/contact/BarnForm.tsx`:
```typescript
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3 rounded-clay-sm border-3 font-body bg-cream/80 text-plum placeholder-earth-brown/50 focus:outline-none focus:ring-2 transition-all duration-200 ${
      errors[field] ? 'border-red-500 focus:ring-red-300' : 'border-earth-brown/40 focus:ring-berry-pink/40 focus:border-berry-pink'
    }`

  if (status === 'success') {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-12"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8 }}
          className="text-6xl mb-4"
        >
          🌱
        </motion.div>
        <h3 className="font-heading text-3xl text-plum font-bold mb-2">Message Received!</h3>
        <p className="font-body text-earth-brown">We'll be in touch soon to start your berry journey.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <AnimatedMailbox focused={focused} />

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="font-body text-sm font-semibold text-plum mb-1 block">Your Name *</label>
          <input
            id="name" type="text" placeholder="e.g. Jane Smith"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={inputClass('name')}
          />
          {errors.name && <p className="font-body text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="font-body text-sm font-semibold text-plum mb-1 block">Email Address *</label>
          <input
            id="email" type="email" placeholder="you@example.com"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={inputClass('email')}
          />
          {errors.email && <p className="font-body text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="font-body text-sm font-semibold text-plum mb-1 block">Phone <span className="text-earth-brown/60 font-normal">(optional)</span></label>
          <input
            id="phone" type="tel" placeholder="+1 (604) 555-0100"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full px-4 py-3 rounded-clay-sm border-3 border-earth-brown/40 font-body bg-cream/80 text-plum placeholder-earth-brown/50 focus:outline-none focus:ring-2 focus:ring-berry-pink/40 focus:border-berry-pink transition-all duration-200"
          />
        </div>

        <div>
          <label htmlFor="message" className="font-body text-sm font-semibold text-plum mb-1 block">Tell Us About Your Land *</label>
          <textarea
            id="message" rows={4} placeholder="What kind of land do you have? How big? Any specific berries you love?..."
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={inputClass('message') + ' resize-none'}
          />
          {errors.message && <p className="font-body text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? (
            <span className="flex items-center justify-center gap-2">
              <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>🌱</motion.span>
              Planting your message...
            </span>
          ) : (
            '🌿 Send Message'
          )}
        </Button>
      </div>
    </form>
  )
}
```

- [ ] **Step 3: Create ContactSection**

Create `components/contact/ContactSection.tsx`:
```typescript
'use client'
import SectionWrapper from '@/components/ui/SectionWrapper'
import BarnForm from './BarnForm'
import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/lib/animations'
import { BRAND } from '@/lib/constants'

export default function ContactSection() {
  return (
    <SectionWrapper id="contact" className="py-24 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #E8F5D0 100%)' } as React.CSSProperties}>
      {/* Barn roof decoration */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden pointer-events-none">
        <svg viewBox="0 0 1440 64" className="w-full" fill="none">
          <path d="M0 64 L720 0 L1440 64" fill="#8B5E3C" fillOpacity="0.15"/>
          <path d="M0 64 L720 8 L1440 64" fill="#8B5E3C" fillOpacity="0.1"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUpVariants} custom={0} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-earth-brown/20 border-2 border-earth-brown rounded-full px-4 py-1.5 mb-6">
            <span>🏚️</span>
            <span className="font-body text-sm text-earth-brown font-medium">Get In Touch</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-plum mb-4">
            Join Us in Taking Action!
          </h2>
          <p className="font-body text-earth-brown text-lg max-w-2xl mx-auto">
            Ready to grow free fruit every year? Let's talk about your land.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.div variants={fadeUpVariants} custom={1}
            className="clay-card bg-cream border-earth-brown p-8">
            <BarnForm />
          </motion.div>

          {/* Contact info */}
          <motion.div variants={fadeUpVariants} custom={2} className="space-y-6">
            <div className="clay-card bg-green-bright/20 border-green-bright p-6">
              <h3 className="font-heading text-2xl text-plum font-bold mb-6">Contact Us Directly</h3>
              {[
                { icon: '📞', label: 'Phone', value: BRAND.phone, href: `tel:${BRAND.phone.replace(/\D/g, '')}` },
                { icon: '✉️', label: 'Email', value: BRAND.email, href: `mailto:${BRAND.email}` },
                { icon: '📱', label: 'Social', value: BRAND.social, href: '#' },
              ].map(item => (
                <a key={item.label} href={item.href}
                  className="flex items-center gap-4 p-4 rounded-clay-sm bg-white/60 hover:bg-white transition-colors duration-200 mb-3 group cursor-pointer">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-body text-xs text-earth-brown">{item.label}</div>
                    <div className="font-body font-semibold text-plum group-hover:text-berry-pink transition-colors">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Tagline card */}
            <div className="clay-card bg-plum border-berry-pink p-6 text-center">
              <div className="text-4xl mb-3">🫐</div>
              <h3 className="font-heading text-2xl text-cream font-bold mb-2">{BRAND.tagline}</h3>
              <p className="font-body text-cream/70 text-sm">
                Environmental sustainability involves making responsible choices that ensure the long-term health of our planet.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 4: Commit**
```bash
git add -A && git commit -m "feat: add contact section with barn form, animated mailbox, contact details"
git push origin main
```

---

## Task 11: Page Assembly + Footer

**Files:**
- Modify: `app/page.tsx`
- Create: `components/ui/Footer.tsx`

- [ ] **Step 1: Create Footer**

Create `components/ui/Footer.tsx`:
```typescript
import { BRAND } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-plum py-12 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-3xl">🫐</span>
          <span className="font-heading text-2xl font-bold text-cream">Sustainaberry</span>
        </div>
        <p className="font-body text-cream/60 text-sm mb-6 max-w-lg mx-auto">
          {BRAND.tagline} — helping families grow food independence one berry bush at a time.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm font-body text-cream/60 mb-6">
          {[['📞', BRAND.phone], ['✉️', BRAND.email], ['📱', BRAND.social]].map(([icon, val]) => (
            <span key={val} className="flex items-center gap-1">{icon} {val}</span>
          ))}
        </div>
        <div className="border-t border-cream/10 pt-6">
          <p className="font-body text-cream/40 text-xs">© 2024 Sustainaberry. All rights reserved. Growing a sustainable future.</p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Assemble app/page.tsx**

Replace `app/page.tsx`:
```typescript
'use client'
import dynamic from 'next/dynamic'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import XPBar from '@/components/game/XPBar'

const HeroSection = dynamic(() => import('@/components/hero/HeroSection'), { ssr: false })
const IsometricFarm = dynamic(() => import('@/components/farm/IsometricFarm'))
const AboutSection = dynamic(() => import('@/components/about/AboutSection'))
const ServicesSection = dynamic(() => import('@/components/services/ServicesSection'))
const GameFeaturesSection = dynamic(() => import('@/components/game/GameFeaturesSection'))
const ContactSection = dynamic(() => import('@/components/contact/ContactSection'))

export default function Home() {
  return (
    <main>
      <Navbar />
      <XPBar />
      <HeroSection />
      <IsometricFarm />
      <AboutSection />
      <ServicesSection />
      <GameFeaturesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 3: Fix any TypeScript errors**
```bash
cd /Users/tahmeed/Documents/GitHub/Sustainaberry && npx tsc --noEmit 2>&1 | head -40
```
Fix any type errors found. Common fixes:
- In `CropPlot.tsx`, remove the broken type import and type the `crop` prop inline
- Ensure all `motion.div` style props are typed correctly

- [ ] **Step 4: Build check**
```bash
npm run build 2>&1 | tail -20
```
Expected: `✓ Compiled successfully` (or similar). If errors appear, fix them before proceeding.

- [ ] **Step 5: Commit**
```bash
git add -A && git commit -m "feat: assemble all sections into page.tsx — full site complete"
git push origin main
```

---

## Task 12: Responsive Polish + Final Push

**Files:**
- Modify: various components for mobile breakpoints

- [ ] **Step 1: Start dev server and verify**
```bash
npm run dev
```
Open http://localhost:3000 and verify:
- Loading screen appears and fades out
- Hero renders with tractor, clouds, and content
- Navbar is visible
- Farm section loads with all 6 crops
- About section shows stat counters animating on scroll
- Services shows 4 cards
- Game section shows achievements
- Contact form submits successfully

- [ ] **Step 2: Check mobile (375px)**
Using browser DevTools, set viewport to 375px. Verify:
- No horizontal scroll
- Nav items hidden (desktop-only links are `hidden md:flex` ✓)
- Hero text readable and not clipped
- Farm grid is 3-column and fits screen
- Cards stack to 1 column

If farm grid overflows on mobile, add `overflow-x-auto` to the farm container and `min-w-[280px]` to crop plots.

- [ ] **Step 3: Add mobile nav (hamburger)**

Add to `components/ui/Navbar.tsx` — mobile menu:
```typescript
// Add at top of component:
const [mobileOpen, setMobileOpen] = useState(false)

// Add inside the nav element, after the desktop links div:
<button
  className="md:hidden text-cream p-2"
  onClick={() => setMobileOpen(o => !o)}
  aria-label="Toggle menu"
>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {mobileOpen
      ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
      : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
    }
  </svg>
</button>

// Add after closing nav tag (inside the motion.nav):
<AnimatePresence>
  {mobileOpen && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="md:hidden bg-plum/95 backdrop-blur-sm px-6 py-4 flex flex-col gap-4"
    >
      {NAV_LINKS.map(link => (
        <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
          className="font-body text-cream text-base py-2 border-b border-cream/10">
          {link.label}
        </a>
      ))}
      <DayNightToggle />
    </motion.div>
  )}
</AnimatePresence>
```

- [ ] **Step 4: Final build + type check**
```bash
npm run build 2>&1 | tail -30
npx tsc --noEmit 2>&1 | head -20
```
Expected: clean build with no type errors.

- [ ] **Step 5: Final commit and push**
```bash
git add -A && git commit -m "feat: responsive polish, mobile nav — Sustainaberry website complete"
git push origin main
```

---

## Self-Review: Spec Coverage

| Spec Requirement | Task |
|---|---|
| Next.js App Router + TypeScript + Tailwind | Task 1 |
| GSAP tractor, clouds, birds | Task 5 |
| Three.js berry orbs | Task 5 |
| Framer Motion parallax + scroll entrance | Tasks 4–10 |
| Particle system (floating leaves/pollen) | Task 5 |
| Isometric farm grid with hover crops | Task 6 |
| Sparkle effects + crop tooltips | Task 6 |
| Animated NPC farmer | Task 6 |
| Berry market stand (clickable) | Task 6 |
| Animated stat counters | Task 7 |
| Farm sign cards (claymorphism) | Task 7 |
| Claymorphism crate cards with badges | Task 8 |
| XP progress bar | Task 9 |
| Achievement badges | Task 9 |
| Coin animation on click | Task 7 (CoinAnimation) |
| Farm-themed contact form | Task 10 |
| Animated mailbox | Task 10 |
| Day/Night toggle | Tasks 3–4 |
| Loading screen | Task 3 |
| Navbar with scroll fade | Task 4 |
| Mobile responsive | Task 12 |
| `prefers-reduced-motion` | Tasks 2, 5 |
| Real brand content + contact details | Tasks 2, 10 |
| Push every change to GitHub | Every task's commit step |
