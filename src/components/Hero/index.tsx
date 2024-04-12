'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const Hero = () => {
  const router = useRouter()

  const handleContact = () => {
    router.push('/contact')
  }


  return (
    <section className='bg-white dark:bg-[#303030] rounded-3xl p-10'>
      <div className="mt-20 md:flex md:items-end md:justify-between lg:flex lg:items-end lg:justify-between">
        <div className="flex flex-col items-start gap-4 md:gap-6 md:max-w-sm lg:gap-6 lg:max-w-lg">
          <div className="max-w-xs lg:max-w-md">
            <h1 className="text-[2.8rem] leading-none font-Relative md:text-5xl lg:text-6xl">I&apos;m Philipe</h1>
            <span className="text-[2.8rem] leading-none font-Relative md:text-5xl lg:text-6xl"> - Frontend Developer & UX/UI Designer</span>
          </div>
          <p className="max-w-md font-RelativeBk lg:max-w-lg lg:text-lg">Currently working at Young Platform helping to concept and design amazing products, simple, beautiful and easy to use for buying and selling Crypto.</p>
        </div>
        <motion.div
          className="flex flex-col items-start my-12 md:m-0 lg:m-0">
          <span className="font-RelativeBk text-gray-400 ml-1 mb-1 lg:text-lg animate-shine bg-[linear-gradient(110deg,#939393,45%,#1e2631,55%,#939393)] bg-[length:200%_100%] text-transparent bg-clip-text">Available for
          </span>
          <button className="border border-input bg-background rounded-2xl h-9 px-3 py-2 inline-flex items-center cursor-pointer font-Relative" onClick={handleContact}>
            <div className='rounded-full w-3 h-3 bg-[#00eb4e] mr-2 neon duration-300 ease-in-out'></div>
            Contact
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default dynamic(() => Promise.resolve(Hero), { ssr: false })