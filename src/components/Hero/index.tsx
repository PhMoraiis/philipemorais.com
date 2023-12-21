'use client'

import dynamic from 'next/dynamic'
import IconLinks from '../IconLinks'

const Hero = () => {

  return (
    <section className='relative flex flex-col items-center justify-center min-h-desktop max-w-desktop mx-auto text-dark-100 dark:text-light-200 glass bg-hero rounded-xl'>
      <div className="flex flex-col gap-y-6 items-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-[7rem] leading-none font-visageBd max-w-6xl text-center">PHILIPE MORAIS</h1>
          <h2 className="text-6xl font-visage max-w-3xl text-center">DESENVOLVEDOR FRONT-END E UX/UI DESIGNER</h2>
          <p className='pt-6 text-center font-coolveticaLt max-w-2xl text-2xl'>Sonho em impulsionar a internet em direção à criatividade, acessibilidade e excelência contínua. Estou aqui para fazer da web um lugar melhor a cada linha de código.</p>
        </div>
        <IconLinks />
      </div>
    </section>
  ) 
}

export default dynamic(() => Promise.resolve(Hero), { ssr: false })

