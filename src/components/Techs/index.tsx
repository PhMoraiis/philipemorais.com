'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'

interface IImageRowProps {
  images: string[]
  isPaused: boolean
  handleMouseEnter: () => void
  handleMouseLeave: () => void
}
// Componente reutilizável para renderizar uma linha de imagens
const ImageRow = ({ images, isPaused, handleMouseEnter, handleMouseLeave }: IImageRowProps) => (
  <div className={`flex-shrink-0 flex items-center justify-around whitespace-nowrap w-full animate-scrollX ${isPaused ? 'paused' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    {images.map((url, index) => (
      <div key={index} className='grid place-items-center largura'>
        <Image src={url} width={100} height={100} alt='' className='w-full h-full rounded-sm aspect-[10/9] py-[5px] px-[20px] object-contain' />
      </div>
    ))}
  </div>
)

const Techs = () => {
  const [isPaused, setIsPaused] = useState(false)

  const row1 = [
    '/images/jee-3.svg',
    '/images/nestjs.svg',
    '/images/next-js.svg',
    '/images/nodejs-icon.svg',
    '/images/react-2.svg',
    '/images/tailwind-css-2.svg',
    '/images/typescript.svg',
  ]

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  return (
    <section className='mt-20'>
      <div className='w-full h-fit flex items-center justify-center flex-col'>
        <div className='flex w-full overflow-hidden mask'>
          {/* Renderizar a primeira linha de imagens */}
          <ImageRow images={row1} isPaused={isPaused} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
          {/* Renderizar a segunda linha de imagens */}
          <ImageRow images={row1} isPaused={isPaused} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
        </div>
      </div>
    </section>
  )
}

export default dynamic(() => Promise.resolve(Techs), { ssr: false })
