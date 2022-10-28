import type { NextPage } from "next";
import {
    useAddress,
    useActiveListings,
    useContract,
    MediaRenderer,
} from "@thirdweb-dev/react";
import { Metronome } from "@uiball/loaders";
import { BanknotesIcon, ClockIcon } from "@heroicons/react/24/outline";

import { DrawerModal, Header, MintItem } from "../components";
import { ListingType } from "@thirdweb-dev/sdk";
import { useTheme } from "next-themes";
import React from "react";
import Modal, { ModalHandle } from "../components/Modal/Modal";
import ConnectModalContent from "../components/ConnectModalContent";

const Home: NextPage = () => {
    const { theme, systemTheme } = useTheme();

    const address = useAddress();

    const connectModalRef = React.useRef<ModalHandle>(null);
    const drawerModalRef = React.useRef<ModalHandle>(null);

    const openConnectModal = () => {
        connectModalRef.current?.openModal();
    };

    const closeConnectModal = () => {
        connectModalRef.current?.closeModal();
    };

    const openAddInventory = () => {
        drawerModalRef.current?.openModal();
    };

    const closeAddInventory = () => {
        drawerModalRef.current?.closeModal();
    };

    const { contract } = useContract(
        process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
        "marketplace"
    );

    const { contract: collectionContract } = useContract(
        process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
        "nft-collection"
    );

    const { data: listings, isLoading: loadingListings } =
        useActiveListings(contract);
    return (
        <>
            <div className="">
                <Header
                    address={address}
                    openConnectModal={openConnectModal}
                    openAddInventory={openAddInventory}
                />

                <main className="max-w-6xl mx-auto p-2">
                    {loadingListings ? (
                        <div className="flex flex-col items-center justify-center mt-10">
                            <Metronome
                                size={80}
                                speed={1.6}
                                color={
                                    (theme === "system"
                                        ? systemTheme
                                        : theme) === "dark"
                                        ? "white"
                                        : "black"
                                }
                            />
                            <h4 className="font-semibold text-xl text-gray-800 dark:text-white/80 animate-pulse">
                                Loading listings...
                            </h4>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-5 lg:mx-auto">
                            {listings?.map((listing) => (
                                <div
                                    key={listing.id}
                                    className="flex flex-col card hover:scale-105 transition-transform duration-150 ease-out"
                                >
                                    <div className="flex-1 flex flex-col pb-2 items-center">
                                        <MediaRenderer
                                            className="w-44"
                                            src={listing.asset.image}
                                        />
                                    </div>

                                    <div className="pt-2 space-y-4">
                                        <h2 className="text-lg truncate">
                                            {listing.asset.name}
                                        </h2>
                                        <hr />
                                        <p className="truncate text-sm text-gray-600 dark:text-white/60">
                                            {listing.asset.description}
                                        </p>
                                    </div>

                                    <p className="">
                                        <span className="font-bold">
                                            {
                                                listing
                                                    .buyoutCurrencyValuePerToken
                                                    .displayValue
                                            }
                                        </span>{" "}
                                        {
                                            listing.buyoutCurrencyValuePerToken
                                                .symbol
                                        }
                                    </p>

                                    <div
                                        className={[
                                            "flex space-x-1 items-center justify-end text-xs w-fit ml-auto p-2 rounded-lg text-white",
                                            listing.type === ListingType.Direct
                                                ? "bg-green-500"
                                                : "bg-blue-500",
                                        ].join(" ")}
                                    >
                                        <p>
                                            {listing.type === ListingType.Direct
                                                ? "Buy Now"
                                                : "Auction"}
                                        </p>
                                        {listing.type === ListingType.Direct ? (
                                            <BanknotesIcon className="h-4" />
                                        ) : (
                                            <ClockIcon className="h-4" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
            {/* Connect to Wallet Modal */}
            <Modal noCancelButton ref={connectModalRef}>
                <ConnectModalContent
                    address={address}
                    closeModal={closeConnectModal}
                />
            </Modal>

            {/* Drawer Modal */}
            <DrawerModal
                headerText="Add an Item to the Marketplace"
                ref={drawerModalRef}
                successBtnText={"Add/Mint Item"}
            >
                <MintItem />
            </DrawerModal>
        </>
    );
};

export default Home;
