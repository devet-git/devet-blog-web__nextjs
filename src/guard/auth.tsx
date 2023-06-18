import localStorageNames from "@/constants/local-storage-names";
import pagePaths from "@/constants/page-path";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react'



const AuthGuard = (props: any) => {
	const { children } = props;
	const router = useRouter();
	// const { isAuthenticated } = useAuthContext();
	// const ignore = useRef(false);
	const [checked, setChecked] = useState(false);

	// Only do authentication check on component mount.
	// This flow allows you to manually redirect the user after sign-out, otherwise this will be
	// triggered and will automatically redirect to sign-in page.
	const jwtToken = typeof window !== "undefined" ? localStorage.getItem(localStorageNames.JWT_TOKEN) : null

	useEffect(() => {
		if (!router.isReady) {
			return;
		}

		// Prevent from calling twice in development mode with React.StrictMode enabled
		// if (ignore.current) {
		// 	return;
		// }

		// ignore.current = true;

		if (!jwtToken) {
			console.log('Not authenticated, redirecting');
			router
				.replace({
					pathname: pagePaths.auth.LOGIN,
					query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
				})
				.catch(console.error);
		} else {
			setChecked(true);
		}
	},
		[router.isReady]
	);

	if (!checked) {
		return null;
	}

	// If got here, it means that the redirect did not occur, and that tells us that the user is
	// authenticated / authorized.

	return children;
};

export default AuthGuard;