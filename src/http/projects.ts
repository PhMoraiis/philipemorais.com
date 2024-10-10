export async function getProjects() {
	const response = await fetch('https://onpholio.onrender.com/projects', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
	})

	if (!response.ok) {
		throw new Error('Failed to get projects')
	}

	return await response.json()
}

interface CreateProjectRequest {
	title: string
	description: string
	href: string
	lightImageDesktop: string
	darkImageDesktop?: string
	lightImageMobile: string
	darkImageMobile?: string
	status: Stats
	techs: {
		id: string
	}[]
}

export enum Stats {
	Online = 'ONLINE',
	Desenvolvimento = 'DESENVOLVIMENTO',
	Interrompido = 'INTERROMPIDO',
}

export async function createProject({
	title,
	description,
	href,
	lightImageDesktop,
	darkImageDesktop,
	lightImageMobile,
	darkImageMobile,
	techs,
	status,
}: CreateProjectRequest) {
	try {
		await fetch('https://onpholio.onrender.com/projects', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title,
				description,
				href,
				lightImageDesktop,
				darkImageDesktop,
				lightImageMobile,
				darkImageMobile,
				techs,
				status,
			}),
		})
	} catch (error) {
		console.log(error)
	}
}

interface UpdateProjectRequest {
	title?: string
	description?: string
	href?: string
	lightImageDesktop?: string
	darkImageDesktop?: string
	lightImageMobile?: string
	darkImageMobile?: string
	status?: Stats
	techs?: {
		id: string
	}[]
}

export async function updateProject(
	projectId: string,
	{
		title,
		description,
		href,
		lightImageDesktop,
		darkImageDesktop,
		lightImageMobile,
		darkImageMobile,
		status,
		techs,
	}: UpdateProjectRequest,
) {
	await fetch(`https://onpholio.onrender.com/projects/${projectId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify({
			title,
			description,
			href,
			lightImageDesktop,
			darkImageDesktop,
			lightImageMobile,
			darkImageMobile,
			techs,
			status,
		}),
	})
}

export async function deleteProject(projectId: string) {
	await fetch(`https://onpholio.onrender.com/projects/${projectId}`, {
		method: 'DELETE',
		credentials: 'include',
	})
}

export async function getProjectById(projectId: string) {
	await fetch(`https://onpholio.onrender.com/projects/${projectId}`, {
		method: 'GET',
		credentials: 'include',
	})
}
