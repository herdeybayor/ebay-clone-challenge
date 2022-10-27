import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ThemeProvider } from "next-themes";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider enableSystem={true} attribute="class">
            <Head>
                <title>Ebay Marketplace</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
