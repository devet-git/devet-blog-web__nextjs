import api from "@/configs/api";
import apiEndpoints from "@/constants/api-endpoints";
import storageKeys from "@/constants/local-storage-keys";
import apiErrorHandler from "@/handlers/apiError";
import browserUtils from "@/utils/browser";
export interface UserLogin {
	email: string,
	password: string
}
export interface UserRegister {
	username: string,
	email: string,
	password: string
}
const authService = {
	async login(user: UserLogin) {
		try {
			const res = await api.post(apiEndpoints.auth.LOGIN, user)
			if (res.data) {
				const { token, user } = res.data.data
				browserUtils.store.set(storageKeys.JWT_TOKEN, token)
				browserUtils.store.set(storageKeys.USER, user)
				return res.data;
			}
			return null
		} catch (error) {
			apiErrorHandler(error);
		}
	},
	async register(user: UserRegister) {
		try {
			const res = await api.post(apiEndpoints.auth.REGISTER, user)
			if (res.data) {
				const { token, user } = res.data.data
				browserUtils.store.set(storageKeys.JWT_TOKEN, token)
				browserUtils.store.set(storageKeys.USER, user)
				return res.data;
			}
		} catch (error) {
			apiErrorHandler(error);
		}
	},
	async logout() {
		const res = await api.get(apiEndpoints.auth.LOGOUT)
		res.status == 200 && localStorage.clear();

		return res.status == 200
	}
}

export default authService;