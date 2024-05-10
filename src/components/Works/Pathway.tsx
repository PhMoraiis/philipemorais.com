'use client'
import { cn } from '@/lib/utils'
import { Atom, CloudDrizzle, Database, Hexagon } from 'lucide-react'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { Badge } from '../ui/badge'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { useState } from 'react'

type CardProps = React.ComponentProps<typeof Card>

const Works = ({ className, ...props }: CardProps) => {
  const [isHover, setIsHover] = useState(false)
  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMouseLeave = () => {
    setIsHover(false)
  }

  const { theme } = useTheme()
  const isDark = theme === 'dark'


  const imageBG = {
    backgroundImage: `url(${isDark ? '/images/PathwayDark.png' : '/images/PathwayLight.png'})`,
    backgroundSize: 'cover',
    backgroundPosition: '50% 73%',
    border: 'none',
    borderRadius: '0.75rem'
  }

  const mobileImageBG = {
    backgroundImage: `url(${isDark ? '/images/PathwayMobileDark.png' : '/images/PathwayMobileLight.png'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '0.75rem',
    border: 'none'
  }

  const handleGoPathway = () => {
    window.open('https://github.com/PhMoraiis/Pathway.git', '_blank')
  }

  return (<>
    <Card onClick={handleGoPathway} className={cn('w-full md:w-full md:h-[330px] lg:w-full lg:h-[380px] h-[550px] shadow-xl rounded-xl cursor-pointer hidden sm:flex', className)} {...props} style={imageBG}>
      <CardHeader>
        <CardTitle className='text-black dark:text-primary'>Pathway</CardTitle>
        <CardDescription className='text-black dark:text-primary'>App de monitoramento financeiro com definição de metas dinâmicas.</CardDescription>
      </CardHeader>
      <CardFooter className='gap-3'>
        <button className="inline-flex items-center rounded-full border px-3 py-1 gap-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80" onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
          <div className={`rounded-full w-3 h-3 bg-[#4D4DFF] mr-2 ${isHover ? 'neonDev1' : 'neonDev2'} duration-300 ease-in-out`}></div>
          Em Desenvolvimento
        </button>
        <Badge size="icon"><Atom size={18} />NextJS</Badge>
        <Badge size="icon"><Hexagon color='#94C745' size={18} />NodeJS</Badge>
        <Badge size="icon"><CloudDrizzle color='#C7F755' size={18} />Drizzle</Badge>
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
      onClick={handleGoPathway}
    >
      <CardHeader>
        <CardTitle className='text-black dark:text-primary'>Pathway</CardTitle>
        <CardDescription>App de monitoramento financeiro com definição de metas dinâmicas.</CardDescription>
      </CardHeader>
      <CardFooter className='gap-3 flex-wrap'>
        <button className="inline-flex items-center rounded-full border px-3 py-1 gap-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80" onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
          <div className={`rounded-full w-3 h-3 bg-[#4D4DFF] mr-2 ${isHover ? 'neonDev1' : 'neonDev2'} duration-300 ease-in-out`}></div>
          Em Desenvolvimento
        </button>
        <Badge size="icon"><Atom size={18} />NextJS</Badge>
        <Badge size="icon"><Hexagon color='#94C745' size={18} />NodeJS</Badge>
        <Badge size="icon"><CloudDrizzle color='#C7F755' size={18} />Drizzle</Badge>
        <Badge size="icon"><Database color='#376696' size={18} />PostgreSQL</Badge>
      </CardFooter>
    </Card>
  </>
  )
}

export default dynamic(() => Promise.resolve(Works), { ssr: false })