import localStorageNames from '@/constants/local-storage-names';
import jwt from 'jsonwebtoken'

export const isJwtExpired = (): boolean => {
	try {
		const jwtToken = typeof window !== "undefined" && localStorage.getItem(localStorageNames.JWT_TOKEN) || null
		if (!jwtToken) return true;
		const decoded = jwt.decode(jwtToken, { json: true })
		if (!decoded || !decoded.exp) return true;
		const currentTime = Math.floor(Date.now() / 1000);

		return decoded.exp < currentTime;
	} catch (error) {
		return false;
	}
}