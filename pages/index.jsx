import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { Main } from '../components/Main'
import { About } from '../components/About'
import { Skills } from '../components/Skills'
import { Projects } from '../components/Projects'
import { Contact } from '../components/Contact'
import { Experiences } from '../components/Experiences'

import { motion } from 'framer-motion'

const Home = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
      className="overflow-y-hidden"
    >
      <Head>
        <title>Philipe Morais</title>
        <meta name="description" content="Prazer, eu sou o Philipe Morais, Desenvolvedor e Estudante de Engenharia de Software (@philipe.dev) fã do desenvolvimento Web e pela partilha de conhecimento, vem comigo evoluir!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Main />
      <About />
      <Skills />
      <Experiences />
      <Projects />
      <Link href="/">
        <footer className='sticky bottom-5 w-full cursor-pointer'>
          <div className='flex items-center justify-center'>
            <Image
              src="/images/LogoCompleta.png"
              alt="Logo Philipe Morais"
              width={150}
              height={50}
              className="h-50 w-150 rounded-full hover:scale-110 duration-300 cursor-pointer"
            />
          </div>
        </footer>
      </Link>
    </motion.div>
  )
}

export default Home;