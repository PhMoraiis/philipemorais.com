import dynamic from 'next/dynamic'

const Header = dynamic(() => import('@/components/Header'), { ssr: false })

export default function Home () {
  return (
    <main className="dark:bg-dark-100 bg-light-200">
      <Header />
    </main>
  )
}
