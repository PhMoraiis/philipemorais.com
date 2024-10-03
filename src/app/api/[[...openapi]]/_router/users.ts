import { createOpenApiServerActionRouter } from 'zsa-openapi'
import {
	userLoginAction,
	userRegisterAction
} from '@/actions/Users'

export const usersRouter = createOpenApiServerActionRouter({
	pathPrefix: '/api/users',
	defaults: {
		tags: ['Users'],
		protect: true,
	},
})
	.post('/users/login', userLoginAction)
	.post('/users/register', userRegisterAction)
