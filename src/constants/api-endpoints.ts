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
		DELETE_BY_ID: (id: string) => `/files/${id}`
	},
	article: {
		CREATE: '/articles',
		SEARCH: (keyword: any) => `/articles/search?keyword=${keyword}`,
		GET_ALL: (pageNumber: any, pageSize: any) => `/articles?pageNumber=${pageNumber.toString()}&pageSize=${pageSize}&sortBy=title`,
		GET_ALL_BY_USER_ID: (userId: string | any, pageNumber: any, pageSize: any) => `/users/${userId}/articles?pageNumber=${pageNumber.toString()}&pageSize=${pageSize}&sortBy=title`,
		GET_BY_ID: (id: string) => `/articles/${id}`,
		DELETE_BY_ID: (id: string) => `/articles/${id}`
	}
}

export default apiEndpoints;