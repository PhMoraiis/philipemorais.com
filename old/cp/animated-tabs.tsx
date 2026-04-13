'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const TABS = [
	{ label: 'Home', href: '/' },
	{ label: 'Work', href: '/projects' },
	{ label: 'Story', href: '/about' },
	{ label: 'Chat', href: '/contact' },
	{ label: 'Uses', href: '/uses' },
]

export function AnimatedTabs() {
	const pathname = usePathname()
	const router = useRouter()
	const containerRef = useRef<HTMLDivElement>(null)
	const activeTabRef = useRef<HTMLButtonElement>(null)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const container = containerRef.current
		const activeTabElement = activeTabRef.current

		if (container && activeTabElement) {
			const { offsetLeft, offsetWidth } = activeTabElement
			const clipLeft = offsetLeft
			const clipRight = offsetLeft + offsetWidth

			container.style.clipPath = `inset(0 ${Number(
				100 - (clipRight / container.offsetWidth) * 100,
			).toFixed()}% 0 ${Number(
				(clipLeft / container.offsetWidth) * 100,
			).toFixed()}% round 17px)`
		}
	}, [pathname])

	return (
		<div className='relative mx-auto flex w-fit flex-col items-center rounded-full'>
			<div
				ref={containerRef}
				className='absolute z-10 w-full overflow-hidden [clip-path:inset(0px_75%_0px_0%_round_17px)] [transition:clip-path_0.25s_ease]'
			>
				<div className='relative flex w-full justify-center bg-black dark:bg-white'>
					{TABS.map((tab) => (
						<button
							type='button'
							key={tab.href}
							onClick={() => router.push(tab.href)}
							className='flex h-8 items-center rounded-full p-3 text-sm font-medium text-white dark:text-black'
							tabIndex={-1}
						>
							{tab.label}
						</button>
					))}
				</div>
			</div>
			<div className='relative flex w-full justify-center'>
				{TABS.map(({ label, href }) => {
					const isActive = pathname === href

					return (
						<button
							type='button'
							key={href}
							ref={isActive ? activeTabRef : null}
							onClick={() => router.push(href)}
							className={`flex h-8 items-center rounded-full p-3 text-sm font-medium hover:text-neutral-800 duration-200 ${isActive ? 'text-black dark:text-white' : 'text-neutral-500 dark:text-neutral-300'}`}
						>
							{label}
						</button>
					)
				})}
			</div>
		</div>
	)
}
