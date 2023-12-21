import { Metadata } from 'next'
import Header from '@/components/Header'
import Hero from '@/components/Hero'



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
      <Hero />
    </main>
  )
}
