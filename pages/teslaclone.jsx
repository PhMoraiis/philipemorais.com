import Image from 'next/image';
import Link from 'next/link';

import teslaImg from './../public/images/Clone.png';

import { RiRadioButtonFill } from 'react-icons/ri';

const teslaclone = () => {
  return (
    <div className="w-full">
      <div className="w-screen h-[30vh] lg:h-[40vh] relative">
        <div className="absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] bg-black/80 z-10" />
        <Image
          src={teslaImg}
          alt="Imagem do projeto Tesla Clone"
          className="absolute z-1"
          layout="fill"
          objectFit="cover"
        />
        <div className='absolute top-[70%] max-w-[1240px] w-full left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2'>
          <h2 className='py-2'>Tesla Clone - Riot LOL</h2>
          <h3>ReactJS - Typescript</h3>
        </div>
      </div>

      <div className='max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 pt-8'>
        <div className='col-span-4'>
          <p>Projeto</p>
          <h2>Visão geral</h2>
          <p>Esse projeto serviu para aumentar ainda mais o conhecimento sobre o conceito de Mobile First, React Hooks, Context Hook, o próprio React e o TypeScript. Nele foi feito a página principal da Tesla, efeitos de scroll e CSS. A alteração para os campeões do LOL foi feita por mim, para que ficasse algo diferente de ser visto e mostrado. Porém ainda utiliza as animações da página exemplo.</p>
          <Link href='https://tesla-riot.vercel.app/'>
            <button className='px-8 py-2 mt-4 mr-8'>Demo</button>
          </Link>
          <Link href='https://github.com/PhMoraiis/UICloneReact'>
            <button className='px-8 py-2 mt-4'>Repositório</button>
          </Link>
        </div>
        <div className='col-span-4 md:col-span-1 shadow-xl shadow-gray-400 rounded-xl p-4'>
          <div className='p-2'>
            <p className='text-center font-bold pb-2'>Tecnologias</p>
            <div className='grid grid-cols-3 md:grid-cols-1'>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1'/>ReactJS</p>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1'/>Typescript</p>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1'/>Styled-Components</p>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1'/>Framer-Motion</p>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1'/>ContextAPI</p>
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

export default teslaclone;