import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import { AiOutlineClose, AiOutlineMenu, AiOutlineMail } from "react-icons/ai";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navBg, setNavBg] = useState('#ecf0f3');
  const [linkColor, setLinkColor] = useState('#1f2937');

  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/') {
      setNavBg('#ecf0f3');
      setLinkColor('#1f2937');
    } else {
      setNavBg('transparent');
      setLinkColor('#ecf0f3');
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
    <nav style={{ backgroundColor: `${navBg}` }} className={shadow ? 'fixed w-full h-20 shadow-xl z-[100]' : 'fixed w-full h-20 z-[100]'}>
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
        <Link href='/'>
          <Image
            src={'/images/LogoCompleta.png'}
            alt={'Logo escrita Philipe Morais'}
            width={200}
            height={50}
            className='cursor-pointer hover:scale-110 ease-in duration-300'
          />
        </Link>
        <div>
          <ul style={{ color: `${linkColor}` }} className="hidden md:flex">
            <Link href='/'>
              <li className="ml-10 text-sm uppercase hover:border-b">Home</li>
            </Link>
            <Link href='/#about'>
              <li className="ml-10 text-sm uppercase hover:border-b">About</li>
            </Link>
            <Link href='/#skills'>
              <li className="ml-10 text-sm uppercase hover:border-b">Skills</li>
            </Link>
            <Link href='/#projects'>
              <li className="ml-10 text-sm uppercase hover:border-b">Projects</li>
            </Link>
            <Link href='/#contact'>
              <li className="ml-10 text-sm uppercase hover:border-b">Contact</li>
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
            <div className="border-b border-gray-300 my-[-10px]">
              <p className="w-[85%] md:w-[90%] py-4">Lorem ipsum dolor sit, amet consectetur.</p>
            </div>
          </div>
          <div className="py-4 flex flex-col">
            <ul className="uppercase">
              <Link href='/'>
                <li onClick={() => setNav(false)} className="py-4 text-sm">Home</li>
              </Link>
              <Link href='/#about'>
                <li onClick={() => setNav(false)} className="py-4 text-sm">About</li>
              </Link>
              <Link href='/#skills'>
                <li onClick={() => setNav(false)} className="py-4 text-sm">Skills</li>
              </Link>
              <Link href='/#projects'>
                <li onClick={() => setNav(false)} className="py-4 text-sm">Projects</li>
              </Link>
              <Link href='/#contact'>
                <li onClick={() => setNav(false)} className="py-4 text-sm">Contact</li>
              </Link>
            </ul>
            <div className="pt-2">
              <p className="uppercase tracking-widest text-[#4a9b7f]">Lets connect</p>
              <div className="flex items-center justify-between my-4 w-full sm:w-[80%]">
                <Link href="">
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                    <FaLinkedinIn />
                  </div>
                </Link>
                <Link href="">
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                    <FaGithub />
                  </div>
                </Link>
                <Link href="">
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                    <AiOutlineMail />
                  </div>
                </Link>
                <Link href="">
                  <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                    <BsFillPersonLinesFill />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export { Navbar }