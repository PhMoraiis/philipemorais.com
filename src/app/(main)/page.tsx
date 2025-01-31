import Hero from '@/components/MainPage/Hero'
import Techs from '@/components/MainPage/Techs'
import Scroll from '@/components/MainPage/Scroll'
import SelectedWorks from '@/components/MainPage/SelectedWorks'
import Footer from '@/components/MainPage/Footer'
import Navbar from '@/components/MainPage/Navbar'

export default function Home() {
	return (
		<main className='container mx-auto max-w-lg md:max-w-2xl lg:max-w-6xl'>
			<Navbar />
			<Hero />
			<Techs />
			<Scroll />
			<SelectedWorks />
			<Footer />
		</main>
	)
}
