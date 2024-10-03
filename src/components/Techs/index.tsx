'use client'

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import React from 'react'
import { useEffect, useState } from 'react'

interface IImageRowProps {
  images: { url: string, name: string }[]
  isPaused: boolean
  handleMouseEnter: () => void
  handleMouseLeave: () => void
}

const ImageRow = ({ images, isPaused, handleMouseEnter, handleMouseLeave }: IImageRowProps) => {

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div
      className={`flex flex-shrink-0 whitespace-normal justify-around items-center animate-scrollX ${isPaused ? 'paused' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {images.map(({ url, name }, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<div key={index} className='mx-8 md:mx-10 lg:mx-12'>
          <Image src={url} width={100} height={100} alt={`${name}Logo`} className='w-10 h-10' />
        </div>
      ))}
    </div>
  )
}

const BundleRow = ({ images, isPaused, handleMouseEnter, handleMouseLeave }: IImageRowProps) => (
  <>
    <ImageRow images={images} isPaused={isPaused} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
    <ImageRow images={images} isPaused={isPaused} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
  </>
)

const Techs = () => {
  const [isPaused, setIsPaused] = useState(false)
  const { theme, resolvedTheme } = useTheme()

  const rowDark = [
    { url: '/images/ReactDark.svg', name: 'React' },
    { url: '/images/NextDark.svg', name: 'Next.js' },
    { url: '/images/AstroDark.svg', name: 'Astro' },
    { url: '/images/TypescriptDark.svg', name: 'Typescript' },
    { url: '/images/TailwindDark.svg', name: 'Tailwind CSS' },
    { url: '/images/NodeDark.svg', name: 'Node.js' },
    { url: '/images/JavaDark.svg', name: 'Java' },
    { url: '/images/PostgresDark.svg', name: 'PostgreSQL' },
    { url: '/images/FigmaDark.svg', name: 'Figma' }
  ]

  const rowLight = [
    { url: '/images/ReactLight.svg', name: 'React' },
    { url: '/images/NextLight.svg', name: 'Next.js' },
    { url: '/images/AstroLight.svg', name: 'Astro' },
    { url: '/images/TypescriptLight.svg', name: 'Typescript' },
    { url: '/images/TailwindLight.svg', name: 'Tailwind CSS' },
    { url: '/images/NodeLight.svg', name: 'Node.js' },
    { url: '/images/JavaLight.svg', name: 'Java' },
    { url: '/images/PostgresLight.svg', name: 'PostgreSQL' },
    { url: '/images/FigmaLight.svg', name: 'Figma' }
  ]

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  return (
    <motion.section
      className='mt-10 bg-white dark:bg-[#111110] rounded-xl p-10 shadow-sm'>
      <div className='w-full h-fit flex items-center justify-center'>
        <div className='flex w-full overflow-hidden mask'>
          {theme === 'dark' || resolvedTheme === 'dark' ? <BundleRow images={rowDark} isPaused={isPaused} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} /> :
            <BundleRow images={rowLight} isPaused={isPaused} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
          }
        </div>
      </div>
    </motion.section>
  )
}

export default Techs
