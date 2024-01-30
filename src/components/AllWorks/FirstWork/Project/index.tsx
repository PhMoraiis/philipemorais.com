'use client'

import { useTheme } from 'next-themes'

const Project = () => {
  const { theme, setTheme } = useTheme()

  const backgroundImage = theme === 'dark' ? '/images/Frame17.svg' : '/images/Frame17Light.svg'

  const cardStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <div className="flex items-start justify-start w-[90vw] h-[60vh] xxl:w-[70vw] xxl:h-[60vh] lg:w-[70vw] lg:h-[60vh] rounded-xl" style={cardStyle}>
      <div className="text-dark-100 text-left flex items-start justify-start flex-col w-full p-12 gap-y-4 max-w-lg">
        <h1 className="font-visageBd text-2xl">Eu sou Philipe</h1>
        <p className="font-relativeBk">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur explicabo voluptate aliquid dolor, dolores dolorum quaerat nisi blanditiis! Ipsum exercitationem dolore ea ex, natus esse doloremque nihil dolor excepturi voluptatem!</p>
        <p className="font-relativeBk">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur explicabo voluptate aliquid dolor, dolores dolorum quaerat nisi blanditiis! Ipsum exercitationem dolore ea ex, natus esse doloremque nihil dolor excepturi voluptatem!</p>
        <p className="font-relativeBk">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur explicabo voluptate aliquid dolor, dolores dolorum quaerat nisi blanditiis! Ipsum exercitationem dolore ea ex, natus esse doloremque nihil dolor excepturi voluptatem!</p>
      </div>
    </div>
  )
}

export default Project
