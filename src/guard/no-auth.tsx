import notify from "@/configs/notify";
import localStorageKeys from "@/constants/local-storage-keys";
import pageRoutes from "@/constants/page-path";
import Custom404 from "@/pages/404";
import { isJwtExpired } from "@/utils/jwt";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react'



const NoAuthGuard = (props: any) => {
	const { children } = props;
	const router = useRouter();
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		if (!router.isReady) {
			return;
		}

		if (!isJwtExpired()) {
			localStorage.clear();
			console.log('Authenticated, redirecting');
			notify.info("Authenticated, redirecting")
			setTimeout(() => {
				router.replace({ pathname: pageRoutes.home }).catch(console.error);
			}, 2000);

		} else {
			setChecked(true);
		}
	}, [router.isReady]);

	if (!checked) {
		return null;
	}
	return children;
};

export default NoAuthGuard;