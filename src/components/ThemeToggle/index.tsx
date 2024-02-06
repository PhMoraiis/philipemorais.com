'use client'

import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const iconRotation = {
    rotate: theme === 'dark' ? 180 : 0,
  }

  return (
    <div className='flex justify-between'>
      <div onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        <motion.div animate={iconRotation}>
          {theme === 'light' ? (
            <Moon color='#333333' size={28} strokeWidth={1.5} absoluteStrokeWidth />
          ) : (
            <Sun color='#f6f6f6' size={28} strokeWidth={1.5} absoluteStrokeWidth />
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(ThemeToggle), { ssr: false })
