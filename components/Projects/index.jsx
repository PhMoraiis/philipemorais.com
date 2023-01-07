import React from 'react';
import { Project } from './Project';

import { motion } from 'framer-motion';

const Projects = () => {
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
      id='projects' className='w-full'>
      <div className='max-w-[1240px] mx-auto px-2 py-16'>
        <p className='text-xl tracking-widest uppercase text-[#4a9b7f]'>Projetos</p>
        <h2 className='py-4'>Meus Projetos Recentes</h2>
        <div className='grid md:grid-cols-2 gap-8'>
          <Project
            src="https://i.ibb.co/mSqHCfB/Pro-Jet.jpg"
            alt="Imagem do Projeto - Pro-Jet"
            name="Pro-Jet"
            techs="ReactJS - Vite"
            projectUrl='/projet'
          />
          <Project
            src="https://i.ibb.co/bgH3G6S/Portfolio.jpg"
            alt="Imagem do Projeto - Portfólio NextJS"
            name="Portfólio NextJS"
            techs="NextJS - TailwindCSS"
            projectUrl='/portfolio'
          />
          <Project
            src="https://i.ibb.co/d5phcQN/Project-Finish.jpg"
            alt="Imagem do Projeto Tesla - Riot LOL Clone"
            name="Tesla Clone - Riot LOL"
            techs="ReactJS - Typescript"
            projectUrl='/teslaclone'
          />
          <Project
            src="https://i.ibb.co/P5wqQ52/GitWiki.jpg"
            alt="Imagem do Projeto - GitWiki"
            name="GitWiki"
            techs="ReactJS - Vite"
            projectUrl='/gitwiki'
          />
        </div>
      </div>
    </motion.div>
  );
}

export { Projects }