import { createOpenApiServerActionRouter } from 'zsa-openapi'
import {
	createTechAction,
	deleteTechByIdAction,
	getAllTechsAction,
	getTechByIdAction,
	updateTechByIdAction,
	updateTechOrderAction,
} from '@/actions/Techs'

export const techsRouter = createOpenApiServerActionRouter({
	pathPrefix: '/api/techs',
	defaults: {
		tags: ['Techs'],
		protect: true,
	},
})
	.get('/techs', getAllTechsAction)
	.get('/techs/{id}', getTechByIdAction)
	.post('/techs/', createTechAction)
	.put('/techs/{id}', updateTechByIdAction)
	.put('/techs/{id}/orderby/{order}', updateTechOrderAction)
	.delete('/techs/{id}', deleteTechByIdAction)
