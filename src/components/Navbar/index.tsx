import Button from '../Button'
import dynamic from 'next/dynamic'

const Navbar = () => {
  const Links = [
    {
      name: 'Projetos',
      link: '/works'
    },
    {
      name: 'Sobre',
      link: '/about'
    },
    {
      name: 'Experiências',
      link: '/jobs'
    },
    {
      name: 'Habilidades',
      link: '/skills'
    },
  ]

  return (


    <div className="lg:flex md:flex xxl:flex fixed z-50 h-14 xxl:max-w-2xl lg:max-w-xl md:max-w-xl w-full -translate-x-1/2 xxl:-translate-y-28 lg:-translate-y-3/4 rounded-md bottom-4 left-1/2 dark:bg-dark-100 bg-light-100 border-[1px] dark:border-palette-800 shadow-md dark:shadow-palette-800 shadow-palette-500 hidden">
      <div className="flex items-center justify-center h-full mx-auto gap-x-4">
        {Links.map((link, index) => (
          <a href={link.link} key={index} className="flex items-center justify-center xxl:text-xl md:text-[1rem] text-xl font-relativeBd uppercase p-2 rounded-md dark:text-light-100 text-dark-100 hover:dark:bg-palette-800 hover:bg-palette-100 duration-300 ease-in">
            {link.name}
          </a>
        ))}
        <Button href="#contact" title="Contato" />
      </div>
    </div>

  )
}

export default dynamic(() => Promise.resolve(Navbar), { ssr: false })