import axios from "axios";
import localStorageNames from "@/constants/local-storage-names";
import endpoints from "@/constants/endpoints";
// import { isJwtExpired } from 'jwt-check-expiration';

const api = axios.create({
	baseURL: endpoints.BASE,
	headers: {
		'Content-Type': 'application/json'
	}
})
api.interceptors.request.use((config) => {
	if (typeof window !== 'undefined') {
		const token = localStorage?.getItem(localStorageNames.JWT_TOKEN)
		if (token /*&& !isJwtExpired(token)*/) {
			config.headers.Authorization = `Bearer ${token}`
		} else {
			localStorage.removeItem(localStorageNames.JWT_TOKEN)
		}
	}
	return config;
}, (error) => {
	return Promise.reject(error)
})
export default api;