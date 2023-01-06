import React from 'react';
import { Project } from './Project';

const Projects = () => {
  return (
    <div id='projects' className='w-full'>
      <div className='max-w-[1240px] mx-auto px-2 py-16'>
        <p className='text-xl tracking-widest uppercase text-[#4a9b7f]'>Projetos</p>
        <h2 className='py-4'>Projetos Recentes</h2>
        <div className='grid md:grid-cols-2 gap-8'>
          <Project />
          <Project />
          <Project />
          <Project />
        </div>
      </div>
    </div>
  );
}

export { Projects }