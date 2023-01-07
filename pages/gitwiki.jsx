import Image from 'next/image';
import Link from 'next/link';

import wikiImg from './../public/images/GitWiki.png';

import { RiRadioButtonFill } from 'react-icons/ri';

const gitwiki = () => {
  return (
    <div className="w-full">
      <div className="w-screen h-[30vh] lg:h-[40vh] relative">
        <div className="absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] bg-black/80 z-10" />
        <Image
          src={wikiImg}
          alt="Imagem do projeto GitWiki"
          className="absolute z-1"
          layout="fill"
          objectFit="cover"
        />
        <div className='absolute top-[70%] max-w-[1240px] w-full left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2'>
          <h2 className='py-2'>GitWiki</h2>
          <h3>ReactJS</h3>
        </div>
      </div>

      <div className='max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 pt-8'>
        <div className='col-span-4'>
          <p>Projeto</p>
          <h2>Visão geral</h2>
          <p>E para visualizar todos os meus outros projetos, deixo aqui uma idéia bem legal! Esse é o GitWiki. Nele você pode pesquisar repositórios do GitHub, utilizando a url do repositório. Realizei o consumo da API do GitHub, baseado no projeto do Bootcamp Orange Tech +, oferecido pela DIO e a Inter. Fiz alterações no projeto, como por exemplo, a utilização do Vite, que é um gerenciador de pacotes mais rápido que o NPM. E também adicionei ao estilo algumas modificações que achei interessante. Ativar a função para fazer a remoção do repositório e o projeto está totalmente funcional, também foi adicionado a pesquisa de repositórios, a descrição do repositório, a tecnologia utilizada e também o avatar do seu perfil.</p>
          <Link href='https://git-wiki-umber.vercel.app/'>
            <button className='px-8 py-2 mt-4 mr-8'>Demo</button>
          </Link>
          <Link href='https://github.com/PhMoraiis/Bootcamp-Orange-Tech/tree/wiki'>
            <button className='px-8 py-2 mt-4'>Repositório</button>
          </Link>
        </div>
        <div className='col-span-4 md:col-span-1 shadow-xl shadow-gray-400 rounded-xl p-4'>
          <div className='p-2'>
            <p className='text-center font-bold pb-2'>Tecnologias</p>
            <div className='grid grid-cols-3 md:grid-cols-1'>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1' />ReactJS</p>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1' />Axios</p>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1' />Vite</p>
              <p className='text-gray-600 py-2 flex items-center'><RiRadioButtonFill className='pr-1' />Styled-Components</p>
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

export default gitwiki;