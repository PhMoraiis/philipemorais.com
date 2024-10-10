'use client'

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CommandButton from '../CommandButton'
import { LogoBlack, LogoWhite } from '../Logos'
import Magnetic from '../Magnetic'
import { Skeleton } from '../ui/skeleton'


const Navbar = () => {
  const { theme, resolvedTheme } = useTheme()

  const logoRotation = {
    rotate: theme === 'dark' || resolvedTheme === 'dark' ? -360 : -720,
  }

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) {
    return (
      <Skeleton className='w-full h-12 mt-10' />
    )
  }

  return (
    <header>
      <div className='flex justify-between items-center py-12'>
        <motion.div
          whileHover={{ scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 150, damping: 17, bounce: 1 }}
          animate={logoRotation}>
          <Magnetic>
            <Link href='/'>
              {theme === 'dark' || resolvedTheme === 'dark' ? <LogoWhite /> : <LogoBlack />}
            </Link>
          </Magnetic>
        </motion.div>
        <div>
          <CommandButton />
        </div>
      </div>
    </header>
  )
}

export default Navbar
