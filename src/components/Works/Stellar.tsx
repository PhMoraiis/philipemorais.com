'use client'
import { cn } from '@/lib/utils'
import { Atom, Framer } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Badge } from '../ui/badge'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

type CardProps = React.ComponentProps<typeof Card>

const Works = ({ className, ...props }: CardProps) => {
  const [isHover, setIsHover] = useState(false)
  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMouseLeave = () => {
    setIsHover(false)
  }

  const imageBG = {
    backgroundImage: 'url(/images/Stellar.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: 'none',
    borderRadius: '0.75rem'
  }

  const mobileImageBG = {
    backgroundImage: 'url(/images/StellarMobile.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '0.75rem',
    border: 'none'
  }

  const handleGoStellar = () => {
    window.open('https://stellarti.tech', '_blank')
  }

  return (<>
    <Card className={cn('w-full md:w-full md:h-[330px] lg:w-full lg:h-[380px] h-[550px] shadow-xl rounded-xl cursor-pointer hidden sm:flex', className)} {...props} style={imageBG}
      onClick={handleGoStellar}
    >
      <CardHeader>
        <CardTitle className='text-secondary dark:text-primary'>Stellar</CardTitle>
        <CardDescription className='text-secondary dark:text-primary'>A empresa do futuro! Um site espetacular e criativo para autenticar a marca.</CardDescription>
      </CardHeader>
      <CardFooter className='gap-3'>
        <button className="inline-flex items-center rounded-full border px-3 py-1 gap-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80" onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
          <div className={`rounded-full w-3 h-3 bg-[#00eb4e] mr-2 ${isHover ? 'neon2' : 'neon'} duration-300 ease-in-out`}></div>
          Online
        </button>
        <Badge size="icon"><Atom size={18} />NextJS</Badge>
        <Badge size="icon"><Framer color='#F508AA' size={18} />Framer-Motion</Badge>
      </CardFooter>
    </Card>
    <Card
      className={cn(
        'w-full shadow-xl rounded-xl cursor-pointer',
        'h-[550px]',
        'flex sm:hidden' // Mostrar apenas em dispositivos móveis
      )}
      style={mobileImageBG}
      {...props}
      onClick={handleGoStellar}
    >
      <CardHeader>
        <CardTitle className='text-secondary dark:text-primary'>Stellar</CardTitle>
        <CardDescription className='text-secondary dark:text-primary'>A empresa do futuro! Um site espetacular e criativo para autenticar a marca.</CardDescription>
      </CardHeader>
      <CardFooter className='gap-3 flex-wrap'>
        <button className="inline-flex items-center rounded-full border px-3 py-1 gap-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80" onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
          <div className={`rounded-full w-3 h-3 bg-[#00eb4e] mr-2 ${isHover ? 'neon2' : 'neon'} duration-300 ease-in-out`}></div>
          Online
        </button>
        <Badge size="icon"><Atom size={18} />NextJS</Badge>
        <Badge size="icon"><Framer color='#F508AA' size={18} />Framer-Motion</Badge>
      </CardFooter>
    </Card>
  </>
  )
}

export default dynamic(() => Promise.resolve(Works), { ssr: false })