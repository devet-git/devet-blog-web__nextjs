import { CacheProvider } from "@emotion/react";
import createdTheme from "@/theme"
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { createEmotionCache } from "@/utils/create-emotion-cache";
import "@/styles/globals.css"
import Head from "next/head";
import { ReactElement } from "react";
import useNProgress from "@/hooks/use-nprogress";
import { SnackbarProvider } from "notistack";



/**
 * Provide theme for all components
 * @date 6/1/2023 - 11:11:19 PM
*
* @export
* @param {*} props
* @returns {*}
*/
const clientSideEmotionCache = createEmotionCache();
export default function App(props: any): any {
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
							<Component {...pageProps} />
						</SnackbarProvider>
					</ThemeProvider>
				</StyledEngineProvider>
			</CacheProvider>
		</>
	)
}
