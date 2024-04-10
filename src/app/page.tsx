import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main className="container mx-auto max-w-md md:max-w-2xl lg:max-w-6xl">
      <Navbar />
      <div className='bg-white dark:bg-[#303030] rounded-3xl p-10'>
        <Hero />
      </div>
    </main>
  )
}
