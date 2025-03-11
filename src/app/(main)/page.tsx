'use client'

import Hero from '@/components/MainPage/Hero'
import SelectedWorks from '@/components/MainPage/SelectedWorks'
import Footer from '@/components/MainPage/Footer'
import { useTheme } from 'next-themes'
import { useToast } from '@/hooks/use-toast'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import Story from '@/components/MainPage/Story'

export default function Home() {
	const { setTheme } = useTheme()
	const { toast } = useToast()
	const tt = useTranslations('Toasts')

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'l') {
			event.preventDefault()
			handleLightTheme()
		} else if (event.key === 'd') {
			event.preventDefault()
			handleDarkTheme()
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleLightTheme = () => {
		if (localStorage.getItem('theme') === 'light') {
			toast({
				title: tt('toastThemeLightAlreadySelected'),
				action: <Sun className='mr-2 h-4 w-4 text-yellow-400' />,
			})
		} else {
			setTheme('light')
			localStorage.setItem('theme', 'light')
			toast({
				title: tt('toastThemeLightSelected'),
				description: tt('toastThemeLightDescription'),
				action: <Sun className='mr-2 h-4 w-4 text-yellow-400' />,
			})
		}
	}

	const handleDarkTheme = () => {
		if (localStorage.getItem('theme') === 'dark') {
			toast({
				title: tt('toastThemeDarkAlreadySelected'),
				variant: 'destructive',
				action: <Moon className='mr-2 h-4 w-4 text-sky-700' />,
			})
		} else {
			setTheme('dark')
			localStorage.setItem('theme', 'dark')
			toast({
				title: tt('toastThemeDarkSelected'),
				description: tt('toastThemeDarkDescription'),
				action: <Moon className='mr-2 h-4 w-4 text-sky-700' />,
			})
		}
	}

	return (
		<main className='container mx-auto max-w-screen-md md:max-w-screen-lg lg:max-w-screen-2xl flex flex-col gap-32'>
			<Hero />
			<SelectedWorks />
			<Story />
			<Footer />
		</main>
	)
}
