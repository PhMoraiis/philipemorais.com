import {
  Check,
  Command,
  Copy,
  Github,
  LayoutDashboard,
  Linkedin,
  Moon,
  Palette,
  Phone,
  Settings,
  Sun,
  User
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { LogoBlack, LogoWhite } from '../Logos'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'


const LogoDropdown = () => {
  const { theme, setTheme } = useTheme()
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {theme === 'dark' ? <button><LogoWhite /></button> : <button><LogoBlack /></button>}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sections</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>About Me</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Projects</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Skills</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Phone className="mr-2 h-4 w-4" />
            <span>Contact</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Socials</DropdownMenuLabel>
          <DropdownMenuItem>
            <Linkedin className="mr-2 h-4 w-4" />
            <span>LinkedIn</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyEmail}>
            {emailCopied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
            <span>Copy Email</span>
            <DropdownMenuShortcut className='flex items-center text-lg'><Command size={18} />+E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              {theme === 'dark' ? <Moon className="mr-2 h-4 w-4" /> : (theme === 'system' ? <Palette className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />)}
              <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme(theme === '' ? 'dark' : 'dark')}>
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme(theme === '' ? 'light' : 'light')}>
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme(theme === '' ? 'system' : 'system')}>
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LogoDropdown