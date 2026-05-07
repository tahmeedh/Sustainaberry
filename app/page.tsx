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
