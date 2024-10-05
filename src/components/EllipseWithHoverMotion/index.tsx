import { motion } from 'framer-motion'
import { useState } from 'react'

interface EllipseWithHoverMotionProps {
	width: string
	height: string
}

const EllipseWithHoverMotion = ({
	width,
	height,
}: EllipseWithHoverMotionProps) => {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 949 461'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
      <title>Ellipse</title>
			<defs>
				<linearGradient
					id='paint0_linear_191_37'
					x1='88.3288'
					y1='39.8611'
					x2='88.3288'
					y2='460.702'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#333333' />
					<stop offset='0.675' stopColor='#333333' />
					<stop offset='0.96' stopColor='#4D4B4B' />
				</linearGradient>
				<linearGradient
					id='paint1_linear_191_37'
					x1='88.3288'
					y1='164.81'
					x2='88.3288'
					y2='316.972'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#F6F6F6' />
					<stop offset='1' stopColor='#787878' />
				</linearGradient>
				<linearGradient
					id='paint2_linear_191_37'
					x1='277.878'
					y1='195.856'
					x2='277.878'
					y2='391.712'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#333333' />
					<stop offset='1' stopColor='#999999' />
				</linearGradient>
				<linearGradient
					id='paint3_linear_191_37'
					x1='436.929'
					y1='381.746'
					x2='436.929'
					y2='565.72'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#333333' />
					<stop offset='1' stopColor='#999999' />
				</linearGradient>
			</defs>
			<motion.path
				d='M0 128.19C0 79.4073 39.5461 39.8611 88.3288 39.8611C137.111 39.8611 176.658 79.4073 176.658 128.19V372.373C176.658 421.156 137.111 460.702 88.3288 460.702C39.5461 460.702 0 421.156 0 372.373V128.19Z'
				fill='url(#paint0_linear_191_37)'
			/>
			<motion.ellipse
				cx='88.3288'
				cy='142.782'
				rx='75.3801'
				ry='77.5985'
				fill='url(#paint1_linear_191_37)'
				animate={{
					cy: isHovered ? 342.782 : 142.782, // Movimenta para baixo quando o mouse passa em cima
				}}
				transition={{
					duration: 0.9, // Duração da animação
					ease: 'easeInOut', // Tipo de transição
				}}
			/>
			<motion.path
				d='M237.271 76.4927L319.072 196.595V76.4927H346.156V239H319.345L235.903 119.992V239H208.819V76.4927H237.271Z'
				fill='url(#paint2_linear_191_37)'
			/>
			<motion.path
				d='M230.122 294.638V347.518C232.247 347.754 236.024 347.99 239.093 347.99C261.519 347.99 273.323 339.256 273.323 320.37C273.323 303.845 262.228 293.93 240.273 293.93C237.44 293.93 233.191 294.166 230.122 294.638ZM230.122 368.056V415.271H206.043V275.517C215.013 274.1 228.942 272.684 240.509 272.684C277.336 272.684 297.638 289.681 297.638 320.37C297.638 353.42 273.323 368.528 240.745 368.528C237.44 368.528 233.191 368.292 230.122 368.056ZM416.943 334.062V275.044H441.022V415.271H416.943V355.309H344.469V415.271H320.39V275.044H344.469V334.062H416.943ZM467.74 345.157C467.74 302.193 499.846 272.684 540.45 272.684C580.818 272.684 613.16 302.193 613.16 345.157C613.16 388.122 580.818 417.631 540.45 417.631C499.846 417.631 467.74 388.122 467.74 345.157ZM588.372 345.157C588.372 314.468 567.362 294.402 540.45 294.402C513.538 294.402 492.528 314.468 492.528 345.157C492.528 375.847 513.538 395.913 540.45 395.913C567.362 395.913 588.372 375.847 588.372 345.157ZM639.915 415.271V275.044H663.994V394.024H721.123V415.271H639.915ZM767.506 275.044V415.271H743.427V275.044H767.506ZM794.182 345.157C794.182 302.193 826.287 272.684 866.892 272.684C907.26 272.684 939.602 302.193 939.602 345.157C939.602 388.122 907.26 417.631 866.892 417.631C826.287 417.631 794.182 388.122 794.182 345.157ZM914.814 345.157C914.814 314.468 893.804 294.402 866.892 294.402C839.98 294.402 818.969 314.468 818.969 345.157C818.969 375.847 839.98 395.913 866.892 395.913C893.804 395.913 914.814 375.847 914.814 345.157Z'
				fill='url(#paint3_linear_191_37)'
			/>
		</svg>
	)
}

export default EllipseWithHoverMotion
