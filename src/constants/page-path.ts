
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
	user: {
		BASE: "/user",
		INFO: "/user/information",
	}
}

export default pageRoutes;
