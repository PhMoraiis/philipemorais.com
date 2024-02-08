'use client'

import { useTheme } from 'next-themes'

const FifthWork = () => {
  const { theme, setTheme } = useTheme()

  const backgroundImage = theme === 'dark' ? '/images/Frame17.svg' : '/images/Frame17Light.svg'

  const cardStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% center',
  }

  return (
    <div className="flex items-start justify-start w-[90vw] h-[60vh] xxl:w-[70vw] xxl:h-[60vh] lg:w-[70vw] lg:h-[60vh] rounded-xl" style={cardStyle}>
      <div className="text-dark-100 text-left flex items-center justify-center flex-col w-full lg:p-14 p-8 md:p-14 md:max-w-md gap-y-4 lg:max-w-md max-w-[17rem]">
        <h1 className="font-visageBd lg:text-2xl text-md md:text-2xl">Prazer em Conhecer, pode me chamar de Philipe!</h1>
        <p className="font-relativeBk lg:pt-4 text-sm lg:text-md md:text-lg">Um estudante entusiasmado de Engenharia de Software na Universidade de Brasília, cujo fascínio pela tecnologia remonta à minha infância. No entanto, foi aos 19 anos que dei os primeiros passos sérios nesse campo, quando tive meu primeiro contato com a Linguagem C.</p>
        <p className="font-relativeBk text-sm lg:text-md hidden lg:flex md:flex md:text-lg">Movido pela resolução de problemas - como todo desenvolvedor, encontro satisfação em enfrentar desafios complexos e exigentes, pois é nesses momentos que percebo os maiores aprendizados e avanços em minha jornada.</p>
      </div>
    </div>
  )
}

export default FifthWork
