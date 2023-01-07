import Image from 'next/image';
import Link from 'next/link';

import projetImg from './../public/images/Pro-jet.png';

import { RiRadioButtonFill } from 'react-icons/ri';

const projet = () => {
  return (
    <div className="w-full">
      <div className="w-screen h-[30vh] lg:h-[40vh] relative">
        <div className="absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] bg-black/80 z-10" />
        <Image
          src={projetImg}
          alt="Imagem do projeto Pro-Jet"
          className="absolute z-1"
          layout="fill"
          objectFit="cover"
        />
        <div className='absolute top-[70%] max-w-[1240px] w-full left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2'>
          <h2 className='py-2'>Pro-Jet</h2>
          <h3>ReactJS</h3>
        </div>
      </div>

      <div className='max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 pt-8'>
        <div className='col-span-4'>
          <p>Projeto</p>
          <h2>Visão geral</h2>
          <p>Pro-Jet é uma aplicação para gerenciamento de projetos de tecnologia. Nele você pode criar, editar, remover do jeito que quiser os seus projetos, tantos pessoais como empresariais. Ele contém um sistema de detecção de valores, evitando que um projeto de valor X, possa ter algo com valor Y maior que X. Podendo assim ser uma solução bastante real para utilizar.</p>
          <Link href='https://pro-jet-phmoraiis.vercel.app/'>
            <button className='px-8 py-2 mt-4 mr-8'>Demo</button>
          </Link>
          <Link href='https://github.com/PhMoraiis/Pro-Jet'>
            <button className='px-8 py-2 mt-4'>Repositório</button>
          </Link>
        </div>
        <div className='col-span-4 md:col-span-1 shadow-xl shadow-gray-400 rounded-xl p-4'>
          <div className='p-2'>
            <p className='text-center font-bold pb-2'>Tecnologias</p>
            <div className='grid grid-cols-3 md:grid-cols-1'>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1'/>ReactJS</p>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1'/>Vite</p>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1'/>JSON-Server</p>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1'/>React-Icons</p>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1'/>React-Router-DOM</p>
            </div>
          </div>
        </div>
        <Link href='/#projects'>
          <p className="underline cursor-pointer">Voltar</p>
        </Link>
      </div>
    </div>
  );
}

export default projet;