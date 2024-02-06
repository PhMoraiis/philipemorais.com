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
      <div className="text-dark-100 text-left flex items-center justify-center flex-col w-full p-14 gap-y-4 max-w-md">
        <h1 className="font-visageBd text-2xl">Prazer em Conhecer, pode me chamar de Philipe!</h1>
        <p className="font-relativeBk pt-4">Um estudante entusiasmado de Engenharia de Software na Universidade de Brasília, cujo fascínio pela tecnologia remonta à minha infância. No entanto, foi aos 19 anos que dei os primeiros passos sérios nesse campo, quando tive meu primeiro contato com a Linguagem C.</p>
        <p className="font-relativeBk">Movido pela resolução de problemas - como todo desenvolvedor, encontro satisfação em enfrentar desafios complexos e exigentes, pois é nesses momentos que percebo os maiores aprendizados e avanços em minha jornada.</p>
      </div>
    </div>
  )
}

export default FifthWork
