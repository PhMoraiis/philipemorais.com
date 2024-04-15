'use client'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

type CardProps = React.ComponentProps<typeof Card>

const Works = ({ className, ...props }: CardProps) => {

  const imageBG = {
    backgroundImage: 'url(/images/test.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <Card className={cn('w-[380px] md:w-[300px] lg:w-[320px] h-[460px] shadow-xl', className)} {...props} style={imageBG}>
      <CardHeader>
        <CardTitle>Pathway</CardTitle>
        <CardDescription>May 30, 2023</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md p-4">
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  )
}

export default dynamic(() => Promise.resolve(Works), { ssr: false })