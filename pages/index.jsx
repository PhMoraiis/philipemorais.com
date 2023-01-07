import Head from 'next/head'

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
    >
      <Head>
        <title>Philipe Morais</title>
        <meta name="description" content="Prazer, eu sou o Philipe Morais, Desenvolvedor e Estudante de Engenharia de Software (@philipe.dev) fã do desenvolvimento Web e pela a partilha de conhecimento, vem comigo evoluir!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Main />
      <About />
      <Skills />
      <Experiences />
      <Projects />
      <Contact />
    </motion.div>
  )
}

export default Home;