'use client'

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'

interface IImageRowProps {
  images: { url: string, name: string }[]
  isPaused: boolean
  handleMouseEnter: () => void
  handleMouseLeave: () => void
}

// Componente reutilizável para renderizar uma linha de imagens
const ImageRow = ({ images, isPaused, handleMouseEnter, handleMouseLeave }: IImageRowProps) => {
  return (
    <div
      className={`flex flex-shrink-0 whitespace-normal justify-around items-center animate-scrollX ${isPaused ? 'paused' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {images.map(({ url, name }, index) => (
        <div key={index} className='mx-8 md:mx-10 lg:mx-12'>
          <Image src={url} width={100} height={100} alt={name + 'Logo'} className='w-10 h-10' />
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
    { url: '/images/PostgresDark.svg', name: 'PostgreSQL' }
  ]

  const rowLight = [
    { url: '/images/ReactLight.svg', name: 'React' },
    { url: '/images/NextLight.svg', name: 'Next.js' },
    { url: '/images/AstroLight.svg', name: 'Astro' },
    { url: '/images/TypescriptLight.svg', name: 'Typescript' },
    { url: '/images/TailwindLight.svg', name: 'Tailwind CSS' },
    { url: '/images/NodeLight.svg', name: 'Node.js' },
    { url: '/images/JavaLight.svg', name: 'Java' },
    { url: '/images/PostgresLight.svg', name: 'PostgreSQL' }
  ]

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  /*   const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const backgroundDark = useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(38, 38, 38, 0.4), transparent 80%)` */

  return (
    <motion.section
      /* onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect()

        mouseX.set(e.clientX - left)
        mouseY.set(e.clientY - top)
      }} */
      /* style={{ background: theme === 'dark' || resolvedTheme === 'dark' ? backgroundDark : '' }} */
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

export default dynamic(() => Promise.resolve(Techs), { ssr: false })
