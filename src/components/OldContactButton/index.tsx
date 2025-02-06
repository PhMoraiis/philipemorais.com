import Link from 'next/link'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { motion } from 'motion/react'
import { Github, Instagram, Linkedin, Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useTheme } from 'next-themes'

export const OldContactButton = () => {
	const [isHover, setIsHover] = useState(false)
	const { theme, resolvedTheme } = useTheme()
	const t = useTranslations('Hero')

	const handleMouseEnter = () => {
		setIsHover(true)
	}

	const handleMouseLeave = () => {
		setIsHover(false)
	}

	// Objeto contendo os dados dos links
	const socialLinks = [
		{
			href: 'https://www.linkedin.com/in/ph-morais',
			icon: <Linkedin size={24} />,
		},
		{ href: 'https://www.github.com/PhMoraiis', icon: <Github size={24} /> },
		{
			href: 'https://www.instagram.com/philipemoraiis',
			icon: <Instagram size={24} />,
		},
		{ href: 'mailto:philipe_m@icloud.com', icon: <Mail size={24} /> },
	]

	const logoRotation = {
		rotate: theme === 'dark' || resolvedTheme === 'dark' ? -360 : -720,
	}

	return (
		<DropdownMenu>
			<span className='font-RelativeBk text-gray-400 mb-1 lg:text-lg animate-shine bg-[linear-gradient(110deg,#939393,45%,#1e2631,55%,#939393)] bg-[length:200%_100%] text-transparent bg-clip-text'>
				{t('cta')}
			</span>
			<DropdownMenuTrigger
				className='border border-input bg-background rounded-2xl h-9 px-3 py-2 inline-flex items-center cursor-pointer font-Relative'
				onMouseLeave={handleMouseLeave}
				onMouseEnter={handleMouseEnter}
			>
				<div
					className={`rounded-full w-3 h-3 bg-[#00eb4e] mr-2 ${isHover ? 'neon2' : 'neon'} duration-300 ease-in-out`}
				/>
				{t('buttonText')}
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>
					{t('dialogTitle')}
					<br />
					{t('dialogDescription')}
				</DropdownMenuLabel>
				<ul className='flex items-center justify-center gap-4 my-4'>
					{socialLinks.map((link, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<li key={index}>
							<Link href={link.href} target='_blank'>
								<motion.button
									className='border border-input bg-background dark:border-border rounded-sm h-9 px-3 py-2 inline-flex items-center cursor-pointer font-Relative'
									whileHover={{ scale: 1.2 }}
									transition={{
										type: 'spring',
										stiffness: 150,
										damping: 17,
										bounce: 1,
									}}
									animate={logoRotation}
								>
									{link.icon}
								</motion.button>
							</Link>
						</li>
					))}
				</ul>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
