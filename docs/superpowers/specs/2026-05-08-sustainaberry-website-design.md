# Sustainaberry Website Design Spec
**Date:** 2026-05-08  
**Status:** Approved

---

## 1. Project Overview

Sustainaberry is a sustainable living service that helps people plant berry bushes on their own land to produce free food every year. This website is a premium, immersive, FarmVille-inspired animated experience that communicates the brand's playful eco-mission and drives users to "Join the Movement."

**Real brand content:**
- Tagline: "Fruits for Free?!? Every Year!?"
- Hero CTA: "Grow the Future Sustainably"
- Value stat: 1 blueberry bush → 20lbs fruit → $200+ annual savings
- Contact: +1 (604) 785-6929 · Sustainaberry@gmail.com · @Sustainaberry

---

## 2. Architecture

| Layer | Decision |
|---|---|
| Framework | Next.js 14 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS with custom design tokens |
| Animation (scroll/entrance) | Framer Motion |
| Animation (hero/GSAP) | GSAP + ScrollTrigger |
| 3D effects | Three.js (berry orbs in hero only) |
| Fonts | Fredoka (headings) + Nunito (body) via Google Fonts |
| Deployment target | Vercel (default Next.js) |

**File structure:**
```
app/
  layout.tsx          # fonts, metadata, global styles
  page.tsx            # section orchestrator (client component)
components/
  hero/               # HeroSection, TractorAnimation, CloudLayer, ParticleSystem
  farm/               # IsometricFarm, CropPlot, FarmerNPC, MarketStand
  about/              # AboutSection, StatCounter, FarmSignCard
  services/           # ServicesSection, BerryBushCard, RarityBadge
  game/               # XPBar, AchievementBadge, CoinAnimation
  contact/            # ContactSection, BarnForm, AnimatedMailbox
  ui/                 # shared: Button, Tooltip, SectionWrapper
lib/
  animations.ts       # shared GSAP/Framer Motion presets
  constants.ts        # brand colors, crop data, service tiers
```

---

## 3. Design System

### Colors
| Token | Hex | Use |
|---|---|---|
| `plum` | `#4A1942` | Primary brand, headers, banners |
| `berry-pink` | `#E91E8C` | CTAs, accents, logo berry |
| `green-bright` | `#22C55E` | Crops, growth, eco signals |
| `sky-blue` | `#38BDF8` | Sky, backgrounds, calm elements |
| `cream` | `#FFF8F0` | Page background, card surfaces |
| `earth-brown` | `#8B5E3C` | Barn, soil, wood textures |

### Typography
- **Heading:** Fredoka (400–700) — playful, rounded, game-like
- **Body:** Nunito (300–700) — friendly, readable, warm
- Scale: 12 / 14 / 16 / 18 / 24 / 32 / 48 / 64px

### Component Style: Claymorphism
- `border-radius: 16–24px`
- `border: 3–4px solid` (plum or green)
- Double shadow: `inset -2px -2px 8px rgba(0,0,0,0.1), 4px 4px 8px rgba(0,0,0,0.15)`
- Soft bounce on hover: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- Pastel/vibrant fills matching crop/berry type

---

## 4. Sections

### 4.1 Hero
- Fullscreen animated farm environment (layered parallax: sky / clouds / hills / crops / foreground)
- GSAP: red tractor drives across screen on loop (every ~12s)
- GSAP: clouds drift left to right at varying speeds
- Framer Motion: berry plants bounce subtly on idle
- Three.js: 3D berry orbs float gently in background
- Particle system: floating leaves/pollen (canvas or CSS)
- Animated birds (SVG path animation) and butterflies
- Copy: "Grow the Future Sustainably" (h1) + "Fruits for free, every year — plant once, harvest forever." (subhead)
- CTAs: "Explore the Farm" (primary) + "Join the Movement" (secondary)
- Game-style UI buttons with plum border + cream fill

### 4.2 Interactive Farm
- CSS isometric grid layout (transform: rotateX(60deg) rotateZ(-45deg))
- 6 crop plots: Blueberries, Raspberries, Strawberries, Blackberries, Corn, Watermelon
- Each plot: SVG emoji-free crop illustrations, subtle idle sway animation
- Hover effect per plot: crop bounces + sparkle particles emit + tooltip appears
  - Tooltip shows: crop name, "$X savings/year", "Organic" badge
