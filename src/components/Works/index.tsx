'use client'
import { cn } from '@/lib/utils'
import { Atom } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Badge } from '../ui/badge'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

type CardProps = React.ComponentProps<typeof Card>

const Works = ({ className, ...props }: CardProps) => {

  const imageBG = {
    backgroundImage: 'url(/images/Frame16.svg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: 'none',
    borderRadius: '0.75rem'
  }

  return (
    <Card className={cn('w-full md:w-full md:h-[330px] lg:w-full lg:h-[380px] h-[550px] shadow-xl rounded-xl cursor-pointer', className)} {...props} style={imageBG}>
      <CardHeader>
        <CardTitle>Pathway</CardTitle>
        <CardDescription>May 30, 2023</CardDescription>
      </CardHeader>
      <CardFooter className='gap-3'>
        <Badge size="icon"><Atom size={18} />React</Badge>
        <Badge size="icon"><Atom size={18} />React</Badge>
      </CardFooter>
    </Card>
  )
}

export default dynamic(() => Promise.resolve(Works), { ssr: false })