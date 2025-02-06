'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { FaLinkedin, FaGithub, FaDev } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'
import Link from 'next/link'
import { motion } from 'motion/react'
import CommandButton from '@/components/CommandButton'

const Hero = () => {
	const t = useTranslations('Hero')

	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])
	if (!mounted) {
		return <Skeleton className='w-full h-96 mt-20' />
	}

	const buttonList = [
		{
			id: 1,
			href: 'https://www.linkedin.com/in/ph-morais',
			icon: <FaLinkedin size={22} />,
		},
		{
			id: 2,
			href: 'https://www.github.com/PhMoraiis',
			icon: <FaGithub size={22} />,
		},
		{
			id: 3,
			href: 'https://www.instagram.com/philipemoraiis',
			icon: <RiInstagramFill size={22} />,
		},
		{
			id: 4,
			href: 'https://www.instagram.com/philipemoraiis',
			icon: <FaDev size={22} />,
		},
	]

	return (
		<section className='flex gap-6 justify-center'>
			<div className='flex flex-col items-start justify-between p-12 shadow-sm rounded-xl bg-white dark:bg-[#111110] lg:w-full md:w-3/4 h-[40rem]'>
				<div className='flex flex-col items-start gap-4 md:gap-6 md:max-w-sm lg:gap-8 lg:max-w-full'>
					<div className='max-w-sm lg:max-w-2xl'>
						<h1 className='text-[2.8rem] leading-none font-Relative md:text-5xl lg:text-6xl'>
							{t('title')}
						</h1>
						<span className='text-[2.8rem] leading-none font-Relative md:text-5xl lg:text-6xl'>
							{' '}
							a front-end developer & ux/ui designer
						</span>
					</div>
					<p className='max-w-md font-RelativeBk lg:max-w-lg lg:text-lg'>
						{t('paragraph')}
					</p>
				</div>
				<div className='flex justify-center space-x-3'>
					<Button className='rounded-full h-13 px-7 py-4'>
						{t('buttonText')}
					</Button>
					{buttonList.map((button) => (
						<Link key={button.id} href={button.href}>
							<motion.button
								className='h-10 px-4 py-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-[100%] flex items-center justify-center'
								whileHover={{ scale: 1.1 }}
								transition={{
									type: 'spring',
									stiffness: 150,
									damping: 17,
									bounce: 1,
								}}
							>
								{button.icon}
							</motion.button>
						</Link>
					))}
				</div>
			</div>
			<div className='lg:flex md:flex items-start justify-center hidden p-10 shadow-sm rounded-xl bg-white dark:bg-[#111110] lg:w-1/2 md:w-2/4'>
				<CommandButton />
			</div>
		</section>
	)
}

export default Hero
