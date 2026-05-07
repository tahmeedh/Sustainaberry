'use client'
import { useRef, Suspense } from 'react'
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

const BERRIES: Array<{ position: [number,number,number]; color: string; speed: number }> = [
  { position: [-3, 1, -2], color: '#4169E1', speed: 0.8 },
  { position: [3, -1, -3], color: '#E91E8C', speed: 1.1 },
  { position: [-1, 2, -4], color: '#22C55E', speed: 0.6 },
  { position: [2, 0, -2], color: '#6B21A8', speed: 0.9 },
  { position: [0, -2, -3], color: '#EF4444', speed: 1.3 },
]

export default function ThreeBerries() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5, opacity: 0.5 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          {BERRIES.map((b, i) => <Berry key={i} {...b} />)}
        </Suspense>
      </Canvas>
    </div>
  )
}
