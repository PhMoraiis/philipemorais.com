'use client'

import { motion } from 'framer-motion'
import { Github, Instagram, Linkedin, Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Skeleton } from '../ui/skeleton'

const Hero = () => {
  const [isHover, setIsHover] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const t = useTranslations('Hero')

  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMouseLeave = () => {
    setIsHover(false)
  }

  const logoRotation = {
    rotate: theme === 'dark' || resolvedTheme === 'dark' ? -360 : -720,
  }

  // Objeto contendo os dados dos links
  const socialLinks = [
    { href: 'https://www.linkedin.com/in/ph-morais', icon: <Linkedin size={24} /> },
    { href: 'https://www.github.com/PhMoraiis', icon: <Github size={24} /> },
    { href: 'https://www.instagram.com/philipemoraiis', icon: <Instagram size={24} /> },
    { href: 'mailto:philipe_m@icloud.com', icon: <Mail size={24} /> },
  ]

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) {
    return (
      <Skeleton className="w-full h-96 mt-20" />
    )
  }

  return (
    <section className='bg-white dark:bg-[#111110] rounded-xl p-10 shadow-sm'>
      <div className="mt-20 md:flex md:items-end md:justify-between lg:flex lg:items-end lg:justify-between">
        <div className="flex flex-col items-start gap-4 md:gap-6 md:max-w-sm lg:gap-6 lg:max-w-lg">
          <div className="max-w-xs lg:max-w-md">
            <h1 className="text-[2.8rem] leading-none font-Relative md:text-5xl lg:text-6xl">{t('title')}</h1>
            <span className="text-[2.8rem] leading-none font-Relative md:text-5xl lg:text-6xl"> - Frontend Developer & UX/UI Designer</span>
          </div>
          <p className="max-w-md font-RelativeBk lg:max-w-lg lg:text-lg">{t('paragraph')}</p>
        </div>
        <div className='flex flex-col items-start my-12 md:m-0 lg:m-0'>
          <Dialog>
            <span className="font-RelativeBk text-gray-400 mb-1 lg:text-lg animate-shine bg-[linear-gradient(110deg,#939393,45%,#1e2631,55%,#939393)] bg-[length:200%_100%] text-transparent bg-clip-text">{t('cta')}</span>
            <DialogTrigger className="border border-input bg-background rounded-2xl h-9 px-3 py-2 inline-flex items-center cursor-pointer font-Relative" onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
              <div className={`rounded-full w-3 h-3 bg-[#00eb4e] mr-2 ${isHover ? 'neon2' : 'neon'} duration-300 ease-in-out`} />
              {t('buttonText')}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('dialogTitle')}</DialogTitle>
                <DialogDescription>
                  {t('dialogDescription')}
                </DialogDescription>
              </DialogHeader>
              <ul className='flex items-center justify-center gap-4'>
                {socialLinks.map((link, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<li key={index}>
                    <Link href={link.href} target='_blank'>
                      <motion.button
                        className="border border-primary bg-transparent dark:border-gray-400 rounded-2xl h-9 px-3 py-2 inline-flex items-center cursor-pointer font-Relative"
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: 'spring', stiffness: 150, damping: 17, bounce: 1 }}
                        animate={logoRotation}>
                        {link.icon}
                      </motion.button>
                    </Link>
                  </li>
                ))}
              </ul>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}

export default Hero
