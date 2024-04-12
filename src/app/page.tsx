import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Socials from '@/components/Socials'
import Techs from '@/components/Techs'

export default function Home() {
  return (
    <main className="container mx-auto max-w-md md:max-w-2xl lg:max-w-6xl">
      <Navbar />
      <Hero />
      <Techs />
      <Socials />
    </main>
  )
}
