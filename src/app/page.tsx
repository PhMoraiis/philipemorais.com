import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main className="container mx-auto md:max-w-xl lg:max-w-5xl">
      <Navbar />
      <Hero />
    </main>
  )
}
