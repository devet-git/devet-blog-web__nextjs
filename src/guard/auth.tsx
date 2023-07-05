import storageKeys from "@/constants/local-storage-keys";
import pageRoutes from "@/constants/page-path";
import { isJwtExpired } from "@/utils/jwt";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react'



const AuthGuard = ({ children }: any) => {
	const router = useRouter();
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		if (!router.isReady) {
			return;
		}
		if (isJwtExpired()) {
			localStorage.clear();
			console.log('Not authenticated, redirecting...');
			router
				.replace({
					pathname: pageRoutes.auth.LOGIN,
					query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
				})
				.catch(console.error);
		} else {
			setChecked(true);
		}
	},
		[router.isReady]
	);
	if (!checked) return null
	return children;
};

export default AuthGuard;