import { createOpenApiServerActionRouter } from 'zsa-openapi'
import {
	createProjectAction,
	deleteProjectByIdAction,
	getAllProjectsAction,
	getProjectByIdAction,
	updateProjectByIdAction,
	updateProjectOrderAction,
} from '@/actions/Projects'

export const projectsRouter = createOpenApiServerActionRouter({
	pathPrefix: '/api/projects',
	defaults: {
		tags: ['Projects'],
		protect: true,
	},
})
	.get('/projects', getAllProjectsAction)
	.get('/projects/{id}', getProjectByIdAction)
	.post('/projects', createProjectAction)
	.put('/projects/{id}/orderby/{order}', updateProjectOrderAction)
	.put('/projects/{id}', updateProjectByIdAction)
	.delete('/projects/{id}', deleteProjectByIdAction)
