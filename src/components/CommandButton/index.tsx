'use client'

import { motion } from 'framer-motion'
import {
  Command
} from 'lucide-react'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { Button } from '../ui/button'

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList
} from '@/components/ui/command'

import { Dialog, DialogTrigger } from '../ui/dialog'

import React, { useEffect, useState } from 'react'

const CommandButton = () => {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = React.useState(false)

  const [emailCopied, setEmailCopied] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'e') {
        handleCopyEmail()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('liperapltda@gmail.com')
      .then(() => {
        console.log('Email copied to clipboard')
        setEmailCopied(true)
        setTimeout(() => {
          setEmailCopied(false)
        }, 2000)
      })
      .catch((error) => console.error('Error copying email: ', error))
  }

  const onClickButton = () => {
    setOpen((open) => !open)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      transition={{ type: 'spring', stiffness: 150, damping: 17, bounce: 1 }}
      className='flex justify-between'>
      <Dialog>
        <DialogTrigger>
          <Button onClick={onClickButton} variant='noHover' size='icon'>
            <Command size={26} />
          </Button>
        </DialogTrigger>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
          </CommandList>
        </CommandDialog>

      </Dialog>
    </motion.div >
  )
}

export default dynamic(() => Promise.resolve(CommandButton), { ssr: false })

