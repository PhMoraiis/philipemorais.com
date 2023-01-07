import Image from 'next/image';
import Link from 'next/link';

import { FaLinkedinIn, FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa';

import { useForm } from "react-hook-form";

const Contact = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    window.location.href = `mailto:philipemorais.dev@gmail?subject=${data.subject}&body=Olá, meu nome é ${data.name}. ${data.message}Meu e-mail é ${data.email}`
  }

  return (
    <div id='contact' className="w-full lg:h-screen">
      <div className="max-w-[1240px] m-auto px-2 py-16 w-full">
        <p className="text-xl tracking-widest uppercase text-[#4a9b7f]">
          Contato
        </p>
        <h2 className="py-4">Fale Comigo</h2>
        <div className="grid lg:grid-cols-5 gap-8">

          <div className="col-span-3 lg:col-span-2 w-full h-full shadow-xl shadow-gray-400 rounded-xl p-4">
            <div className="lg:p-4 h-full">
              <div>
                <Image
                  src='/images/Image1.png'
                  alt='Imagem do Philipe'
                  width={400}
                  height={400}
                  className='rounded-full hover:scale-105 ease-in duration-300 shadow-xl shadow-gray-400'
                />
              </div>
              <div>
                <h2 className="pt-10">Philipe Morais</h2>
                <p className="text-lg">Desenvolvedor e Estudante de Engenharia de Software</p>
              </div>
              <div>
                <p className="uppercase pt-20 text-[#4a9b7f]">Me encontre nas redes</p>
                <div className="flex items-center justify-between py-4">
                  <Link href="https://www.linkedin.com/in/ph-morais/">
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 hover:text-[#4a9b7f]">
                    <FaLinkedinIn size={20} />
                  </div>
                  </Link>
                  <Link href="https://github.com/PhMoraiis">
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 hover:text-[#4a9b7f]">
                    <FaGithub size={20} />
                  </div>
                  </Link>
                  <Link href="https://www.instagram.com/philipe.dev/">
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 hover:text-[#4a9b7f]">
                    <FaInstagram size={20} />
                  </div>
                  </Link>
                  <Link href="https://www.youtube.com/@philipedev">
                    <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 hover:text-[#4a9b7f]">
                      <FaYoutube size={20} />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>


          <div className='col-span-3 w-full h-auto shadow-xl shadow-gray-400 rounded-xl lg:p-4'>
            <div className="p-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid md:grid-cols-2 gap-4 w-full py-2'>
                  <div className='flex flex-col'>
                    <label className='text-md py-2' htmlFor="">Nome</label>
                    <input {...register('name')} placeholder='Digite o seu Nome' type="text" className='border-2 rounded-lg p-3 flex border-gray-300 placeholder:text-[#4a9b7f]' />
                  </div>
                  <div className='flex flex-col'>
                    <label className='text-md py-2' htmlFor="">Telefone</label>
                    <input {...register('number')} placeholder='Digite seu Número' type="text" className='border-2 rounded-lg p-3 flex border-gray-300 placeholder:text-[#4a9b7f]' />
                  </div>
                </div>
                <div className='flex flex-col py-2'>
                  <label className='text-md py-2' htmlFor="">E-mail</label>
                  <input {...register('email')} placeholder='Digite o seu E-mail' type="email" className='border-2 rounded-lg p-3 flex border-gray-300 placeholder:text-[#4a9b7f]' />
                </div>
                <div className='flex flex-col py-2'>
                  <label className='text-md py-2' htmlFor="">Assunto</label>
                  <input {...register('subject')} placeholder='Digite o Assunto' type="text" className='border-2 rounded-lg p-3 flex border-gray-300 placeholder:text-[#4a9b7f]' />
                </div>
                <div className='flex flex-col py-2'>
                  <label className='text-md py-2' htmlFor="">Mensagem</label>
                  <textarea {...register('message')} placeholder='Digite a sua mensagem' type="text" className='border-2 rounded-lg p-3 border-gray-300 placeholder:text-[#4a9b7f]' rows={10}></textarea>
                </div>
                <button
                  className='w-full p-4 text-gray-100 mt-4'>
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
        <Link href="/">
          <footer className='flex items-center justify-center'>
            <Image
              className='h-30 w-30 rounded-full filter grayscale hover:grayscale-0
            cursor-pointer'
              src="/images/LogoBall.png"
              alt="Logo"
              width={300}
              height={10}
            />
          </footer>
        </Link>
      </div>
    </div>
  );
}

export { Contact };