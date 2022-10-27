import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ThemeToggler } from "../components";

const Home: NextPage = () => {
    return (
        <div className="">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ThemeToggler />

            <p>Hello World!</p>
        </div>
    );
};

export default Home;
