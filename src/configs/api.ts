import axios from "axios";
import localStorageKeys from "@/constants/local-storage-keys";
import apiEndpoints from "@/constants/api-endpoints";
import { isJwtExpired } from "@/utils/jwt";

const api = axios.create({
	baseURL: apiEndpoints.BASE,
	headers: {
		'Content-Type': 'application/json'
	}
})
api.interceptors.request.use((config) => {
	if (typeof window !== 'undefined') {
		const token = localStorage.getItem(localStorageKeys.JWT_TOKEN)
		if (token && !isJwtExpired()) {
			config.headers.Authorization = `Bearer ${token}`
		} else {
			localStorage.clear()
		}
	}
	return config;
}, (error) => {
	return Promise.reject(error)
})
export default api;