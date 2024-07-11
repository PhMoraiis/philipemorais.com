/* eslint-disable indent */
'use client'

import { useTheme } from 'next-themes'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import {
  CheckCircle,
  Code,
  Command,
  Copy,
  Github,
  Instagram,
  Linkedin,
  MailOpen,
  Moon,
  Pipette,
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
import { toast } from 'sonner'
import Magnetic from '../Magnetic'
import { Button } from '../ui/button'

const CommandButton = () => {
  const { setTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

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
        case 'g' && 'n':
          handleGoLinkedin()
          break
        case 'g' && 'h':
          handleGoGithub()
          break
        case 'g' && 'i':
          handleGoInstagram()
          break
        // case 'g' && 'h':
        //   handleGoHome()
        //   break
        // case 'g' && 'a':
        //   handleGoAbout()
        //   break
        // case 'g' && 'p':
        //   handleGoProjects()
        //   break
        // case 'g' && 'u':
        //   handleGoUses()
        //   break
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
        toast('Link copiado para a área de transferência.', {
          icon: <CheckCircle className='mr-2 h-4 w-4 text-green-500' />,
          description: 'Agora você pode compartilhar!',
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
    window.open('https://github.com/PhMoraiis/philipemorais.tech', '_blank')
    handleCloseCommandBar()
  }

  // const handleGoHome = () => {
  //   router.push('/')
  //   handleCloseCommandBar()
  // }

  // const handleGoAbout = () => {
  //   router.push('/about')
  //   handleCloseCommandBar()
  // }

  // const handleGoProjects = () => {
  //   router.push('/projects')
  //   handleCloseCommandBar()
  // }

  // const handleGoUses = () => {
  //   router.push('/uses')
  //   handleCloseCommandBar()
  // }

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
      toast('Tema claro já selecionado!', {
        icon: <Sun className='mr-2 h-4 w-4 text-yellow-400' />,
        duration: 2000
      })
      handleCloseCommandBar()
    }
    else {
      setTheme('light')
      localStorage.setItem('theme', 'light')
      handleCloseCommandBar()
      toast('Tema claro selecionado!', {
        icon: <Sun className='mr-2 h-4 w-4 text-yellow-400' />,
        description: 'Cuidado com os olhos...',
        duration: 2000
      })
    }
  }

  const handleDarkTheme = () => {
    if (localStorage.getItem('theme') === 'dark') {
      toast('Tema escuro já selecionado!', {
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
      toast('Tema escuro selecionado!', {
        icon: <Moon className='mr-2 h-4 w-4 text-sky-700' />,
        description: 'A escuridão está chegando...',
        duration: 2000,
        style: {
          backgroundColor: '#333',
          color: '#fff',
          border: 'none'
        }
      })
    }
  }

  const handleSystemTheme = () => {
    if (localStorage.getItem('theme') === 'system') {
      toast('Tema do sistema já selecionado!', {
        icon: <Pipette className='mr-2 h-4 w-4 text-violet-500' />,
        duration: 2000,
        style: {
          backgroundColor: '#111',
          color: '#fff',
          border: 'none'
        }
      })
      handleCloseCommandBar()
    }
    else {
      setTheme('system')
      localStorage.setItem('theme', 'system')
      handleCloseCommandBar()
      toast('Tema do sistema selecionado!', {
        icon: <Pipette className="mr-2 h-4 w-4 text-violet-500" />,
        description: 'Deixe que ele decida...',
        duration: 2000,
        style: {
          backgroundColor: '#111',
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

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

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
          <CommandGroup heading="GERAL">
            <CommandItem>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleCopyLink}>
                <Magnetic>
                  <Copy className="mr-2 h-4 w-4" />
                </Magnetic>
                <span className='text-md hover:animate-text-shake'>Copiar Link</span>
              </Button>
              <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>C</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleSendEmail}>
                <Magnetic>
                  <MailOpen className="mr-2 h-4 w-4" />
                </Magnetic>
                <span className='text-md hover:animate-text-shake'>Enviar E-mail</span>
              </Button>
              <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>E</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleViewSource}>
                <Magnetic>
                  <Code className="mr-2 h-4 w-4" />
                </Magnetic>
                <span className='text-md hover:animate-text-shake'>Ver Código</span>
              </Button>
              <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>V</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="REDES SOCIAIS">
            <CommandItem className='flex justify-between'>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleGoLinkedin}>
                <div className='flex'>
                  <Magnetic>
                    <Linkedin className="mr-2 h-4 w-4" />
                  </Magnetic>
                  <span className='text-md hover:animate-text-shake'>LinkedIn</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>G</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>N</CommandShortcut>
              </div>
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
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>G</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>H</CommandShortcut>
              </div>
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
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>G</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>I</CommandShortcut>
              </div>
            </CommandItem>
          </CommandGroup>
          {/* <CommandGroup heading="GO TO">
            <CommandItem className='flex justify-between'>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleGoHome}>
                <div className='flex'>
                  <Magnetic>
                    <Home className="mr-2 h-4 w-4" />
                  </Magnetic>
                  <span className='text-md hover:animate-text-shake'>Home</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>G</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>H</CommandShortcut>
              </div>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleGoAbout}>
                <div className='flex'>
                  <Magnetic>
                    <CircleUser className="mr-2 h-4 w-4" />
                  </Magnetic>
                  <span className='text-md hover:animate-text-shake'>About</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>G</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>A</CommandShortcut>
              </div>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleGoProjects}>
                <div className='flex'>
                  <Magnetic>
                    <Lightbulb className="mr-2 h-4 w-4" />
                  </Magnetic>
                  <span className='text-md hover:animate-text-shake'>Projects</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>G</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>P</CommandShortcut>
              </div>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleGoUses}>
                <div className='flex'>
                  <Magnetic>
                    <Laptop className="mr-2 h-4 w-4" />
                  </Magnetic>
                  <span className='text-md hover:animate-text-shake'>Setup</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>G</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>U</CommandShortcut>
              </div>
            </CommandItem>
          </CommandGroup> */}
          <CommandSeparator />
          <CommandGroup heading="TEMAS">
            <CommandItem className='flex justify-between'>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleLightTheme}>
                <div className='flex'>
                  <Magnetic>
                    <Sun className="mr-2 h-4 w-4" />
                  </Magnetic>
                  <span className='text-md hover:animate-text-shake'>Claro</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>T</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>L</CommandShortcut>
              </div>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleDarkTheme}>
                <div className='flex'>
                  <Magnetic>
                    <Moon className="mr-2 h-4 w-4" />
                  </Magnetic>
                  <span className='text-md hover:animate-text-shake'>Escuro</span>
                </div>
              </Button>
              <div className='flex gap-1'>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>T</CommandShortcut>
                <CommandShortcut className='text-lg px-2 bg-secondary-foreground dark:bg-secondary-foreground rounded-lg'>D</CommandShortcut>
              </div>
            </CommandItem>
            <CommandItem className='flex justify-between'>
              <Button variant="noHover" size="sm" className='m-0 p-0' onClick={handleSystemTheme}>
                <div className='flex'>
                  <Magnetic>
                    <Pipette className="mr-2 h-4 w-4" />
                  </Magnetic>
                  <span className='text-md hover:animate-text-shake'>Sistema</span>
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

export default CommandButton

