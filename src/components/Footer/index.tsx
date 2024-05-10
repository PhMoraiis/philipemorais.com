'use client'

import { motion } from 'framer-motion'
import { ArrowUp, CheckCircle, Copy, Github, Instagram, Linkedin } from 'lucide-react'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { LogoBlack, LogoWhite } from '../Logos'
import Magnetic from '../Magnetic'
import { Separator } from '../ui/separator'
import { toast } from 'sonner'

const Footer = () => {
  const { theme, resolvedTheme } = useTheme()

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('philipe_m@icloud.com')
    toast('Email copied to clipboard.', {
      icon: <CheckCircle className='mr-2 h-4 w-4 text-green-500' />,
      description: 'Now you can talk to me!',
      duration: 2000
    })
  }

  const logoRotation = {
    rotate: theme === 'dark' || resolvedTheme === 'dark' ? -360 : -720,
  }

  return (
    <section className='mt-12 bg-white dark:bg-[#111110] rounded-xl p-10 shadow-sm mb-6'>
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-32">
          <motion.div
            whileHover={{ scale: 1.2 }}
            animate={logoRotation}>
            <Magnetic>
              {theme === 'dark' || resolvedTheme === 'dark' ? <LogoWhite /> : <LogoBlack />}
            </Magnetic>
          </motion.div>
          <div className='max-w-xs lg:max-w-md'>
            <ul className='flex items-center justify-center gap-4'>
              <li>
                <Link href="https://www.linkedin.com/in/ph-morais" target='_blank'>
                  <motion.button
                    className="border border-input bg-background dark:border-border rounded-2xl h-9 px-3 py-2 inline-flex items-center cursor-pointer font-Relative"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 150, damping: 17, bounce: 1 }}
                    animate={logoRotation}>
                    <Linkedin size={24} />
                  </motion.button>
                </Link>
              </li>
              <li>
                <Link href="https://www.github.com/PhMoraiis" target='_blank'>
                  <motion.button
                    className="border border-input bg-background dark:border-border rounded-2xl h-9 px-3 py-2 inline-flex items-center cursor-pointer font-Relative"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 150, damping: 17, bounce: 1 }}
                    animate={logoRotation}>
                    <Github size={24} />
                  </motion.button>
                </Link>
              </li>
              <li>
                <Link href="https://www.instagram.com/philipemoraiis" target='_blank'>
                  <motion.button
                    className="border border-input bg-background dark:border-border rounded-2xl h-9 px-3 py-2 inline-flex items-center cursor-pointer font-Relative"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 150, damping: 17, bounce: 1 }}
                    animate={logoRotation}>
                    <Instagram size={24} />
                  </motion.button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start gap-16 md:flex-row md:items-end md:justify-between lg:flex-row lg:items-end lg:justify-between">
          <div className='flex flex-col gap-4'>
            <div className="max-w-xs lg:max-w-md">
              <h1 className="text-[2.8rem] leading-none font-Relative md:text-5xl lg:text-6xl">Fale Comigo!</h1>
            </div>
            <div className='flex flex-col'>
              <p className="max-w-md font-RelativeBk lg:max-w-xl lg:text-lg md:max-w-xs">Se você quiser conversar sobre um projeto, envie-me um e-mail e retornarei em breve.
              </p>
              <span className='underline hover:text-gray-400 cursor-pointer flex items-center gap-1' onClick={handleCopyEmail}>
                philipe_m@icloud.com <Copy size={16} />
              </span>
            </div>
          </div>
          <motion.div
            transition={{ type: 'spring', stiffness: 150, damping: 17, bounce: 1 }}
            onClick={handleScrollTop}
          >
            <ArrowUp size={48} />
          </motion.div>
        </div>
      </div>
      <Separator className='my-10' />
      <div className='flex flex-col gap-10 justify-start md:flex-row  md:justify-between md:items-center'>
        <span className='font-RelativeBk text-gray-400 mb-1 lg:text-lg animate-shine bg-[linear-gradient(110deg,#939393,45%,#1e2631,55%,#939393)] bg-[length:200%_100%] text-transparent bg-clip-text'>Todos os direitos reservados</span>
        <span className="font-RelativeBk text-gray-400 mb-1 lg:text-lg animate-shine bg-[linear-gradient(110deg,#939393,45%,#1e2631,55%,#939393)] bg-[length:200%_100%] text-transparent bg-clip-text">&copy;2024</span>
      </div>
    </section >
  )
}

export default dynamic(() => Promise.resolve(Footer), { ssr: false })
