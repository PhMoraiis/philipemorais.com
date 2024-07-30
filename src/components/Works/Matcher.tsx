'use client'
import { cn } from '@/lib/utils'
import { Atom, Database, Hexagon, Pyramid } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '../ui/badge'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { useTranslations } from 'next-intl'

type CardProps = React.ComponentProps<typeof Card>

const Works = ({ className, ...props }: CardProps) => {
  const [isHover, setIsHover] = useState(false)
  const t = useTranslations('Projects')
  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMouseLeave = () => {
    setIsHover(false)
  }

  const imageBG = {
    backgroundImage: 'url(/images/Matcher.webp)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: 'none',
    borderRadius: '0.75rem'
  }

  const mobileImageBG = {
    backgroundImage: 'url(/images/MatcherMobile.webp)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '0.75rem',
    border: 'none'
  }

  const handleGoMatcher = () => {
    window.open('https://matchertft.vercel.app', '_blank')
  }

  return (<>
    <Card className={cn('w-full md:w-full md:h-[330px] lg:w-full lg:h-[380px] h-[550px] shadow-xl rounded-xl cursor-pointer hidden sm:flex', className)} {...props} style={imageBG}
      onClick={handleGoMatcher}
    >
      <CardHeader>
        <CardTitle className='text-secondary dark:text-primary'>Matcher</CardTitle>
        <CardDescription className='text-secondary dark:text-primary'>{t('MatcherDescription')}</CardDescription>
      </CardHeader>
      <CardFooter className='gap-3'>
        <button className="inline-flex items-center rounded-full border px-3 py-1 gap-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80" onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
          <div className={`rounded-full w-3 h-3 bg-[#DEFF1C] mr-2 ${isHover ? 'neonStop1' : 'neonStop2'} duration-300 ease-in-out`}></div>
          {t('MatcherStatus')}
        </button>
        <Badge size="icon"><Atom className='text-[#61DAFB]' size={18} />React</Badge>
        <Badge size="icon"><Hexagon color='#94C745' size={18} />NodeJS</Badge>
        <Badge size="icon"><Pyramid color='#0B3B54' size={18} />Prisma</Badge>
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
      onClick={handleGoMatcher}
    >
      <CardHeader>
        <CardTitle className='text-secondary dark:text-primary'>Matcher</CardTitle>
        <CardDescription className='text-secondary dark:text-primary'>{t('MatcherDescription')}</CardDescription>
      </CardHeader>
      <CardFooter className='gap-3 flex-wrap'>
        <button className="inline-flex items-center rounded-full border px-3 py-1 gap-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80" onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
          <div className={`rounded-full w-3 h-3 bg-[#DEFF1C] mr-2 ${isHover ? 'neonStop1' : 'neonStop2'} duration-300 ease-in-out`}></div>
          {t('MatcherStatus')}
        </button>
        <Badge size="icon"><Atom className='text-[#61DAFB]' size={18} />React</Badge>
        <Badge size="icon"><Hexagon color='#94C745' size={18} />NodeJS</Badge>
        <Badge size="icon"><Pyramid color='#0B3B54' size={18} />Prisma</Badge>
        <Badge size="icon"><Database color='#376696' size={18} />PostgreSQL</Badge>
      </CardFooter>
    </Card>
  </>
  )
}

export default Works