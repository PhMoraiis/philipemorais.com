import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 gap-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        defaultPointer: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer',
        ONLINE: 'border-transparent bg-[#00ff5740]/50 text-primary hover:bg-[#00ff5740]/65',
        INTERROMPIDO: 'border-transparent bg-[#1d48e140]/50 text-primary hover:bg-[#1d48e140]/65',
        DESENVOLVIMENTO: 'border-transparent bg-[#b2bd1240]/50 text-primary hover:bg-[#b2bd1240]/65',
      },
      size: {
        default: 'px-2.5 py-0.5',
        icon: 'px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

