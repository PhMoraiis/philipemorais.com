'use client'

import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProjectTabs from './_components/project-tabs'
import TechTabs from './_components/tech-tabs'

const Dashboard = () => {
	return (
		<div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
			<Sidebar />
			<div className='flex flex-col'>
				<Topbar />
				<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-2'>
					<Tabs defaultValue='projects'>
						<div className='flex items-center'>
							<TabsList>
								<TabsTrigger value='projects'>Projetos</TabsTrigger>
								<TabsTrigger value='techs'>Tecnologias</TabsTrigger>
							</TabsList>
						</div>
						<ProjectTabs />
						<TechTabs />
					</Tabs>
				</main>
			</div>
		</div>
	)
}

export default Dashboard
