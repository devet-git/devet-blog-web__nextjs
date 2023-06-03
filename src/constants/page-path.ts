
const pagePaths = {
	auth: {
		login: "/auth/login",
		register: "/auth/register",
	},
	intro: {
		me: '/introduce/me'
	},
	home: '/',
	createArticle: '/articles/create',
	article: '/articles',
	articleContent: (articleId: string | number | string[] | undefined) => '/articles/' + articleId?.toString()
}

export default pagePaths;
