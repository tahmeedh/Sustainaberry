'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

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
