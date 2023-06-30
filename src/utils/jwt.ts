import localStorageKeys from '@/constants/local-storage-keys';
import jwt from 'jsonwebtoken'
import browserUtils from './browser';

export const isJwtExpired = (): boolean => {
	try {
		const jwtToken = browserUtils.store.get(localStorageKeys.JWT_TOKEN)
		if (!jwtToken) return true;
		const decoded = jwt.decode(jwtToken, { json: true })
		if (!decoded || !decoded.exp) return true;
		const currentTime = Math.floor(Date.now() / 1000);

		return decoded.exp < currentTime;
	} catch (error) {
		return false;
	}
}