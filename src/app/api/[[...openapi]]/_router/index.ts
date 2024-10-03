import { createOpenApiServerActionRouter } from 'zsa-openapi'
import { usersRouter } from './users'
import { techsRouter } from './techs'
import { projectsRouter } from './projects'

export const router = createOpenApiServerActionRouter({
	pathPrefix: '/api',
	extend: [usersRouter, techsRouter, projectsRouter],
	defaults: {
		contentTypes: ['application/json'],
	},
})
