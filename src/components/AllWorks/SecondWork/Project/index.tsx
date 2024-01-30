const Project = () => {
  const cardStyle = {
    backgroundImage: 'url(/images/Frame 16.svg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center 15%',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <div className="flex items-center justify-center w-[90vw] h-[65vh] xxl:w-[60vw] xxl:h-[45vh] lg:w-[60vw] lg:h-[45vh] rounded-xl" style={cardStyle}>
      <div className="text-dark-100 text-center flex items-center justify-center flex-col w-full gap-y-8 mx-12 max-w-xl">
        <p className="text-2xl font-futuraBk">Confira em tempo real as tecnologias que domino e aquelas que estou aprendendo.</p>
        <div className="flex items-center justify-center gap-x-8">
          <a href="/tech" className="flex items-center justify-center lg:text-xl text-md font-relativeBd uppercase py-2 px-4 rounded-md dark:border-none dark:text-light-300 text-dark-100 dark:bg-dark-100 border-[1px] border-palette-300 bg-light-100 hover:text-dark-100 dark:hover:text-dark-100 hover:bg-light-400 dark:hover:bg-light-100 ease-in duration-300">
            Conhecer Tecnologias
          </a>
        </div>
      </div>
    </div>
  )
}

export default Project