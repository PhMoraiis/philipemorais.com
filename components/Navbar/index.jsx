import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaLinkedinIn, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";

import { motion } from "framer-motion";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navBg, setNavBg] = useState('#ecf0f3');
  const [linkColor, setLinkColor] = useState('#1f2937');

  const router = useRouter();

  useEffect(() => {
    if (
      router.asPath === '/projet' ||
      router.asPath === '/portfolio' ||
      router.asPath === '/teslaclone' ||
      router.asPath === '/gitwiki'
    ) {
      setNavBg('transparent');
      setLinkColor('#ecf0f3');
    } else {
      setNavBg('#ecf0f3');
      setLinkColor('#1f2937');
    }
  }, [router])

  const handleNav = () => {
    setNav(!nav);
  }

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    }
    window.addEventListener('scroll', handleShadow);
  }, [])

  return (
    <motion.nav
      initial={{
        x: -100,
        opacity: 0,
        scale: 0.5
      }}
      animate={{
        x: 0,
        opacity: 1,
        scale: 1
      }}
      transition={{
        duration: 1.5,
      }}
      style={{ backgroundColor: `${navBg}` }} className={shadow ? 'fixed w-full h-20 shadow-xl z-[100]' : 'fixed w-full h-20 z-[100]'}>
      <div className="flex justify-between items-center w-full h-full px-10 2xl:px-16">
        <Link href='/'>
          <Image
            src={'/images/Logo.png'}
            alt={'Logo escrita Philipe Morais'}
            width={300}
            height={50}
            className='cursor-pointer hover:scale-110 ease-in duration-300'
          />
        </Link>
        <div>
          <ul style={{ color: `${linkColor}` }} className="hidden md:flex">
            <Link href='/'>
              <li className="ml-10 text-sm uppercase hover:text-[#4a9b7f] duration-300">Home</li>
            </Link>
            <Link href='/#about'>
              <li className="ml-10 text-sm uppercase hover:text-[#4a9b7f] duration-300">Sobre</li>
            </Link>
            <Link href='/#skills'>
              <li className="ml-10 text-sm uppercase hover:text-[#4a9b7f] duration-300">Habilidades</li>
            </Link>
            <Link href='/#projects'>
              <li className="ml-10 text-sm uppercase hover:text-[#4a9b7f] duration-300">Projetos</li>
            </Link>
          </ul>
          <div onClick={handleNav} className="md:hidden cursor-pointer">
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>

      <div className={nav ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70' : ''}>
        <div className={
          nav
            ? 'md:hidden fixed left-0 top-0 w-[75] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500'
            : 'fixed left-[-100%] top-0 p-10 ease-in duration-500'}>
          <div>
            <div className="flex w-full items-center justify-between">
              <Link href='/'>
                <Image
                  src='/images/LogoCompleta.png'
                  alt='Logo escrita Philipe Morais'
                  width={170}
                  height={10}
                  onClick={() => setNav(false)}
                  className="cursor-pointer hover:scale-110 ease-in duration-300"
                />
              </Link>
              <div onClick={handleNav} className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer">
                <AiOutlineClose />
              </div>
            </div>
            <div className="border-b border-gray-300">
            </div>
          </div>
          <div className="py-10 flex flex-col">
            <ul className="uppercase">
              <Link href='/'>
                <li onClick={() => setNav(false)} className="py-4 text-sm">Home</li>
              </Link>
              <Link href='/#about'>
                <li onClick={() => setNav(false)} className="py-4 text-sm">Sobre</li>
              </Link>
              <Link href='/#skills'>
                <li onClick={() => setNav(false)} className="py-4 text-sm">Habilidades</li>
              </Link>
              <Link href='/#projects'>
                <li onClick={() => setNav(false)} className="py-4 text-sm">Projetos</li>
              </Link>
            </ul>
            <div className="pt-10">
              <p className="uppercase tracking-widest text-[#4a9b7f]">Vamos nos Conectar</p>
              <div className="flex items-center justify-between my-4 w-full sm:w-[80%]">
                <Link href="https://www.linkedin.com/in/ph-morais/">
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 hover:text-[#4a9b7f]">
                    <FaLinkedinIn />
                  </div>
                </Link>
                <Link href="https://github.com/PhMoraiis">
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 hover:text-[#4a9b7f]">
                    <FaGithub />
                  </div>
                </Link>
                <Link href="https://www.instagram.com/philipe.dev/">
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 hover:text-[#4a9b7f]">
                    <FaInstagram />
                  </div>
                </Link>
                <Link href="https://www.youtube.com/@philipedev">
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 hover:text-[#4a9b7f]">
                    <FaYoutube />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export { Navbar }