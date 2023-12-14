import dynamic from 'next/dynamic'
import { Metadata } from 'next'

const Header = dynamic(() => import('@/components/Header'))
const Hero = dynamic(() => import('@/components/Hero'))
const Works = dynamic(() => import('@/components/Works'))

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
      <section className='mx-auto max-w-xl'>
        <Hero />
        <Works />
      </section>
    </main>
  )
}
