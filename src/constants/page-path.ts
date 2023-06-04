
const pagePaths = {
	auth: {
		login: "/auth/login",
		register: "/auth/register",
	},
	me: {
		intro: '/me/introduce'
	},
	home: '/',
	createArticle: '/articles/create',
	article: '/articles',
	articleContent: (articleId: string | number | string[] | undefined) => '/articles/' + articleId?.toString()
}

export default pagePaths;
