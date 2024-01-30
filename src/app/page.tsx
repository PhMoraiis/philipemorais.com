import Blog from '@/components/Blog'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Works from '@/components/Works'

export default function Home() {
  return (
    <main className="dark:bg-dark-100 bg-light-100">
      <Header />
      <Navbar />
      <Hero />
      <Works />
      <Blog />
    </main>
  )
}
