/* eslint-disable indent */
'use client'

import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

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
  Palette,
  Sun,
  Zap
} from 'lucide-react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/components/ui/command'
import { toast } from 'sonner'
import { Button } from '../ui/button'


const CommandButton = () => {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'l':
          handleCopyLink()
          break
        case 'e':
          handleSendEmail()
          break
        case 's':
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
        case 'g' && 's':
          handleGoSkills()
          break
        case 'g' && 'u':
          handleGoUses()
          break
        case 's' && 'l':
          handleGoLinkedin()
          break
        case 's' && 'g':
          handleGoGithub()
          break
        case 's' && 'i':
          handleGoInstagram()
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
  }, [])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`philipemorais.tech${pathname}`)
      .then(() => {
        handleCloseCommandBar()
        toast('Link copied to clipboard!', {
          icon: <CheckCircle className='mr-2 h-4 w-4 text-green-500' />,
          description: 'You can now paste it wherever you want.',
          duration: 3000
        })
      })
      .catch((error) => console.error('Error copying Link: ', error))
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

  const handleGoLinkedin = () => {
    window.open('https://www.linkedin.com/in/ph-morais/', '_blank')
    handleCloseCommandBar()
  }

  const handleGoGithub = () => {
    window.open('https://www.github.com/PhMoraiis', '_blank')
    handleCloseCommandBar()
  }

  const handleGoInstagram = () => {
    window.open('https://www.instagram.com/liipe.moraiis/', '_blank')
    handleCloseCommandBar()
  }

  const handleLightTheme = () => {
    setTheme('light')
    localStorage.setItem('theme', 'light')
    handleCloseCommandBar()
  }

  const handleDarkTheme = () => {
    setTheme('dark')
    localStorage.setItem('theme', 'dark')
    handleCloseCommandBar()
  }

  const handleSystemTheme = () => {
    setTheme('system')
    localStorage.setItem('theme', 'system')
    handleCloseCommandBar()
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
        <Command size={26} />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="GENERAL">
            <CommandItem>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleCopyLink}>
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy Link</span>
              </Button>
              <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>L</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleSendEmail}>
                <MailOpen className="mr-2 h-4 w-4" />
                <span>Send Email</span>
              </Button>
              <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>E</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleViewSource}>
                <Code className="mr-2 h-4 w-4" />
                <span>View Source</span>
              </Button>
              <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="GO TO">
            <CommandItem className='flex justify-between'>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleGoHome}>
                <div className='flex'>
                  <Home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>G</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>H</CommandShortcut>
              </div>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleGoAbout}>
                <div className='flex'>
                  <CircleUser className="mr-2 h-4 w-4" />
                  <span>About</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>G</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>A</CommandShortcut>
              </div>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleGoProjects}>
                <div className='flex'>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  <span>Projects</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>G</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>P</CommandShortcut>
              </div>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleGoSkills}>
                <div className='flex'>
                  <Zap className="mr-2 h-4 w-4" />
                  <span>Skills</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>G</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>S</CommandShortcut>
              </div>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleGoUses}>
                <div className='flex'>
                  <Laptop className="mr-2 h-4 w-4" />
                  <span>Uses</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>G</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>U</CommandShortcut>
              </div>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="SOCIALS">
            <CommandItem className='flex justify-between'>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleGoLinkedin}>
                <div className='flex'>
                  <Linkedin className="mr-2 h-4 w-4" />
                  <span>LinkedIn</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>S</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>L</CommandShortcut>
              </div>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleGoGithub}>
                <div className='flex'>
                  <Github className="mr-2 h-4 w-4" />
                  <span>Github</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>S</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>G</CommandShortcut>
              </div>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleGoInstagram}>
                <div className='flex'>
                  <Instagram className="mr-2 h-4 w-4" />
                  <span>Instagram</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>S</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>I</CommandShortcut>
              </div>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="THEMES">
            <CommandItem className='flex justify-between'>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleLightTheme}>
                <div className='flex'>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>T</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>L</CommandShortcut>
              </div>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleDarkTheme}>
                <div className='flex'>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>T</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>D</CommandShortcut>
              </div>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="ghost" size="sm" className='m-0 p-0' onClick={handleSystemTheme}>
                <div className='flex'>
                  <Palette className="mr-2 h-4 w-4" />
                  <span>System</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>T</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-background rounded-lg'>S</CommandShortcut>
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </motion.div >
  )
}

export default dynamic(() => Promise.resolve(CommandButton), { ssr: false })

