import Image from 'next/image';
import Link from 'next/link';

import portfImg from './../public/images/Portfolio.png';

import { RiRadioButtonFill } from 'react-icons/ri';

const portfolio = () => {
  return (
    <div className="w-full">
      <div className="w-screen h-[30vh] lg:h-[40vh] relative">
        <div className="absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] bg-black/80 z-10" />
        <Image
          src={portfImg}
          alt="Imagem do projeto Portfolio NextJS"
          className="absolute z-1"
          layout="fill"
          objectFit="cover"
        />
        <div className='absolute top-[70%] max-w-[1240px] w-full left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2'>
          <h2 className='py-2'>Portfólio NextJS</h2>
          <h3>NextJS - TailwindCSS</h3>
        </div>
      </div>

      <div className='max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 pt-8'>
        <div className='col-span-4'>
          <p>Projeto</p>
          <h2>Visão geral</h2>
          <p>O meu portfólio é um exemplo claro do que posso criar e também trabalhar com diversas tecnologias, a primeiro momento não foi utilizado Typescript, porém pretendo em breve refatorar e migrar para utilizar da tecnologia, irá também servir como aprendizado. Foi um grande desafio realizar esse projeto, passando horas e horas em frente ao computador, tentando fazer dar certo, e sei que o esforço valeu a pena!</p>
          <Link href='/'>
            <button className='px-8 py-2 mt-4 mr-8'>Demo</button>
          </Link>
          <Link href='https://github.com/PhMoraiis/PortfolioNextJS'>
            <button className='px-8 py-2 mt-4'>Repositório</button>
          </Link>
          <Link href='/#projects'>
            <p className="underline cursor-pointer mt-20">Voltar</p>
          </Link>
        </div>
        <div className='col-span-4 md:col-span-1 shadow-xl shadow-gray-400 rounded-xl p-4'>
          <div className='p-2'>
            <p className='text-center font-bold pb-2'>Tecnologias</p>
            <div className='grid grid-cols-3 md:grid-cols-1'>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1' />NextJS</p>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1' />ReactJS</p>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1' />Tailwind CSS</p>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1' />Tailwind-Scrollbar</p>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1' />Framer-Motion</p>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1' />React-Icons</p>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1' />React-Simple-TypeWriter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default portfolio;