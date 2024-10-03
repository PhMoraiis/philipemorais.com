'use client'

import { motion } from 'framer-motion'
import { Mouse } from 'lucide-react'

const Scroll = () => {

  return (
			<section className='my-16 hidden items-center flex-col gap-4 md:flex lg:flex'>
				<motion.div
					animate={{
						y: [0, -10, 0],
						transition: {
							duration: 1.5,
							repeat: Number.POSITIVE_INFINITY,
							ease: 'easeIn',
						},
					}}
					// quando passar o mouse por cima, a animação para
					whileHover={{ y: 0, transition: { duration: 0.5 } }}
				>
					<Mouse size={30} />
				</motion.div>
				<h2 className='font-RelativeBk text-gray-400 mb-1 lg:text-lg animate-shine bg-[linear-gradient(110deg,#939393,45%,#1e2631,55%,#939393)] bg-[length:200%_100%] text-transparent bg-clip-text'>
					{'Role a página para ver mais'}
				</h2>
			</section>
		)
}

export default Scroll