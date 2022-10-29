import React from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

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
import useMint from "../utils/hooks/useMint";
import useListItem from "../utils/hooks/useListItem";
import { DrawerModal, MintItem, ListItem, ConnectModal } from ".";
import ConnectModalContent from "./ConnectModalContent";

type Props = {};

function Header({}: Props) {
    const theme = useColorTheme();

    const {
        address,
        name,
        setName,
        image,
        setImage,
        description,
        setDescription,
        isMinting,
        openAddInventory,
        closeConnectModal,
        connectModalRef,
        inventoryModalRef,
        mintNtf,
        nfts,
        isLoadingNft,
        refetchNtfs,
    } = useMint();

    const {
        selectedNft,
        setSelectedNft,
        listItemModalRef,
        openListItem,
        setPrice,
        setListingType,
        handleCreateListing,
        isDirectListingLoading,
        isAuctionListingLoading,
        networkMismatch,
    } = useListItem();
    return (
        <>
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
                            accentColor="#372948"
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

                    <form className="flex items-center flex-1">
                        <label htmlFor="voice-search" className="sr-only">
                            Search
                        </label>
                        <div className="relative w-full">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="voice-search"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search Anything..."
                                required
                            />
                            <button
                                type="button"
                                className="flex absolute inset-y-0 right-0 items-center pr-3"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-primary rounded-lg border border-primary outline-none dark:bg-primary justify-center space-x-2"
                        >
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                            </svg>
                            <span className="hidden md:inline-flex">
                                Search
                            </span>
                        </button>
                    </form>

                    <button
                        onClick={() => {
                            if (!address) return toast.error("Connect Wallet");
                            openListItem();
                        }}
                        className="inline-flex bg-transparent text-primary px-5 md:px-5 py-2 border-2 border-primary hover:bg-primary hover:text-white transition-colors duration-200 rounded-lg"
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
                    <p className="link hidden md:inline-flex">
                        Health & Beauty
                    </p>
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

            {/* Connect to Wallet Modal */}
            <ConnectModal noCancelButton ref={connectModalRef}>
                <ConnectModalContent
                    address={address}
                    closeModal={closeConnectModal}
                />
            </ConnectModal>

            {/* Inventory Modal */}
            <DrawerModal
                isLoading={isMinting}
                headerText="Add an Item to the Marketplace"
                ref={inventoryModalRef}
                successBtnText={"Add/Mint Item"}
                onSuccessClick={mintNtf}
            >
                <MintItem
                    image={image}
                    setImage={setImage}
                    name={name}
                    setName={setName}
                    description={description}
                    setDescription={setDescription}
                />
            </DrawerModal>

            {/* List Item Modal */}
            <DrawerModal
                isLoading={isDirectListingLoading || isAuctionListingLoading}
                headerText="List an Item"
                ref={listItemModalRef}
                successBtnText={
                    networkMismatch ? "Switch Network" : "Create Listing"
                }
                onSuccessClick={handleCreateListing}
            >
                <ListItem
                    nfts={nfts}
                    isLoadingNft={isLoadingNft}
                    refetchNtfs={refetchNtfs}
                    selectedNft={selectedNft}
                    setSelectedNft={setSelectedNft}
                    setPrice={setPrice}
                    setListingType={setListingType}
                />
            </DrawerModal>
        </>
    );
}

export default Header;
