import IconLinks from '../IconLinks'

const Hero = () => {
  return (
    <section className='flex flex-col items-center justify-center min-h-desktop lg:max-w-desktop max-w-mobile mx-auto text-dark-100 dark:text-light-200 bg-hero glass rounded-xl mb-8'>
      <div className="relative z-10 flex flex-col gap-y-6 items-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="xxl:text-[9rem] lg:text-[7rem] md:text-[5rem] text-4xl leading-none font-visageBd max-w-6xl text-center">PHILIPE MORAIS</h1>
          <h2 className="lg:text-6xl md:text-4xl text-3xl font-visage max-w-3xl text-center">DESENVOLVEDOR FRONT-END E UX/UI DESIGNER</h2>
        </div>
        <IconLinks />
      </div>
      <div>
        <span></span>
      </div>
    </section>
  )
}

export default Hero
