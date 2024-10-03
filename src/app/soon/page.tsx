import Navbar from '@/components/Navbar'
import SoonComponent from '@/components/SoonComponent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Philipe Morais | Em breve...',
  description: 'Desenvolvedor Front-End & UX/UI Designer, com foco em desenvolvimento de interfaces web criativas, acessíveis e performáticas.'
}

export default function Soon() {
  return (
    <main className="container mx-auto max-w-lg md:max-w-2xl lg:max-w-6xl">
      <Navbar />
      <SoonComponent />
    </main>
  )
}
