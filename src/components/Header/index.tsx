'use client'

import Link from 'next/link'
import Logo from '../Logo'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const Header = () => {
  const { theme, setTheme } = useTheme();

  // Defina a animação para a rotação do ícone
  const iconRotation = {
    rotate: theme === 'dark' ? 180 : 0,
  }


  return (
    <header className="dark:bg-dark-100 bg-light-200">
      <div className='flex justify-around items-center mx-auto py-16 max-w-desktop'>
        <div className=''>
          {theme === 'dark' ? (
            <Link href="/">
              <Logo color='#333333' colorInside='#f6f6f6' />
            </Link>
          ) : (
            <Link href="/">
              <Logo color='#f6f6f6' colorInside='#333333' />
            </Link>
          )}
        </div>
        <div className='flex justify-between'>
          <div onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17, bounce: 1 }}
              animate={iconRotation}
              className='rounded-full cursor-pointer'
            >
              {theme === 'light' ? (
                <Moon color='#333333' size={28} strokeWidth={1.5} absoluteStrokeWidth />
              ) : (
                <Sun color='#f6f6f6' size={28} strokeWidth={1.5} absoluteStrokeWidth />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </header >
  )
}

export default Header