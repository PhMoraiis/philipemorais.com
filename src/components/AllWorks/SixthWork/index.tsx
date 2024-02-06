import ButtonCard from '../../Button/ButtonCard'
import  { ArrowDownRight } from 'lucide-react'

const SixthWork = () => {
  return (
    <div className="flex items-center justify-center flex-col w-[90vw] h-[60vh] xxl:w-[30vw] xxl:h-[60vh] lg:w-[30vw] lg:h-[60vh] dark:bg-dark-300 glassDescription rounded-xl">
      <div className="dark:text-light-100 text-dark-100 text-left flex items-center justify-center flex-col w-full gap-y-6 px-10 pb-10" >
        <p className='dark:text-light-100 text-dark-100 font-relativeBk'>Se você estiver interessado em saber mais sobre minha jornada, desde o início até agora, e quais são meus planos futuros.</p>
        <span className='dark:text-light-100 text-dark-100 font-relativeBk'>Aqui você encontrará detalhes sobre minhas paixões, experiências e aspirações profissionais.<ArrowDownRight style={{ display: 'inline-block' }} /></span>
      </div>
      <div>
        <ButtonCard href="/" title="Sobre Mim" arrow={true} />
      </div>
    </div >
  )
}

export default SixthWork
