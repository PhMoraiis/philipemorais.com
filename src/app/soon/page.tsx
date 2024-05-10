import Navbar from '@/components/Navbar'
import Soon from '@/components/Soon'

export default function Home() {
  return (
    <main className="container mx-auto max-w-lg md:max-w-2xl lg:max-w-6xl">
      <Navbar />
      <Soon />
    </main>
  )
}
