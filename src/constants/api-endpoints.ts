const apiEndpoints = {
	BASE: 'http://localhost:8080/api/v1',
	auth: {
		LOGIN: '/auth/login',
		REGISTER: '/auth/register',
		LOGOUT: '/auth/logout',
	},
	file: {
		UPLOAD: '/files',
		GET_ALL: 'files',
		DELETE_BY_ID: (id: string) => '/files/' + id
	},
	article: {
		CREATE: '/articles',
		SEARCH: (keyword: string) => '/articles/search?keyword=' + keyword,
		GET_ALL: '/articles?pageNumber=1&pageSize=10&sortBy=title',
		GET_BY_ID: (id: string) => '/articles/' + id,
		DELETE_BY_ID: (id: string) => '/articles/' + id
	}
}

export default apiEndpoints;