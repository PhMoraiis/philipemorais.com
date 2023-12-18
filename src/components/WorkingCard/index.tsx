'use client'

import Image from 'next/image'
import { motion, useTransform, useMotionValue } from 'framer-motion'
import { useCallback, useEffect } from 'react'
import Link from 'next/link'

const ParallaxImage = () => {
  const offsetY = useMotionValue(0)

  const handleScroll = useCallback(() => {
    offsetY.set(window.scrollY)
  }, [offsetY])

  useEffect(() => {
    const handleScroll = () => {
      offsetY.set(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [offsetY, handleScroll])

  const imageOffsetX = useTransform(offsetY, [0, window.innerHeight], [0, 100]) // Ajuste os valores conforme necessário

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'tween', stiffness: 150, damping: 17, bounce: 1 }}
      whileTap={{ scale: 0.95 }}
      className="relative h-[35rem] w-[25rem] overflow-hidden rounded-lg shadow-lg pointer-events-none">
      <Link href={'/'}>
        <Image
          src="/images/724388.jpg"
          layout="fill"
          objectFit="cover"
          alt="Background Image"
          className="absolute inset-0"
        />

        <motion.div 
          style={{
            x: imageOffsetX,
          }}
          className="absolute top-4 left-4 z-10">
          <Image src="/icons/dark-icon.png" width={90} height={90} alt="Logo" />
        </motion.div>

        <motion.div 
          style={{
            x: imageOffsetX,
          }}
          transition={{ type: 'spring', stiffness: 50 }}
          className="relative flex flex-col items-start justify-end h-full w-full text-white z-10">
          <div className="mt-auto">
            <Image src="/images/download.png" width={1000} height={1000} alt="Card Text" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default ParallaxImage