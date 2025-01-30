export interface ILoginData {
	email: string
	password: string
}

export interface ILoginResponse {
	message: string
	accessToken?: string
	name: string
}