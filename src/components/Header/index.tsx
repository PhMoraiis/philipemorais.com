'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import LogoDropdown from '../LogoDropdown'

const Header = () => {
  const { theme, setTheme } = useTheme()

  // Defina a animação para a rotação do ícone
  const iconRotation = {
    rotate: theme === 'dark' ? 180 : 360,
  }

  const logoRotation = {
    rotate: theme === 'dark' ? -360 : -720,
  }

  return (
    <header>
      <div className='flex justify-between items-center py-12'>
        <motion.div
          whileHover={{ scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 150, damping: 17, bounce: 1 }}
          animate={logoRotation}>
          <LogoDropdown />
        </motion.div>
        <div>
          <div onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17, bounce: 1 }}
              animate={iconRotation}
              className='cursor-pointer'
            >
              {theme === 'light' ? (
                <div className='rounded-full p-1 hover:text-light-100 dark:hover:text-dark-100 hover:bg-dark-100 dark:hover:bg-light-10 duration-500 ease-in'>
                  <Moon size={28} strokeWidth={1.5} absoluteStrokeWidth />
                </div>
              ) : (
                <div className='rounded-full p-1 hover:text-light-100 dark:hover:text-dark-100 hover:bg-dark-100 dark:hover:bg-light-100 duration-500 ease-in'>
                  <Sun size={28} strokeWidth={2} absoluteStrokeWidth />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </header >
  )
}

export default dynamic(() => Promise.resolve(Header), { ssr: false })
