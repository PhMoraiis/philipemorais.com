import dynamic from 'next/dynamic'
import { Metadata } from 'next'

const Header = dynamic(() => import('@/components/Header'), { ssr: false })
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false })
const Works = dynamic(() => import('@/components/Works'), { ssr: false })

export const meta: Metadata = {
  title: 'Philipe Morais | Desenvolvedor Front-End e UX/UI Designer.',
  description: 'Desenvolvedor Front-End e UX/UI Designer.',
  icons: {
    icon: {
      url: './light-icon.png',
      type: 'image/png',
    }
  },
}

export default function Home() {
  return (
    <main className="dark:bg-dark-100 bg-light-100">
      <Header />
      <section className='mx-auto max-w-xl overflow-hidden'>
        <Hero />
        <Works />
      </section>
    </main>
  )
}
