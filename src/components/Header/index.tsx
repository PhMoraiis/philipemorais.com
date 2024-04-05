'use client'

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import CommandButton from '../CommandButton'
import { LogoBlack, LogoWhite } from '../Logos'


const Header = () => {
  const { theme, setTheme } = useTheme()

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
          <Link href='/'>
            {theme === 'dark' ? <LogoWhite /> : <LogoBlack />}
          </Link>
        </motion.div>
        <div>
          <CommandButton />
        </div>
      </div>
    </header >
  )
}

export default dynamic(() => Promise.resolve(Header), { ssr: false })
