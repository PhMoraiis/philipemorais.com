// Slider.js
import { motion } from 'framer-motion'
import WorkingCard from '../WorkingCard'
import { useState, useEffect, useRef } from 'react'

const Slider = () => {
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLElement>()

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
  }, [])

  return (
    <motion.div
      className="flex overflow-hidden gap-12 absolute"
      drag="x"
      whileTap={{ cursor: 'grabbing' }}
      dragConstraints={{ left: 0, right: -width }}
      dragSnapToOrigin
    >
      {[...Array(6)].map((_, index) => (
        <WorkingCard key={index} />
      ))}
    </motion.div>
  )
}

export default Slider
