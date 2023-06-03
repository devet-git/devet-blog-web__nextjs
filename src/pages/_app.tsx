import { CacheProvider } from "@emotion/react";
import createdTheme from "@/theme"
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { createEmotionCache } from "@/utils/create-emotion-cache";
import "@/styles/globals.css"
import MainLayout from "@/layouts/main-layout";
import Head from "next/head";
import NProgress from 'nprogress';
import Router from "next/router";
import { ReactElement } from "react";


const clientSideEmotionCache = createEmotionCache();
NProgress.configure({
	minimum: 0.5,
	easing: 'ease',
	speed: 5000,
	showSpinner: true
});
Router.events.on('routeChangeStart', () => {
	NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
	NProgress.done();
});

Router.events.on('routeChangeError', () => {
	NProgress.done();
});
/**
 * Provide theme for all components
 * @date 6/1/2023 - 11:11:19 PM
 *
 * @export
 * @param {*} props
 * @returns {*}
 */
export default function App(props: any): any {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	const theme = createdTheme()
	const getLayout = Component.getLayout || ((page: ReactElement) => page);
	return getLayout(
		<>
			<Head>
				<title>Devet Blog</title>
			</Head>
			<CacheProvider value={emotionCache}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={theme}>
						<Component {...pageProps} />
					</ThemeProvider>
				</StyledEngineProvider>
			</CacheProvider>
		</>
	)
}
