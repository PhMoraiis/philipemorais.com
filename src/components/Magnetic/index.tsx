'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const Magnetic = ({ children }: any) => {

  const ref = useRef<HTMLDivElement | null>(null) // Specify the type of ref
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const mouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const currentRef = ref.current
    if (currentRef) {
      const { width, height, left, top } = currentRef.getBoundingClientRect() // Check if ref.current is not null
      const x = clientX - left - width / 2
      const y = clientY - top - height / 2
      setPosition({ x, y })
    }
  }

  const mouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position

  return (
    <motion.div
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
      ref={ref}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

export default Magnetic