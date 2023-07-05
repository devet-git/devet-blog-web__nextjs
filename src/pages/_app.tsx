import { CacheProvider } from "@emotion/react";
import createdTheme from "@/theme"
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { createEmotionCache } from "@/utils/create-emotion-cache";
import "@/styles/globals.css"
import Head from "next/head";
import { ReactElement, ReactNode } from "react";
import useNProgress from "@/hooks/use-nprogress";
import { SnackbarProvider } from "notistack";
import wrapper, { persistor } from "@/redux/store";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
	emotionCache: any
}
/**
 * Provide theme for all components
 * @date 6/1/2023 - 11:11:19 PM
*
* @export
* @param {*} props
* @returns {*}
*/
const clientSideEmotionCache = createEmotionCache();
function App(props: AppPropsWithLayout) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	const theme = createdTheme()
	const getLayout = Component.getLayout || ((page: ReactElement) => page);

	useNProgress();

	return getLayout(
		<>
			<Head>
				<title>Devet Blog</title>
			</Head>
			<CacheProvider value={emotionCache}>
				<StyledEngineProvider injectFirst>
					<ThemeProvider theme={theme}>
						<SnackbarProvider
							maxSnack={5}
							autoHideDuration={2000}
							preventDuplicate={true}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
						>
							<PersistGate loading={null} persistor={persistor} >
								<CookiesProvider>
									<Component {...pageProps} />
								</CookiesProvider>
							</PersistGate>
						</SnackbarProvider>
					</ThemeProvider>
				</StyledEngineProvider>
			</CacheProvider>
		</>
	)
}
export default wrapper.withRedux(App)