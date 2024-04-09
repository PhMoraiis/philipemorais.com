/* eslint-disable indent */
'use client'

import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

import { motion } from 'framer-motion'
import {
  AlertTriangle,
  CheckCircle,
  CircleUser,
  Code,
  Command,
  Copy,
  Home,
  Laptop,
  Lightbulb,
  MailOpen,
  Moon,
  Pipette,
  Sun,
  Zap
} from 'lucide-react'

import {
  CommandDialog,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/components/ui/command'
import { toast } from 'sonner'
import { Button } from '../ui/button'

import { useTranslations } from 'next-intl'

const CommandButton = () => {
  const { setTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const t = useTranslations('CommandBar')

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
        case 'g' && 'h':
          handleGoHome()
          break
        case 'g' && 'a':
          handleGoAbout()
          break
        case 'g' && 'p':
          handleGoProjects()
          break
        case 'g' && 'k':
          handleGoSkills()
          break
        case 'g' && 'u':
          handleGoUses()
          break
        case 't' && 'l':
          handleLightTheme()
          break
        case 't' && 'd':
          handleDarkTheme()
          break
        case 't' && 's':
          handleSystemTheme()
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
    navigator.clipboard.writeText(`philipemorais.tech${pathname}`)
      .then(() => {
        handleCloseCommandBar()
        toast(t('toastCopy'), {
          icon: <CheckCircle className='mr-2 h-4 w-4 text-green-500' />,
          description: t('toastCopyDescription'),
          duration: 2000
        })
      })
      .catch((error) => {
        toast(t('toastCopyError'),
          {
            icon: <AlertTriangle className='mr-2 h-4 w-4 text-red-500' />,
            description: t('toastCopyErrorDescription') + error,
            duration: 2000
          })
      })
  }

  const handleSendEmail = () => {
    router.push('/contact')
    handleCloseCommandBar()
  }

  const handleViewSource = () => {
    window.open('https://github.com/PhMoraiis/Portfolio', '_blank')
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

  const handleGoSkills = () => {
    router.push('/skills')
    handleCloseCommandBar()
  }

  const handleGoUses = () => {
    router.push('/uses')
    handleCloseCommandBar()
  }

  const handleLightTheme = () => {
    if (localStorage.getItem('theme') === 'light') {
      toast(t('toastThemeLightAlreadySelected'), {
        icon: <Sun className='mr-2 h-4 w-4 text-yellow-400' />,
        duration: 2000
      })
      handleCloseCommandBar()
    }
    else {
      setTheme('light')
      localStorage.setItem('theme', 'light')
      handleCloseCommandBar()
      toast(t('toastThemeLightSelected'), {
        icon: <Sun className='mr-2 h-4 w-4 text-yellow-400' />,
        description: t('toastThemeLightDescription'),
        duration: 2000
      })
    }
  }

  const handleDarkTheme = () => {
    if (localStorage.getItem('theme') === 'dark') {
      toast(t('toastThemeDarkAlreadySelected'), {
        icon: <Moon className='mr-2 h-4 w-4 text-sky-700' />,
        duration: 2000
      })
      handleCloseCommandBar()
    }
    else {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
      handleCloseCommandBar()
      toast(t('toastThemeDarkSelected'), {
        icon: <Moon className='mr-2 h-4 w-4 text-sky-700' />,
        description: t('toastThemeDarkDescription'),
        duration: 2000
      })
    }
  }

  const handleSystemTheme = () => {
    if (localStorage.getItem('theme') === 'system') {
      toast(t('toastThemeSystemAlreadySelected'), {
        icon: <Pipette className='mr-2 h-4 w-4 text-violet-500' />,
        duration: 2000
      })
      handleCloseCommandBar()
    }
    else {
      setTheme('system')
      localStorage.setItem('theme', 'system')
      handleCloseCommandBar()
      toast(t('toastThemeSystemSelected'), {
        icon: <Pipette className="mr-2 h-4 w-4 text-violet-500" />,
        description: t('toastThemeSystemDescription'),
        duration: 2000
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

  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      transition={{ type: 'spring', stiffness: 150, damping: 17, bounce: 1 }}
      className='flex justify-between items-center'>
      <Button onClick={handleOpenCommandBar} variant='noHover' size='icon'>
        <Command size={28} />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandList className='overflow'>
          <CommandGroup heading="GERAL">
            <CommandItem>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleCopyLink}>
                <Copy className="mr-2 h-4 w-4" />
                <span className='text-md'>{t('buttonLink')}</span>
              </Button>
              <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>C</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleSendEmail}>
                <MailOpen className="mr-2 h-4 w-4" />
                <span className='text-md'>{t('buttonEmail')}</span>
              </Button>
              <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>E</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleViewSource}>
                <Code className="mr-2 h-4 w-4" />
                <span className='text-md'>{t('buttonSource')}</span>
              </Button>
              <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>V</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="IR PARA">
            <CommandItem className='flex justify-between'>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleGoHome}>
                <div className='flex'>
                  <Home className="mr-2 h-4 w-4" />
                  <span className='text-md'>{t('buttonHome')}</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>G</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>H</CommandShortcut>
              </div>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleGoAbout}>
                <div className='flex'>
                  <CircleUser className="mr-2 h-4 w-4" />
                  <span className='text-md'>{t('buttonAbout')}</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>G</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>A</CommandShortcut>
              </div>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleGoProjects}>
                <div className='flex'>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  <span className='text-md'>{t('buttonProjects')}</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>G</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>P</CommandShortcut>
              </div>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleGoSkills}>
                <div className='flex'>
                  <Zap className="mr-2 h-4 w-4" />
                  <span className='text-md'>{t('buttonSkills')}</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>G</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>K</CommandShortcut>
              </div>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleGoUses}>
                <div className='flex'>
                  <Laptop className="mr-2 h-4 w-4" />
                  <span className='text-md'>{t('buttonSetup')}</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>G</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>U</CommandShortcut>
              </div>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="TEMAS">
            <CommandItem className='flex justify-between'>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleLightTheme}>
                <div className='flex'>
                  <Sun className="mr-2 h-4 w-4" />
                  <span className='text-md'>{t('buttonLightTheme')}</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>T</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>L</CommandShortcut>
              </div>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleDarkTheme}>
                <div className='flex'>
                  <Moon className="mr-2 h-4 w-4" />
                  <span className='text-md'>{t('buttonDarkTheme')}</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>T</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>D</CommandShortcut>
              </div>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleSystemTheme}>
                <div className='flex'>
                  <Pipette className="mr-2 h-4 w-4" />
                  <span className='text-md'>{t('buttonSystemTheme')}</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>T</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>S</CommandShortcut>
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </motion.div >
  )
}

export default dynamic(() => Promise.resolve(CommandButton), { ssr: false })

