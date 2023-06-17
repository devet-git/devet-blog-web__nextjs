import api from "@/configs/api";
import endpoints from "@/constants/endpoints";
import localStorageNames from "@/constants/local-storage-names";
import apiErrorHandler from "@/handlers/apiError";
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
			const res = await api.post(endpoints.auth.LOGIN, user)
			if (res.data) {
				const { token, userId } = res.data.data
				localStorage.setItem(localStorageNames.JWT_TOKEN, token)
				localStorage.setItem(localStorageNames.USER_ID, userId)
			}
			return res.data;
		} catch (error) {
			apiErrorHandler(error);
		}
	},
	async register(user: UserRegister) {
		try {
			const res = await api.post(endpoints.auth.REGISTER, user)
			if (res.data) {
				const { token, userId } = res.data.data
				localStorage.setItem(localStorageNames.JWT_TOKEN, token)
				localStorage.setItem(localStorageNames.USER_ID, userId)
			}
			return res.data;
		} catch (error) {
			apiErrorHandler(error);
		}
	},
	async logout() {
		const res = await api.get(endpoints.auth.LOGOUT)
		res.status == 200 && localStorage.clear();

		return res.status == 200
	}
}

export default authService;