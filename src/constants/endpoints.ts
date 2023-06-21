const endpoints = {
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
		GET_ALL: '/articles',
		DELETE_BY_ID: (id: string) => '/articles/' + id
	}
}

export default endpoints;