import Image from 'next/image'
import { motion } from 'framer-motion'

const Skill = ({ src, alt, name }) => {
  return (
    <motion.div
      initial={{
        x: -100,
        opacity: 0,
      }}
      transition={{
        duration: 1.2,
      }}
      whileInView={{
        opacity: 1, x: 0
      }}
      viewport={{
        once: true,
      }}
      className="p-6 shadow-xl rounded-xl">
      <div className="grid grid-cols-2 gap-4 justify-center items-center hover:scale-110 ease-in duration-300">
        <div className="m-auto">
          <Image
            src={src}
            alt={alt}
            width={64}
            height={64}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h3>{name}</h3>
        </div>
      </div>
    </motion.div>
  )
}

export { Skill }