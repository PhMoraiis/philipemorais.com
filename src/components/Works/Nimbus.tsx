'use client'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { Badge } from '../ui/badge'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { useState } from 'react'
import { Rocket, Coffee, Database, Flower } from 'lucide-react'

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
    backgroundImage: 'url(/images/Nimbus.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: 'none',
    borderRadius: '0.75rem'
  }

  const mobileImageBG = {
    backgroundImage: 'url(/images/NimbusMobile.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '0.75rem',
    border: 'none'
  }

  const handleGoNimbus = () => {
    window.open('https://github.com/PhMoraiis/Nimbus', '_blank')
  }

  return (<>
    <Card onClick={handleGoNimbus} className={cn('w-full md:w-full md:h-[330px] lg:w-full lg:h-[380px] h-[550px] shadow-xl rounded-xl cursor-pointer hidden sm:flex', className)} {...props} style={imageBG}>
      <CardHeader>
        <CardTitle className='text-secondary'>Nimbus</CardTitle>
        <CardDescription className='text-secondary'>Uma plataforma completa de gestão de corretoras e seguradoras de planos.</CardDescription>
      </CardHeader>
      <CardFooter className='gap-3'>
        <button className="inline-flex items-center rounded-full border px-3 py-1 gap-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80" onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
          <div className={`rounded-full w-3 h-3 bg-[#4D4DFF] mr-2 ${isHover ? 'neonDev1' : 'neonDev2'} duration-300 ease-in-out`}></div>
          Em Desenvolvimento
        </button>
        <Badge size="icon"><Rocket color='#FF6208' size={18} />Astro</Badge>
        <Badge size="icon"><Coffee color='#EC282C' size={18} />Java / Kotlin</Badge>
        <Badge size="icon"><Flower color='#71B544' size={18} />Spring</Badge>
        <Badge size="icon"><Database color='#376696' size={18} />PostgreSQL</Badge>
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
      onClick={handleGoNimbus}
    >
      <CardHeader>
        <CardTitle className='text-secondary dark:text-primary'>Nimbus</CardTitle>
        <CardDescription className='text-secondary dark:text-primary'>Uma plataforma completa de gestão de corretoras e seguradoras de planos.</CardDescription>
      </CardHeader>
      <CardFooter className='gap-3 flex-wrap'>
        <button className="inline-flex items-center rounded-full border px-3 py-1 gap-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80" onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
          <div className={`rounded-full w-3 h-3 bg-[#4D4DFF] mr-2 ${isHover ? 'neonDev1' : 'neonDev2'} duration-300 ease-in-out`}></div>
          Em Desenvolvimento
        </button>
        <Badge size="icon"><Rocket color='#FF6208' size={18} />Astro</Badge>
        <Badge size="icon"><Coffee color='#EC282C' size={18} />Java / Kotlin</Badge>
        <Badge size="icon"><Flower color='#71B544' size={18} />Spring</Badge>
        <Badge size="icon"><Database color='#376696' size={18} />PostgreSQL</Badge>
      </CardFooter>
    </Card>
  </>
  )
}

export default dynamic(() => Promise.resolve(Works), { ssr: false })