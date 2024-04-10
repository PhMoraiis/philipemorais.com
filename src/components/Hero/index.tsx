'use client'

import { useRouter } from 'next/navigation'

const Hero = () => {
  const router = useRouter()

  const handleContact = () => {
    router.push('/contact')
  }

  return (
    <section className="mt-14 lg:flex lg:items-end lg:justify-between">
      <div className="flex flex-col items-start gap-4 lg:gap-6">
        <div className="max-w-md lg:max-w-lg">
          <h1 className="text-[2.8rem] leading-none font-Relative lg:text-7xl">I&apos;m Philipe</h1>
          <span className="text-4xl leading-none font-Relative lg:text-5xl"> - Frontend Developer & UX/UI Designer</span>
        </div>
        <p className="max-w-md font-RelativeBk lg:max-w-lg">Currently working at Young Platform helping to concept and design amazing products, simple, beautiful and easy to use for buying and selling Crypto.</p>
      </div>
      <div className="flex flex-col items-start my-8 lg:m-0">
        <span className="font-RelativeBk text-gray-400 ml-1 mb-1">Available for:</span>
        <button className="border border-input bg-background rounded-2xl h-9 px-3 py-2 inline-flex items-center cursor-pointer font-Relative" onClick={handleContact}>
          <div className='rounded-full w-3 h-3 bg-[#00eb4e] mr-2 neon duration-300 ease-in-out'></div>
          Contact
        </button>
      </div>
    </section>
  )
}

export default Hero