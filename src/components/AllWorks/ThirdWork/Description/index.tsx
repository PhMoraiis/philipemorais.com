import ButtonCard from '../../../Button/ButtonCard'

const Description = () => {
  return (
    <div className="flex items-center justify-center min-w-[90vw] min-h-[60vh] xxl:min-w-[20vw] xxl:min-h-[35vh] lg:min-w-[20vw] lg:min-h-[35vh] dark:bg-dark-300 glassDescription rounded-xl">
      <div className="dark:text-light-100 text-dark-100 text-center flex items-center justify-center flex-col w-full gap-y-8 p-12">
        <p className='pt-6 text-center font-relative lg:max-w-2xl xxl:text-2xl text-md mx-8'>Sonho em impulsionar a internet em direção à criatividade, acessibilidade e excelência contínua. Estou aqui para fazer da web um lugar melhor a cada linha de código.</p>
        <ButtonCard href="/" title="Saiba Mais" arrow={true} />
      </div>
    </div>
  )
}

export default Description
