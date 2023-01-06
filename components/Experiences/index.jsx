import React from 'react'
import { Experience } from './Experience'


const Experiences = () => {
  return (
    <div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full">
      <p className="text-xl tracking-widest uppercase text-[#4a9b7f]">Experiências</p>
      <h2 className="py-4">Minhas Experiências</h2>

      <div className='w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#4A9B7F]/80'>
        <Experience
          src="https://i.ibb.co/jV4mt4D/F-ton.png"
          alt="Logo Fóton Informática"
          position="Aprendiz"
          company="Fóton Informática S.A."
          srctech="https://cdn.cdnlogo.com/logos/p/66/pipefy.svg"
          srctech2="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
          srctech3="https://cdn.cdnlogo.com/logos/m/35/microsoft-excel.svg"
          alttech="Pipefy Logo"
          alttech2="Google Logo"
          alttech3="Excel Logo"
        />
        <Experience
          src="https://cdn.cdnlogo.com/logos/g/82/google-search-console.svg"
          alt="Logo Google"
          position="Estagiário"
          company="N.R.M. LTDA"
          srctech="https://i.ibb.co/5k1HT1n/winthor.png"
          srctech2="https://i.ibb.co/BGMN01H/secullum.png"
          srctech3="https://cdn.cdnlogo.com/logos/m/35/microsoft-excel.svg"
          alttech="Winthor Logo"
          alttech2="Secullum Logo"
          alttech3="Excel Logo"
        />
        <Experience
          src="https://cdn.cdnlogo.com/logos/g/82/google-search-console.svg"
          alt="Logo Google"
          position="Aprendiz"
          company="N.R.M. LTDA"
          srctech="https://i.ibb.co/5k1HT1n/winthor.png"
          srctech2="https://i.ibb.co/BGMN01H/secullum.png"
          srctech3="https://cdn.cdnlogo.com/logos/m/35/microsoft-excel.svg"
          alttech="Winthor Logo"
          alttech2="Secullum Logo"
          alttech3="Excel Logo"
        />
      </div>
    </div>
  )
}

export { Experiences }