
const pagePaths = {
	auth: {
		login: "/auth/login",
		register: "/auth/register",
	},
	home: '/',
	createArticle: '/articles/create',
	article: '/articles',
	articleContent: (articleId: string | number | string[] | undefined) => '/articles/' + articleId?.toString()
}

export default pagePaths;
