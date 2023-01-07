import React from 'react'
import { Experience } from './Experience'

import { motion } from 'framer-motion'


const Experiences = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1.5,
      }}
      className="max-w-[1240px] mx-auto flex flex-col justify-center h-full py-16">
      <p className="text-xl tracking-widest uppercase text-[#4a9b7f]">Experiências</p>
      <h2 className="py-4">Minha Experiência</h2>

      <div className='w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar-track-gray-400/20 scrollbar-thumb-[#4A9B7F]/80 scrollbar-thin'>
        <Experience
          src="https://i.ibb.co/yVT4PN0/Foton-Cert.png"
          alt="Logo Fóton Informática"
          position="Aprendiz"
          company="Fóton Informática S.A."
          srctech="https://cdn.cdnlogo.com/logos/p/66/pipefy.svg"
          srctech2="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
          srctech3="https://cdn.cdnlogo.com/logos/m/35/microsoft-excel.svg"
          alttech="Pipefy Logo"
          alttech2="Google Logo"
          alttech3="Excel Logo"
          begin="Inicio em: 03/2021 - Saída em: 06/2022"
          description="Realizava assistência ao processo de admissão de novos funcionários, mantendo a comunicação concisamente com o novo colaborador e também com os parceiros de equipe sobre o andamento de processo. Atendimentos via telefone e chat, então a comunicação foi algo constante e frequente enquanto estive atuando nessa vaga. Além, claro, da usabilidade e conhecimento dos sistemas utilizados pela empresa, como o Pipefy, para gerenciamento de processos, foi algo que influenciou bastante meu serviço dentro da empresa, pois adquiri um conhecimento da plataforma e pude ajudar minha equipe e outros setores."
        />
        <Experience
          src="https://cdn.cdnlogo.com/logos/g/82/google-search-console.svg"
          alt="Logo Google"
          position="Estagiário"
          company="N.R.M. LTDA"
          srctech="https://i.ibb.co/5k1HT1n/winthor.png"
          srctech2="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
          srctech3="https://cdn.cdnlogo.com/logos/m/35/microsoft-excel.svg"
          alttech="Winthor Logo"
          alttech2="Secullum Logo"
          alttech3="Excel Logo"
          begin="Inicio em: 09/2019 - Saída em: 12/2020"
          description="Ministrava a assistência em vários departamentos dentro da empresa, em alguns deles realizava a assistência a loja em si, fazendo a manutenção dos computadores que eram utilizados para a venda. Em outro setor administrava os processos de precificação e margeamento de produtos, realizava entrada e saída de notas fiscais, sempre mantendo a comunicação com os demais setores da empresa. Com isso pude aprender e conhecer o sistema utilizado pela empresa que era o Whinthor."
        />
        <Experience
          src="https://cdn.cdnlogo.com/logos/g/82/google-search-console.svg"
          alt="Logo Google"
          position="Aprendiz"
          company="N.R.M. LTDA"
          srctech="https://i.ibb.co/5k1HT1n/winthor.png"
          srctech2="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
          srctech3="https://cdn.cdnlogo.com/logos/m/35/microsoft-excel.svg"
          alttech="Winthor Logo"
          alttech2="Secullum Logo"
          alttech3="Excel Logo"
          begin="Inicio em: 09/2017 - Saída em: 09/2019"
          description="Assistia o Departamento Pessoal e Recursos Humanos com o que precisassem, realizando fechamento de folhas de ponto, folhas de pagamento e diversos outros processos dentro do setor, mantendo a comunicação constante com os demais colaboradores dentro e fora do setor. Realizava cadastro de funcionários, pelo sistema da Dexion. Por ele pude aprender todo o processo burocrático por trás de uma admissão de funcionários, com isso obtendo experiência para um emprego que tive posteriormente. Elaborava planilhas e documentos para gestão do setor e também realizava o atendimento de colaboradores, auxiliando-os no que precisassem dentro da empresa."
        />
      </div>
    </motion.div>
  )
}

export { Experiences }