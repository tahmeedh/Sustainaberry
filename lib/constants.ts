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
  { value: 20, suffix: 'lbs', label: 'Fruit per bush yearly', color: 'green' },
  { value: 200, prefix: '$', suffix: '+', label: 'Annual food savings', color: 'berry' },
  { value: 100, suffix: '%', label: 'Organic & natural', color: 'sky' },
]

export const ABOUT_CARDS = [
  {
    title: 'Food Financial Relief',
    body: "With just one mature blueberry bush you will get over 20lbs of fruit. At $8 a pound, that's over $200 in savings every year.",
    icon: '🌱',
    borderColor: '#22C55E',
    bgColor: 'rgba(34,197,94,0.12)',
  },
  {
    title: 'Sustainable Living',
    body: 'Become self-reliant by protecting yourself from recession-driven food insecurity. Your land, your food, your freedom.',
    icon: '🏡',
    borderColor: '#38BDF8',
    bgColor: 'rgba(56,189,248,0.12)',
  },
  {
    title: 'Eco Impact',
    body: 'A collective push to transition to sustainable living models will reduce emissions and promote the local economy.',
    icon: '🌍',
    borderColor: '#E91E8C',
    bgColor: 'rgba(233,30,140,0.12)',
  },
]

export const CROPS = [
  { id: 'blueberry', name: 'Blueberries', emoji: '🫐', savings: '$200+/yr', color: '#4169E1', bgColor: '#DBEAFE', description: 'High-yield perennial. 20lbs per mature bush.' },
  { id: 'raspberry', name: 'Raspberries', emoji: '🍇', savings: '$150+/yr', color: '#E91E8C', bgColor: '#FCE7F3', description: 'Fast-growing canes. Harvest in year 2.' },
  { id: 'strawberry', name: 'Strawberries', emoji: '🍓', savings: '$100+/yr', color: '#EF4444', bgColor: '#FEE2E2', description: 'Ground cover variety. Spreads naturally.' },
  { id: 'blackberry', name: 'Blackberries', emoji: '🫐', savings: '$180+/yr', color: '#6B21A8', bgColor: '#F3E8FF', description: 'Thornless variety. Thrives in any soil.' },
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
    borderColor: '#38BDF8',
    bgColor: '#EFF6FF',
    accent: '#38BDF8',
    highlight: false,
  },
  {
    id: 'bundle',
    name: 'Berry Bundle',
    description: 'Mixed berry selection — blueberries, raspberries, and strawberries. Includes seasonal planting calendar.',
    berries: ['Blueberries', 'Raspberries', 'Strawberries'],
    badges: ['Organic', 'Fresh Picked', 'Carbon Neutral'],
    borderColor: '#E91E8C',
    bgColor: '#FDF2F8',
    accent: '#E91E8C',
    highlight: true,
  },
  {
    id: 'orchard',
    name: 'Full Orchard',
    description: 'Complete berry garden setup. All 4 berry varieties, full soil analysis, landscape plan, and 2 follow-up visits.',
    berries: ['Blueberries', 'Raspberries', 'Strawberries', 'Blackberries'],
    badges: ['Organic', 'Fresh Picked', 'Carbon Neutral'],
    borderColor: '#4A1942',
    bgColor: '#F5F3FF',
    accent: '#4A1942',
    highlight: false,
  },
  {
    id: 'community',
    name: 'Community Garden',
    description: 'Group or neighborhood plan. Shared berry plots designed for 5–20 households. Maximum eco and community impact.',
    berries: ['All varieties'],
    badges: ['Carbon Neutral', 'Organic'],
    borderColor: '#22C55E',
    bgColor: '#F0FDF4',
    accent: '#22C55E',
    highlight: false,
  },
]

export const ACHIEVEMENTS = [
  { id: 'first-harvest', label: 'First Harvest', description: 'You discovered the farm!', emoji: '🌱' },
  { id: 'eco-warrior', label: 'Eco Warrior', description: 'You explored sustainable living', emoji: '🌍' },
  { id: 'berry-master', label: 'Berry Master', description: 'You found all crop types!', emoji: '🫐' },
]
