import { ArrowRight } from 'lucide-react'
import type { IButtonProps } from '../../types/ButtonProps'

const Button = ({ href, title, arrow }: IButtonProps) => {
  return (
    <a href={href} className="flex items-center justify-center lg:text-lg text-md font-relativeBd uppercase p-2 rounded-md dark:text-dark-100 text-dark-100 dark:bg-light-100 border-[1px] border-palette-300 duration-300 ease-in">
      {title}
      {arrow && <ArrowRight className="ml-2" size={20} />}
    </a>
  )
}

export default Button