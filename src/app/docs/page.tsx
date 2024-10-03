import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { generateOpenApiDocument } from 'zsa-openapi'
import { router } from '@/app/api/[[...openapi]]/_router'

export default async function DocsPage() {
	const spec = await generateOpenApiDocument(router, {
		title: 'Onpholio OpenAPI',
		version: '1.0.0',
		baseUrl: `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.ROOT_URL}/api`,
	})

	return <SwaggerUI spec={spec} />
}