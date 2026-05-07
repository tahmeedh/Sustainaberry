import type { Metadata } from 'next'
import { Fredoka, Nunito } from 'next/font/google'
import './globals.css'
import { DayNightProvider } from '@/context/DayNightContext'
import LoadingScreen from '@/components/ui/LoadingScreen'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sustainaberry — Grow the Future Sustainably',
  description:
    'Plant berry bushes on your land and get fruits for free every year. Food independence, eco impact, and $200+ in annual savings.',
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
