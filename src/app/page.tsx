import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Scroll from '@/components/Scroll'
import SelectedWorks from '@/components/SelectedWorks'
import Socials from '@/components/Socials'
import Techs from '@/components/Techs'

export default function Home() {
  return (
    <main className="container mx-auto max-w-lg md:max-w-2xl lg:max-w-6xl">
      <Navbar />
      <Hero />
      <Techs />
      <Scroll />
      <SelectedWorks />
      <Socials />
      <Footer />
    </main>
  )
}
