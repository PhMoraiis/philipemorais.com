/* eslint-disable indent */
'use client'

import { useTheme } from 'next-themes'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'

import { motion } from 'framer-motion'
import {
  Check,
  CheckCircle,
  CircleUser,
  Code,
  Command,
  Copy,
  Github,
  Home,
  Instagram,
  Languages,
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
  CommandShortcut
} from '@/components/ui/command'
import type { Locale } from '@/config'
import { setUserLocale } from '@/services/locale'
import { useTranslations } from 'next-intl'
import { GiBrazilFlag } from 'react-icons/gi'
import { LiaFlagUsaSolid } from 'react-icons/lia'
import { toast } from 'sonner'
import Magnetic from '../Magnetic'
import { Button } from '../ui/button'

const CommandButton = () => {
  const [isPending, startTransition] = useTransition()
  const [activeLocale, setActiveLocale] = useState<Locale>('en')
  const { setTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const t = useTranslations('CommandBar')
  const tt = useTranslations('Toasts')

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      setOpen((open) => !open)
    }
    else if (event.key === 'c') {
      event.preventDefault()
      handleCopyLink()
    }
    else if (event.key === 'e') {
      event.preventDefault()
      handleSendEmail()
    }
    else if (event.key === 'v') {
      event.preventDefault()
      handleViewSource()
    }
    else if (event.key === 'n') {
      event.preventDefault()
      handleGoLinkedin()
    }
    else if (event.key === 'g') {
      event.preventDefault()
      handleGoGithub()
    }
    else if (event.key === 'i') {
      event.preventDefault()
      handleGoInstagram()
    }
    else if (event.key === 'h') {
      event.preventDefault()
      handleGoHome()
    }
    else if (event.key === 'a') {
      event.preventDefault()
      handleGoAbout()
    }
    else if (event.key === 'p') {
      event.preventDefault()
      handleGoProjects()
    }
    else if (event.key === 'u') {
      event.preventDefault()
      handleGoUses()
    }
    else if (event.key === 'l') {
      event.preventDefault()
      handleLightTheme()
    }
    else if (event.key === 'd') {
      event.preventDefault()
      handleDarkTheme()
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
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


  const handleLocaleChange = (locale: string) => {
    startTransition(() => {
      setUserLocale(locale as Locale)
      setActiveLocale(locale as Locale)
      handleCloseCommandBar()
    })
    toast(tt('toastLanguage'), {
      icon: <Languages className='mr-2 h-4 w-4' />,
      duration: 2000
    })
  }

  return (
    <motion.div
      transition={{ type: 'spring', stiffness: 150, damping: 17, bounce: 1 }}
      className='flex justify-between items-center'>
      <Button onClick={handleOpenCommandBar} variant='default' size='sm' className='gap-2'>
        Press CTRL+K to start <Command size={22} />
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
              <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>U</CommandShortcut>
            </CommandItem>
          </CommandGroup>
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
          <CommandGroup heading={t('CommandGroup5')}>
            <CommandItem className={`flex justify-between ${activeLocale === 'en' ? 'bg-accent' : ''}`}>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={() => handleLocaleChange('en')}>
                <div className='flex'>
                  <Magnetic>
                    <LiaFlagUsaSolid className="mr-2 h-4 w-4" />
                  </Magnetic>
                  <span className='text-md hover:animate-text-shake'>{t('buttonUSA')}</span>
                </div>
              </Button>
              {
                activeLocale === 'en' && <CommandShortcut className='text-lg p-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'><Check className="h-4 w-4" /></CommandShortcut>
              }
            </CommandItem>
            <CommandItem className={`flex justify-between ${activeLocale === 'pt-br' ? 'bg-accent' : ''}`}>
              <Button variant="noHover" size="sm" className='`m-0 p-0' onClick={() => handleLocaleChange('pt-br')}>
                <div className='flex'>
                  <Magnetic>
                    <GiBrazilFlag className="mr-2 h-4 w-4" />
                  </Magnetic>
                  <span className='text-md hover:animate-text-shake'>{t('buttonBR')}</span>
                </div>
              </Button>
              {
                activeLocale === 'pt-br' && <CommandShortcut className='text-lg p-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'><Check className="h-4 w-4" /></CommandShortcut>
              }
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </motion.div>
  )
}

export default CommandButton

