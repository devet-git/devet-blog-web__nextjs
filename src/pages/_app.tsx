import { CacheProvider } from "@emotion/react";
import createdTheme from "@/theme"
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { createEmotionCache } from "@/utils/create-emotion-cache";

const clientSideEmotionCache = createEmotionCache();

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
	return (
		<CacheProvider value={emotionCache}>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<Component {...pageProps} />
				</ThemeProvider>
			</StyledEngineProvider>
		</CacheProvider>
	)
}
