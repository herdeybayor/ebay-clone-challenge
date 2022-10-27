import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { ThirdwebProvider } from "@thirdweb-dev/react";

import network from "../utils/network";
import "../styles/globals.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThirdwebProvider desiredChainId={network}>
            <ThemeProvider enableSystem={true} attribute="class">
                <Head>
                    <title>Ebay Marketplace</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Component {...pageProps} />
            </ThemeProvider>
        </ThirdwebProvider>
    );
}

export default MyApp;
