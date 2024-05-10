'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

const Hero = () => {
  const [isHover, setIsHover] = useState(false)

  const handleContact = () => {
    window.open('mailto:philipe_m@icloud.com')
  }

  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMouseLeave = () => {
    setIsHover(false)
  }

  // const mouseX = useMotionValue(0)
  // const mouseY = useMotionValue(0)
  // const backgroundDark = useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(38, 38, 38, 0.4), transparent 80%)`

  return (
    <section
      className='bg-white dark:bg-[#111110] rounded-xl p-10 shadow-sm'
      /* onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect()

        mouseX.set(e.clientX - left)
        mouseY.set(e.clientY - top)
      }}
      style={{ background: theme === 'dark' || resolvedTheme === 'dark' ? backgroundDark : '' }}> */>
      <div className="mt-20 md:flex md:items-end md:justify-between lg:flex lg:items-end lg:justify-between">
        <div className="flex flex-col items-start gap-4 md:gap-6 md:max-w-sm lg:gap-6 lg:max-w-lg">
          <div className="max-w-xs lg:max-w-md">
            <h1 className="text-[2.8rem] leading-none font-Relative md:text-5xl lg:text-6xl">Eu sou Philipe</h1>
            <span className="text-[2.8rem] leading-none font-Relative md:text-5xl lg:text-6xl"> - Frontend Developer & UX/UI Designer</span>
          </div>
          <p className="max-w-md font-RelativeBk lg:max-w-lg lg:text-lg">Criador de soluções inovadoras, criativas e centradas no usuário. Acredito que a tecnologia pode melhorar vidas e inspirar pessoas.</p>
        </div>
        <div
          className="flex flex-col items-start my-12 md:m-0 lg:m-0">
          <span className="font-RelativeBk text-gray-400 mb-1 lg:text-lg animate-shine bg-[linear-gradient(110deg,#939393,45%,#1e2631,55%,#939393)] bg-[length:200%_100%] text-transparent bg-clip-text">Disponível para trabalho:</span>
          <button className="border border-input bg-background rounded-2xl h-9 px-3 py-2 inline-flex items-center cursor-pointer font-Relative" onClick={handleContact} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
            <div className={`rounded-full w-3 h-3 bg-[#00eb4e] mr-2 ${isHover ? 'neon2' : 'neon'} duration-300 ease-in-out`}></div>
            Contato
          </button>
        </div>
      </div>
    </section >
  )
}

export default dynamic(() => Promise.resolve(Hero), { ssr: false })
