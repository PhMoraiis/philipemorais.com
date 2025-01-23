'use client'

import type React from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { useDimensions } from '@/hooks/use-debounced-dimensions'

interface AnimatedGradientProps {
	colors: string[]
	speed?: number
	blur?: 'light' | 'medium' | 'heavy'
}

const randomInt = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

const generateRandomValues = (length: number) => {
	return Array.from({ length }, () => ({
		top: Math.random() * 50,
		left: Math.random() * 50,
		tx: Array(4)
			.fill(null)
			.map(() => Math.random() - 0.5),
		ty: Array(4)
			.fill(null)
			.map(() => Math.random() - 0.5),
	}))
}

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
	colors,
	speed = 5,
	blur = 'light',
}) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const dimensions = useDimensions(containerRef)
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [randomValues, setRandomValues] = useState<any[]>([])

	const circleSize = useMemo(
		() => Math.max(dimensions.width, dimensions.height),
		[dimensions.width, dimensions.height],
	)

	const blurClass =
		blur === 'light'
			? 'blur-2xl'
			: blur === 'medium'
				? 'blur-3xl'
				: 'blur-[100px]'

	useEffect(() => {
		setRandomValues(generateRandomValues(colors.length))
	}, [colors.length])

	return (
		<div ref={containerRef} className='absolute inset-0 overflow-hidden'>
			<div className={cn('absolute inset-0', blurClass)}>
				{randomValues.map((values, index) => (
					// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
					<svg
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						className='absolute animate-background-gradient'
						style={
							{
								top: `${values.top}%`,
								left: `${values.left}%`,
								'--background-gradient-speed': `${1 / speed}s`,
								'--tx-1': values.tx[0],
								'--ty-1': values.ty[0],
								'--tx-2': values.tx[1],
								'--ty-2': values.ty[1],
								'--tx-3': values.tx[2],
								'--ty-3': values.ty[2],
								'--tx-4': values.tx[3],
								'--ty-4': values.ty[3],
							} as React.CSSProperties
						}
						width={circleSize * randomInt(0.5, 1.5)}
						height={circleSize * randomInt(0.5, 1.5)}
						viewBox='0 0 100 100'
					>
						<circle cx='50' cy='50' r='50' fill={colors[index]} />
					</svg>
				))}
			</div>
		</div>
	)
}

export default AnimatedGradient
