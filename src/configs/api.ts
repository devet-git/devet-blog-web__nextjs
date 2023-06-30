import axios from "axios";
import storageKeys from "@/constants/local-storage-keys";
import apiEndpoints from "@/constants/api-endpoints";
import { isJwtExpired } from "@/utils/jwt";
import browserUtils from "@/utils/browser";

const api = axios.create({
	baseURL: apiEndpoints.BASE,
	headers: {
		'Content-Type': 'application/json'
	}
})
api.interceptors.request.use((config) => {
	if (typeof window !== 'undefined') {
		const token = browserUtils.store.get(storageKeys.JWT_TOKEN)
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