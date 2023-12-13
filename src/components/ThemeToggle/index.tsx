'use client'

import { useTheme } from 'next-themes'

import { Moon, Sun } from 'lucide-react'

const ThemeToggle = () => {
  const { setTheme } = useTheme()

  return (
    <div>
      <div onClick={() => setTheme('light')}>
        <Sun color='#000' size={28} strokeWidth={1.5} absoluteStrokeWidth /> 
      </div>
      <div onClick={() => setTheme('dark')}>
        <Moon color='#000' size={28} strokeWidth={1.5} absoluteStrokeWidth /> 
      </div>
    </div>
  )
}

export default ThemeToggle