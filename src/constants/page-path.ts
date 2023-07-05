
const pageRoutes = {
	privates: [],
	auth: {
		LOGIN: "/auth/login",
		REGISTER: "/auth/register",
	},
	me: {
		INTRO: '/me/introduce'
	},
	home: '/',
	article: {
		CREATE: '/articles/create',
		SHOW: '/articles?page=1',
		CONTENT: (articleId: string | number | string[] | undefined) => '/articles/' + articleId?.toString(),
		SEARCH: '/articles/search'
	},
	myAccount: {
		BASE: "/my-account",
		INFO: `/my-account/information`,
		ARTICLES: (userId: any) => `/my-account/articles?uid=${userId}`,
		ACCOUNT: `/my-account/account`,
		HELP: `/my-account/help&report`
	}
}

export default pageRoutes;
