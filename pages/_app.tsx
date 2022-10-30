import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

import network from "../utils/network";
import "../styles/globals.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThirdwebProvider desiredChainId={network}>
            <ThemeProvider enableSystem={true} attribute="class">
                <Head>
                    <title>Alien Peace Marketplace</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Component {...pageProps} />
                <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
        </ThirdwebProvider>
    );
}

export default MyApp;
