import { Router } from "next/router";
import nProgress from "nprogress";
import { useEffect } from "react";

export default function useNProgress() {
	nProgress.configure({
		minimum: 0.2,
		easing: 'ease',
		speed: 500,
		showSpinner: false,
		// trickle: true,
		trickleSpeed: 200,
		// parent: '#my-custom-element',
		// barSelector: '.my-custom-bar',
		// spinnerSelector: '.my-custom-spinner'
	});
	useEffect(() => {
		Router.events.on('routeChangeStart', nProgress.start);
		Router.events.on('routeChangeError', nProgress.done);
		Router.events.on('routeChangeComplete', nProgress.done);

		return () => {
			Router.events.off('routeChangeStart', nProgress.start);
			Router.events.off('routeChangeError', nProgress.done);
			Router.events.off('routeChangeComplete', nProgress.done);
		};
	}, []);
}