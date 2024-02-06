import FirstWork from '../AllWorks/FirstWork'
import SecondWork from '../AllWorks/SecondWork'
import ThirdWork from '../AllWorks/ThirdWork'
import FourthWork from '../AllWorks/FourthWork'
import FifthWork from '../AllWorks/FifthWork'
import SixthWork from '../AllWorks/SixthWork'

import dynamic from 'next/dynamic'

const Works = () => {
  return (
    <section className="flex flex-col mx-auto xxl:max-w-desktop lg:max-w-desktop max-w-mobile mb-8" id="works">
      <FirstWork />
      <SecondWork />
      <ThirdWork />
      <div className="flex flex-col lg:flex-row mx-auto xxl:max-w-desktop lg:max-w-desktop max-w-mobile lg:gap-8 gap-6">
        <FourthWork />
        <FifthWork />
        <SixthWork />
      </div>
    </section>
  )
}

export default dynamic(() => Promise.resolve(Works), { ssr: false })