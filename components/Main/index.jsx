import { FaGithub, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";

import { Cursor, useTypewriter } from 'react-simple-typewriter'

import Link from "next/link";

import { motion } from "framer-motion";

const Main = () => {

  const [text] = useTypewriter({
    words: ["Desenvolvedor de Software", "Software Developer", "Desenvolvedor Front-End", "Front-End Developer", "Gamer ?", "Influencer ?"],
    loop: true,
    delaySpeed: 2000,
  })

  const [text2] = useTypewriter({
    words: [".tsx", ".html", ".js", ".css", ".py", ".c", ".jsx"],
    loop: true,
    delaySpeed: 2000,
  })

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        scale: [1.2, 1, 1.2, 1],
        opacity: 1,
      }}
      transition={{
        duration: 2.5,
      }}
      id="home" className="w-full h-screen text-center">
      <div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center">
        <div>
          <h1 className="py-4 text-[#4a9b7f]">Philipe Morais<span className="text-[#1f2937]">{text2}</span></h1>
          <h1 className="py-2 text-gray-700">
            {text}
            <Cursor cursorColor="#4A9B7F" />
          </h1>
          <div className="flex items-center justify-between max-w-[330px] m-auto py-4">
            <Link href="https://www.linkedin.com/in/ph-morais/">
              <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300 hover:text-[#4a9b7f]">
                <FaLinkedinIn size={25} />
              </div>
            </Link>
            <Link href="https://github.com/PhMoraiis">
              <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300 hover:text-[#4a9b7f]">
                <FaGithub size={25} />
              </div>
            </Link>
            <Link href="https://www.instagram.com/philipe.dev/">
              <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300 hover:text-[#4a9b7f]">
                <FaInstagram size={25} />
              </div>
            </Link>
            <Link href="https://www.youtube.com/@philipedev">
              <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300 hover:text-[#4a9b7f]">
                <FaYoutube size={25} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export { Main }
