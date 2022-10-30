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
                    {/* <title>Alien Peace Marketplace</title>
                    <link rel="icon" href="/favicon.ico" /> */}

                    <title>Alien Peace Marketplace</title>
                    <meta name="title" content="Alien Peace Marketplace" />
                    <meta
                        name="description"
                        content="All Alien NFT in one place - ALIEN PEACE"
                    />
                    <link rel="icon" type="image/png" href="/favicon.ico" />
                    <meta property="og:type" content="website" />
                    <meta
                        property="og:url"
                        content="https://ebay-clone-challenge.vercel.app/"
                    />
                    <meta
                        property="og:title"
                        content="Alien Peace Marketplace"
                    />
                    <meta
                        property="og:description"
                        content="All Alien NFT in one place - ALIEN PEACE"
                    />
                    <meta
                        property="og:image"
                        content="https://ebay-clone-challenge.vercel.app/site_preview.png"
                    />
                    <meta
                        property="og:updated_time"
                        content="2021-12-06T09:23:21.056Z"
                    />
                    <meta
                        property="twitter:card"
                        content="summary_large_image"
                    />
                    <meta
                        property="twitter:url"
                        content="https://ebay-clone-challenge.vercel.app/"
                    />
                    <meta
                        property="twitter:title"
                        content="Alien Peace Marketplace"
                    />
                    <meta
                        property="twitter:description"
                        content="All Alien NFT in one place - ALIEN PEACE"
                    />
                    <meta
                        property="twitter:image"
                        content="https://ebay-clone-challenge.vercel.app/site_preview.png"
                    />
                </Head>
                <Component {...pageProps} />
                <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
        </ThirdwebProvider>
    );
}

export default MyApp;
