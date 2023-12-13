import Header from '@/components/Header'
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Philipe Morais | Desenvolvedor Front-End & UX/UI Designer',
  description: 'Philipe Morais | Desenvolvedor Front-End & UX/UI Designer',
  applicationName: 'Portfolio Philipe Morais',
  authors: [{ name: 'Philipe Morais', url: 'https://philipemorais.tech' }],
  creator: 'Philipe Morais',
  publisher: 'Stellar TI',
  keywords: 'nextjs, react, blog, porfolio, front-end, front, web, ux, ui, designer, design, desenvolvedor, desenvolvimento, javascript, typescript, html, css, sass, scss, styled-components, tailwindcss, chakra-ui, material-ui, bootstrap, git, github, gitlab, bitbucket, figma, adobe, photoshop, illustrator, xd, prototipação, prototipar, wireframe, wireframing, mobile, mobile-first, responsivo, responsividade, mobile-first',
  icons: {
    icon: {
      url: '/favicon.ico',
      type: 'image/png',
    }
  },
}

export default function Home () {
  return (
    <main className="dark:bg-dark-100 bg-light-200">
      <Header />
    </main>
  )
}
