'use client'

import Logo from '@/Logo'
import ThemeToggle from '@/ThemeToggle'

import Link from 'next/link'

const Header = () => {
  return (
    <header className="dark:bg-dark-100 bg-light-500">
      <div className='flex justify-around items-center mx-auto p-4 max-w-desktop'>
        <div className=''>
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header