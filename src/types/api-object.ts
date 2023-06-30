export type Article = {
	id: string,
	title: string,
	authors?: string[],
	images: string[],
	description?: string,
	content?: string,
	createdDate: string,
	poster: User
}
export type User = {
	id: string,
	username: string,
	email: string,
	fullName: string
}