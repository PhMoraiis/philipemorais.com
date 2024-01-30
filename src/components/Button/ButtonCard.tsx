import { ArrowRight } from 'lucide-react'
import type { IButtonProps } from '../../types/ButtonProps'

const ButtonCard = ({ href, title, arrow }: IButtonProps) => {
  return (
    <a href={href} className="flex items-center justify-center lg:text-xl text-md font-relativeBd uppercase py-2 px-4 rounded-md dark:border-none dark:text-light-300 text-dark-100 dark:bg-light-900 border-[1px] border-palette-300 hover:text-dark-100 dark:hover:text-dark-100 hover:bg-light-400 dark:hover:bg-light-100 ease-in duration-300">
      {title}
      {arrow && <ArrowRight className="ml-2" size={20} />}
    </a>
  )
}

export default ButtonCard