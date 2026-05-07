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
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const particles: Particle[] = []
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (particles.length < 25 && Math.random() < 0.08) particles.push(createParticle(canvas.width, canvas.height))
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx; p.y += p.vy; p.rotation += p.rotSpeed; p.life++
        p.opacity = 1 - p.life / p.maxLife
        if (p.life >= p.maxLife) { particles.splice(i, 1); continue }
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }} />
}
