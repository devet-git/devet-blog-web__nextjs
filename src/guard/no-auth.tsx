import notify from "@/configs/notify";
import localStorageNames from "@/constants/local-storage-names";
import pagePaths from "@/constants/page-path";
import Custom404 from "@/pages/404";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react'



const NoAuthGuard = (props: any) => {
	const { children } = props;
	const router = useRouter();
	const [checked, setChecked] = useState(false);
	const jwtToken = typeof window !== "undefined" ? localStorage.getItem(localStorageNames.JWT_TOKEN) : null

	useEffect(() => {
		if (!router.isReady) {
			return;
		}

		if (jwtToken) {
			console.log('Authenticated, redirecting');
			notify.info("Authenticated, redirecting")
			setTimeout(() => {
				router.replace({ pathname: pagePaths.home }).catch(console.error);
			}, 2000);

		} else {
			setChecked(true);
		}
	}, [router.isReady, jwtToken]);

	if (!checked) {
		return null;
	}
	return children;
};

export default NoAuthGuard;