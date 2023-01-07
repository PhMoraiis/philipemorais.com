import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

const About = () => {

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -100,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 3
      }}
      viewport={{
        once: true,
      }}
      id="about"
      className="w-full md:h-screen p-2 flex items-center py-16">
      <div className="max-w-[1240px] m-auto md:grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <p className="uppercase text-xl tracking-widest text-[#4a9b7f]">Sobre Mim</p>
          <h2 className="py-4">Olá! Eu sou o Philipe</h2>

          <p className="py-2 text-gray-400">// Hello World! (para dar sorte rs)</p>

          <p className="py-2 text-gray-600 text-lg">Estudante de Engenharia de Software na Universidade de Brasília. Sou um amante da tecnologia desde pequeno, mas comecei a aprender e a me dedicar aos 19 anos, quando tive meu primeiro contato com a Linguagem C.</p>

          <p className="py-2 text-gray-600 text-lg">Sou uma pessoa que gosta de resolver problemas, como todo desenvolvedor, gosto de grandes e dificeis desáfios, pois acompanhado deles é que vem os maiores aprendizados e evoluções que tenho. Nas horas vagas sou um gamer, um influencer dev, até mesmo ritmista (amo música).</p>
          <Link href="https://www.instagram.com/philipe.dev/">
            <p className="py-2 text-gray-600 underline cursor-pointer">Dá uma olhada no meu Insta! Lá tem vários conteúdos sobre Dev's</p>
          </Link>
        </div>
        <div className="w-full h-auto m-auto shadow-xl shadow-gray-400 flex items-center justify-center p-4 hover:scale-105 ease-in duration-300 rounded-full">
          <Image
            src={'/images/Image1.png'}
            alt={'Imagem do Philipe'}
            width={500}
            height={500}
          />
        </div>
      </div>
    </motion.div>
  );
};

export { About };