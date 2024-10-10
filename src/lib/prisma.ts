import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
	return new PrismaClient()
}

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
declare const globalThis: {
	prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
