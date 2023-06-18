
const pagePaths = {
	privates: [],
	auth: {
		LOGIN: "/auth/login",
		REGISTER: "/auth/register",
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
