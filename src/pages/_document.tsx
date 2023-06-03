import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					{/* <link rel="icon" sizes="32x32" type="image/png" href="/favicon-32x32.png" />
					<link rel="icon" sizes="16x16" type="image/png" href="/favicon-16x16.png" /> */}
					<link rel="icon" sizes="512x512" type="image/png" href="/favicon-512x512.png" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
