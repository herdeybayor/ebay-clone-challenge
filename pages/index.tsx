import type { NextPage } from "next";
import {
    useAddress,
    useActiveListings,
    useContract,
    MediaRenderer,
} from "@thirdweb-dev/react";
import { Metronome } from "@uiball/loaders";
import { BanknotesIcon, ClockIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

import {
    DrawerModal,
    Header,
    ListItem,
    MintItem,
    NftSkeleton,
} from "../components";
import { ListingType } from "@thirdweb-dev/sdk";
import { useTheme } from "next-themes";
import React from "react";
import Modal, { ModalHandle } from "../components/Modal/Modal";
import ConnectModalContent from "../components/ConnectModalContent";
import useMint from "../utils/hooks/useMint";
import useListItem from "../utils/hooks/useListItem";

const Home: NextPage = () => {
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
        closeAddInventory,
        openConnectModal,
        closeConnectModal,
        connectModalRef,
        inventoryModalRef,
        mintNtf,
        nfts,
        isLoadingNft,
        refetchNtfs,
    } = useMint();

    const { contract } = useContract(
        process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
        "marketplace"
    );

    const {
        data: listings,
        isLoading: loadingListings,
        refetch: refetchListing,
    } = useActiveListings(contract);

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
    } = useListItem({ refetchListing });

    return (
        <>
            <div className="">
                <Header
                    address={address}
                    openConnectModal={openConnectModal}
                    openAddInventory={openAddInventory}
                    openListItem={openListItem}
                />

                <main className="max-w-6xl mx-auto p-2">
                    {loadingListings ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-5 lg:mx-auto">
                            {/* Skeleton Loading */}
                            {Array(8)
                                .fill(0)
                                .map((_, index) => (
                                    <NftSkeleton key={index} />
                                ))}
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
};

export default Home;
