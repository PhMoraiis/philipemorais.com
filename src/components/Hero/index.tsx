'use client'

import Link from 'next/link'

import { Instagram, Mail, Dribbble } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { FaLinkedinIn } from 'react-icons/fa6'
import { motion } from 'framer-motion'

const Hero = () => {

  return (
    <section className="flex flex-col items-start justify-center h-[30vh] text-dark-100 dark:text-light-200 bg-light-100 dark:bg-dark-100">
      <div className="flex flex-col space-y-4 items-start">
        <div className="flex flex-col items-start justify-center space-y-2">
          <h1 className="text-6xl font-visageBd">Philipe Morais</h1>
          <h2 className="text-3xl font-futura">Desenvolvedor Front-End e UX/UI Designer.</h2>
        </div>
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17, bounce: 1 }}
            className='rounded-full p-2 hover:text-light-100 dark:hover:text-dark-100 hover:bg-dark-100 dark:hover:bg-light-100  ease-in-out'
            title='Email'
          >
            <Link href=""><Mail size={26} strokeWidth={2} /></Link>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17, bounce: 1 }}
            className='rounded-full p-2 hover:text-light-100 dark:hover:text-dark-100 hover:bg-dark-100 dark:hover:bg-light-100 ease-in-out'
            title='Linkedin'
          >
            <Link href=""><FaLinkedinIn size={26} /></Link>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17, bounce: 1 }}
            className='rounded-full p-2 hover:text-light-100 dark:hover:text-dark-100 hover:bg-dark-100 dark:hover:bg-light-100 ease-in-out'
            title='Github'
          >
            <Link href=""><FaGithub size={26} /></Link>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17, bounce: 1 }}
            className='rounded-full p-2 hover:text-light-100 dark:hover:text-dark-100 hover:bg-dark-100 dark:hover:bg-light-100 ease-in-out'
            title='Dribble'
          >
            <Link href=""><Dribbble size={26} strokeWidth={2} /></Link>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17, bounce: 1 }}
            className='rounded-full p-2 hover:text-light-100 dark:hover:text-dark-100 hover:bg-dark-100 dark:hover:bg-light-100 ease-in-out'
            title='Instagram'
          >
            <Link href=""><Instagram size={26} strokeWidth={2} />
            </Link>
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default Hero