- Animated NPC farmer (CSS sprite or SVG) walks paths between plots
- Clickable berry market stand: opens modal with service tiers
- White picket fence border around farm grid

### 4.3 About
- Story: "Environmental sustainability involves making responsible choices that ensure the long-term health of our planet."
- 3 animated farm-sign cards (wooden sign aesthetic, claymorphism):
  1. **Food Financial Relief** — "20lbs of fruit from one bush. $200+ in annual savings."
  2. **Sustainable Living** — "Become self-reliant. Protect yourself from food insecurity."
  3. **Eco Impact** — "Reduce emissions. Strengthen the local economy."
- Animated counters (scroll-triggered): "20+ lbs per bush" / "$200+ saved yearly" / "100% organic"
- Entrance: cards stagger in from below (Framer Motion)

### 4.4 Services/Products
- Section headline: "Choose Your Berry Journey"
- 4 service tiers displayed as claymorphism "crate" cards:
  1. Starter Patch — blueberry starter kit
  2. Berry Bundle — mixed berry selection
  3. Full Orchard — complete berry garden setup
  4. Community Garden — group/neighborhood plan
- Each card: bounce on hover, glow border, slight spin (2–3deg) on hover
- Rarity badges: "Organic" (green) / "Fresh Picked" (pink) / "Carbon Neutral" (blue)
- Game-style "Select" button per card

### 4.5 Game Features
- XP progress bar: "Your Farm Level" fills on scroll
- Achievement badges (unlocked as user scrolls): "First Harvest" / "Eco Warrior" / "Berry Master"
- Floating coin (+$200) animates out when user clicks a crop plot
- Animated loading screen (farm game boot sequence) on first page load: ~2s with progress bar

### 4.6 Contact
- Barn-style section with wood-plank background texture
- Form fields: Name, Email, Phone, Message (all with Nunito styling, Tailwind)
- Animated mailbox: flag raises on form focus
- Submit button: on success, a small berry bush grows out of the button (GSAP/Framer)
- Contact details displayed:
  - +1 (604) 785-6929
  - Sustainaberry@gmail.com
  - @Sustainaberry
- Form validation: inline errors below fields, no placeholder-only labels

---

## 5. Animation System

### Ambient (always running)
| Element | Library | Behavior |
|---|---|---|
| Tractor | GSAP | x: -200 → viewport+200, loops every 12s |
| Clouds | GSAP | x: -100% → 110%, staggered speeds |
| Birds | GSAP / SVG path | Fly across sky, occasional flap |
| Leaves/pollen | CSS keyframes / Canvas | Float upward, fade out |
| Crop sway | Framer Motion | `rotate: [-1, 1]`, `transition: repeat: Infinity, duration: 3` |

### Scroll-triggered (Framer Motion)
- Section entrance: `initial: {opacity:0, y:40}` → `animate: {opacity:1, y:0}`, stagger 0.1s per card
- Stat counters: count from 0 to target on viewport entry
- XP bar: fills progressively as user scrolls

### Interaction
- Crop hover: scale 1.1 + sparkle emit + tooltip fade in (150ms ease-out)
- Card hover: `translateY(-8px)` + glow box-shadow (200ms)
- Button press: scale 0.95 (80ms) → release scale 1.05 → settle 1.0 (spring)

### Reduced Motion
All GSAP/Framer animations wrapped with `useReducedMotion()` / `@media (prefers-reduced-motion: reduce)` — fall back to instant opacity transitions.

---

## 6. Bonus Features

- **Day/Night Cycle:** Toggle button in navbar switches sky gradient + ambient lighting CSS vars
- **Loading Screen:** 2s farm-game boot animation with Sustainaberry logo, animated progress bar
- **Scroll-triggered farm expansion:** Farm section reveals additional plots as user scrolls right

---

## 7. Accessibility & Performance

- All interactive elements: min 44×44px touch targets
- Alt text on all meaningful images/SVGs
- Keyboard navigation: full tab support, visible focus rings
- Contrast: all text passes WCAG AA (4.5:1) against their backgrounds
- Images: WebP format, `next/image` with width/height declared
- Fonts: `font-display: swap`, preload critical fonts
- Code splitting: each section lazy-loaded via `next/dynamic`
- No horizontal scroll on any breakpoint (375 / 768 / 1024 / 1440px)

---

## 8. Deployment

- `git push` triggers Vercel auto-deploy
- Every code change committed and pushed to `https://github.com/tahmeedh/Sustainaberry.git`
