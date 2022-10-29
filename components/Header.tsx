import React from "react";
import Link from "next/link";
import Image from "next/image";

import {
    HiOutlineBell,
    HiOutlineShoppingCart,
    HiOutlineChevronDown,
    HiOutlinePlus,
} from "react-icons/hi";

import { SlMagnifier } from "react-icons/sl";

import ThemeToggler from "./ThemeToggler";
import { ConnectWallet } from "@thirdweb-dev/react";
import useColorTheme from "../utils/useColorTheme";
import { ColorMode } from "@thirdweb-dev/react/dist/declarations/src/evm/components/theme";

type Props = {
    address: string | undefined;
    openConnectModal: () => void;
    openAddInventory: () => void;
    openListItem: () => void;
};

function Header({
    address,
    openConnectModal,
    openAddInventory,
    openListItem,
}: Props) {
    const theme = useColorTheme();
    return (
        <div className="max-w-6xl mx-auto p-2">
            <nav className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-sm">
                    {/* <button
                        onClick={openConnectModal}
                        className="connectWalletBtn"
                    >
                        {address
                            ? `Hi, ${address.slice(0, 5)}...${address.slice(
                                  -4
                              )}`
                            : "Connect Wallet"}
                    </button> */}
                    <ConnectWallet
                        colorMode={theme as ColorMode | undefined}
                        accentColor="rgb(37 99 235)"
                    />

                    <p className="headerLink">Daily Deals</p>
                    <p className="headerLink">Help & Contact</p>
                </div>

                <ThemeToggler />

                <div className="flex items-center space-x-4 text-sm">
                    <p className="headerLink">Ship to</p>
                    <p className="headerLink">Sell</p>
                    <p className="headerLink">Watchlist</p>

                    <button
                        onClick={() => openAddInventory()}
                        className="flex space-x-1 justify-center items-center bg-transparent text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white p-2  md:px-3 md:py-1 transition-colors duration-200"
                    >
                        <span className="hidden md:inline-flex">
                            Add to Inventory
                        </span>
                        <HiOutlinePlus className="text-base" />
                    </button>

                    <HiOutlineBell className="text-2xl cursor-pointer hover:scale-125 transition" />
                    <HiOutlineShoppingCart className="text-2xl cursor-pointer hover:scale-125 transition" />
                </div>
            </nav>

            <hr className="mt-2" />

            <section className="flex items-center space-x-2 py-5">
                <div className="h-16 w-16 sm:w-28 md:w-76 cursor-pointer flex-shrink-0 relative">
                    <Link href="/">
                        <Image
                            className="h-full w-full object-contain"
                            src="https://links.papareact.com/bdb"
                            width={100}
                            height={100}
                            alt="logo"
                        />
                    </Link>
                </div>

                <button className="hidden lg:flex items-center space-x-2 w-20">
                    <p className="text-gray-600 dark:text-white/50 text-sm">
                        Shop by Category
                    </p>
                    <HiOutlineChevronDown className="flex-shrink-0 text-sm" />
                </button>

                <div className="flex items-center space-x-2 px-2 md:px-5 py-2 border-black dark:border-gray-400 border-2 flex-1">
                    <SlMagnifier className="text-gray-400" />
                    <input
                        className="outline-none flex-1 bg-transparent"
                        placeholder="Search for Anything"
                        type="text"
                    />
                </div>

                <button className="hidden md:inline-flex bg-blue-600 text-white px-5 md:px-10 py-2 border-2 border-blue-600">
                    Search
                </button>
                <button
                    onClick={() => {
                        if (!address) return openConnectModal();
                        openListItem();
                    }}
                    className="inline-flex bg-transparent text-blue-600 px-5 md:px-10 py-2 border-2 border-blue-600 hover:bg-blue-600/50 hover:text-white transition-colors duration-200"
                >
                    List Item
                </button>
            </section>
            <hr />

            <section className="flex py-3 space-x-6 text-xs md:text-sm whitespace-nowrap justify-center px-6">
                <p className="link">Home</p>
                <p className="link">Electronics</p>
                <p className="link">Computers</p>
                <p className="link hidden lg:inline-flex">Video Games</p>
                <p className="link hidden lg:inline-flex">Home & Garden</p>
                <p className="link hidden md:inline-flex">Health & Beauty</p>
                <p className="link hidden md:inline-flex">
                    Collectibles and Art
                </p>
                <p className="link hidden md:inline-flex">Books</p>
                <p className="link hidden md:inline-flex">Music</p>
                <p className="link hidden xl:inline-flex">Deals</p>
                <p className="link hidden lg:inline-flex">Other</p>
                <p className="link">More</p>
            </section>
        </div>
    );
}

export default Header;
