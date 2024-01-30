'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const commentsData = [
  {
    text: 'Sonho em impulsionar a internet em direção à criatividade, acessibilidade e excelência contínua. Estou aqui para fazer da web um lugar melhor a cada linha de código.',
    image: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    text: 'Sonho em impulsionar a internet em direção à criatividade, acessibilidade e excelência contínua. Estou aqui para fazer da web um lugar melhor a cada linha de código.',
    image: 'https://pics.craiyon.com/2023-06-20/89f79a8dee744596981e7417b8a7ea1d.webp'
  },
]

const Project = () => {
  const [currentComment, setCurrentComment] = useState(0)

  const nextComment = () => {
    setCurrentComment((prevIndex) => (prevIndex + 1) % commentsData.length)
  }

  const prevComment = () => {
    setCurrentComment((prevIndex) => (prevIndex - 1 + commentsData.length) % commentsData.length)
  }

  const { text, image } = commentsData[currentComment]

  const cardStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-[90vw] min-h-[60vh] xxl:min-w-[50vw] xxl:min-h-[35vh] lg:min-w-[50vw] lg:min-h-[35vh] dark:bg-dark-300 glassDescription rounded-xl" style={cardStyle}>
      <div className="text-center flex items-start justify-center flex-col w-full gap-y-6 mx-12">
        <div className="mb-2">
          <h1 className='text-left text-palette-300 font-relative lg:max-w-2xl xxl:text-2xl text-md mx-8'>Nossos clientes dizem coisas boas sobre nós!</h1>
          <p className='pt-6 text-left text-light-100 font-relative lg:max-w-2xl xxl:text-3xl lg:text-2xl md:text-md text-lg mx-8'>{text}</p>
        </div>
        <div className="flex items-center justify-between px-8 mt-6 w-full">
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17, bounce: 1 }}
            className="dark:text-light-300 text-palette-300 dark:bg-light-900 border-[1px] border-palette-300 dark:border-none ease-in-out rounded-full px-2 py-2"
            onClick={prevComment}>
            <ChevronLeft size={28} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17, bounce: 1 }}
            className="dark:text-light-300 text-palette-300 dark:bg-light-900 border-[1px] border-palette-300 dark:border-none ease-in-out rounded-full px-2 py-2"
            onClick={nextComment}>
            <ChevronRight size={28} />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Project), { ssr: false })
