/* eslint-disable indent */
'use client'

import { useTheme } from 'next-themes'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import {
  CheckCircle,
  CircleUser,
  Code,
  Command,
  Copy,
  Github,
  Home,
  Instagram,
  Laptop,
  Lightbulb,
  Linkedin,
  MailOpen,
  Moon,
  Sun
} from 'lucide-react'

import {
  CommandDialog,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/components/ui/command'
import { useLocale, useTranslations } from 'next-intl'
import { toast } from 'sonner'
import Magnetic from '../Magnetic'
import { Button } from '../ui/button'
import LocaleSwitcherSelect from '../LocaleSwitcherSelect'
import { LiaFlagUsaSolid } from 'react-icons/lia'
import { GiBrazilFlag } from 'react-icons/gi'

const CommandButton = () => {
  const locale = useLocale()
  const { setTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const t = useTranslations('CommandBar')
  const tt = useTranslations('Toasts')

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'c':
          handleCopyLink()
          break
        case 'e':
          handleSendEmail()
          break
        case 'v':
          handleViewSource()
          break
        case 'n':
          handleGoLinkedin()
          break
        case 'g':
          handleGoGithub()
          break
        case 'i':
          handleGoInstagram()
          break
        case 'h':
          handleGoHome()
          break
        case 'a':
          handleGoAbout()
          break
        case 'p':
          handleGoProjects()
          break
        case 'u':
          handleGoUses()
          break
        case 'l':
          handleLightTheme()
          break
        case 'd':
          handleDarkTheme()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`philipemorais.com${pathname}`)
      .then(() => {
        handleCloseCommandBar()
        toast(tt('toastCopy'), {
          icon: <CheckCircle className='mr-2 h-4 w-4 text-green-500' />,
          description: tt('toastCopyDescription'),
          duration: 2000
        })
      })
      .catch((error) => console.error('Error copying Link: ', error))
  }

  const handleSendEmail = () => {
    handleCloseCommandBar()
    window.open('mailto:philipe_m@icloud.com')
  }

  const handleViewSource = () => {
    window.open('https://github.com/PhMoraiis/philipemorais.com', '_blank')
    handleCloseCommandBar()
  }

  const handleGoHome = () => {
    router.push('/')
    handleCloseCommandBar()
  }

  const handleGoAbout = () => {
    router.push('/about')
    handleCloseCommandBar()
  }

  const handleGoProjects = () => {
    router.push('/projects')
    handleCloseCommandBar()
  }

  const handleGoUses = () => {
    router.push('/uses')
    handleCloseCommandBar()
  }

  const handleGoLinkedin = () => {
    window.open('https://www.linkedin.com/in/ph-morais/', '_blank')
    handleCloseCommandBar()
  }

  const handleGoGithub = () => {
    window.open('https://www.github.com/PhMoraiis', '_blank')
    handleCloseCommandBar()
  }

  const handleGoInstagram = () => {
    window.open('https://www.instagram.com/philipemoraiis/', '_blank')
    handleCloseCommandBar()
  }

  const handleLightTheme = () => {
    if (localStorage.getItem('theme') === 'light') {
      toast(tt('toastThemeLightAlreadySelected'), {
        icon: <Sun className='mr-2 h-4 w-4 text-yellow-400' />,
        duration: 2000
      })
      handleCloseCommandBar()
    }
    else {
      setTheme('light')
      localStorage.setItem('theme', 'light')
      handleCloseCommandBar()
      toast(tt('toastThemeLightSelected'), {
        icon: <Sun className='mr-2 h-4 w-4 text-yellow-400' />,
        description: tt('toastThemeLightDescription'),
        duration: 2000
      })
    }
  }

  const handleDarkTheme = () => {
    if (localStorage.getItem('theme') === 'dark') {
      toast(tt('toastThemeDarkAlreadySelected'), {
        icon: <Moon className='mr-2 h-4 w-4 text-sky-700' />,
        duration: 2000,
        style: {
          backgroundColor: '#333',
          color: '#fff',
          border: 'none'
        }
      })
      handleCloseCommandBar()
    }
    else {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
      handleCloseCommandBar()
      toast(tt('toastThemeDarkSelected'), {
        icon: <Moon className='mr-2 h-4 w-4 text-sky-700' />,
        description: tt('toastThemeDarkDescription'),
        duration: 2000,
        style: {
          backgroundColor: '#333',
          color: '#fff',
          border: 'none'
        }
      })
    }
  }

  const handleOpenCommandBar = () => {
    setOpen((open) => !open)
  }

  // Essa função realiza o fechamento do CommandBar ao clicar em um CommandItem. Ela fica dentro das onClicks de cada CommandItem.
  const handleCloseCommandBar = () => {
    setOpen(false)
  }

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      transition={{ type: 'spring', stiffness: 150, damping: 17, bounce: 1 }}
      className='flex justify-between items-center'>
      <Button onClick={handleOpenCommandBar} variant='noHover' size='icon'>
        <Command size={28} />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandList className='overflow font-Relative'>
          <CommandGroup heading={t('CommandGroup1')}>
            <CommandItem>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleCopyLink}>
                <Magnetic>
                  <Copy className="mr-2 h-4 w-4" />
                </Magnetic>
                <span className='text-md hover:animate-text-shake'>{t('buttonLink')}</span>
              </Button>
              <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>C</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleSendEmail}>
                <Magnetic>
                  <MailOpen className="mr-2 h-4 w-4" />
                </Magnetic>
                <span className='text-md hover:animate-text-shake'>{t('buttonEmail')}</span>
              </Button>
              <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>E</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleViewSource}>
                <Magnetic>
                  <Code className="mr-2 h-4 w-4" />
                </Magnetic>
                <span className='text-md hover:animate-text-shake'>{t('buttonSource')}</span>
              </Button>
              <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>V</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={t('CommandGroup2')}>
            <CommandItem className='flex justify-between'>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleGoLinkedin}>
                <div className='flex'>
                  <Magnetic>
                    <Linkedin className="mr-2 h-4 w-4" />
                  </Magnetic>
                  <span className='text-md hover:animate-text-shake'>LinkedIn</span>
                </div>
              </Button>
              <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>N</CommandShortcut>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleGoGithub}>
                <div className='flex'>
                  <Magnetic>
                    <Github className="mr-2 h-4 w-4" />
                  </Magnetic>
                  <span className='text-md hover:animate-text-shake'>GitHub</span>
                </div>
              </Button>
              <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>G</CommandShortcut>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleGoInstagram}>
                <div className='flex'>
                  <Magnetic>
                    <Instagram className="mr-2 h-4 w-4" />
                  </Magnetic>
                  <span className='text-md hover:animate-text-shake'>Instagram</span>
                </div>
              </Button>
              <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>I</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={t('CommandGroup3')}>
            <CommandItem className='flex justify-between'>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleGoHome}>
                <div className='flex'>
                  <Magnetic>
                    <Home className="mr-2 h-4 w-4" />
                  </Magnetic>
                  <span className='text-md hover:animate-text-shake'>Home</span>
                </div>
              </Button>
              <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>H</CommandShortcut>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleGoAbout}>
                <div className='flex'>
                  <Magnetic>
                    <CircleUser className="mr-2 h-4 w-4" />
                  </Magnetic>
                  <span className='text-md hover:animate-text-shake'>{t('buttonAbout')}</span>
                </div>
              </Button>
              <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>A</CommandShortcut>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleGoProjects}>
                <div className='flex'>
                  <Magnetic>
                    <Lightbulb className="mr-2 h-4 w-4" />
                  </Magnetic>
                  <span className='text-md hover:animate-text-shake'>{t('buttonProjects')}</span>
                </div>
              </Button>
              <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>P</CommandShortcut>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleGoUses}>
                <div className='flex'>
                  <Magnetic>
                    <Laptop className="mr-2 h-4 w-4" />
                  </Magnetic>
                  <span className='text-md hover:animate-text-shake'>{t('buttonSetup')}</span>
                </div>
              </Button>
              <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={t('CommandGroup4')}>
            <CommandItem className='flex justify-between'>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleLightTheme}>
                <div className='flex'>
                  <Magnetic>
                    <Sun className="mr-2 h-4 w-4" />
                  </Magnetic>
                  <span className='text-md hover:animate-text-shake'>{t('buttonLightTheme')}</span>
                </div>
              </Button>
              <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>L</CommandShortcut>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleDarkTheme}>
                <div className='flex'>
                  <Magnetic>
                    <Moon className="mr-2 h-4 w-4" />
                  </Magnetic>
                  <span className='text-md hover:animate-text-shake'>{t('buttonDarkTheme')}</span>
                </div>
              </Button>
              <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>D</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <LocaleSwitcherSelect defaultValue={locale}
            items={[
              {
                value: 'en',
                label: 'English',
                icon: <LiaFlagUsaSolid />
              },
              {
                value: 'pt-br',
                label: 'Portuguese',
                icon: <GiBrazilFlag />
              }
            ]} />
        </CommandList>
      </CommandDialog>
    </motion.div >
  )
}

export default CommandButton

