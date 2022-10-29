import {
    MediaRenderer,
    useAddress,
    useContract,
    useOwnedNFTs,
} from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import React from "react";
import { ListingSkeleton, NftSkeleton } from ".";

type Props = {
    selectedNft: NFT | null;
    setSelectedNft: React.Dispatch<React.SetStateAction<NFT | null>>;
    setListingType: React.Dispatch<
        React.SetStateAction<"directListing" | "auctionListing" | null>
    >;
    setPrice: React.Dispatch<React.SetStateAction<string>>;
    nfts: NFT[] | undefined;
    isLoadingNft: boolean;
    refetchNtfs: () => void;
};

function ListItem({
    selectedNft,
    setSelectedNft,
    setPrice,
    setListingType,
    nfts,
    isLoadingNft,
    refetchNtfs,
}: Props) {
    React.useEffect(() => {
        refetchNtfs();
    }, []);
    return (
        <main className="overflow-hidden">
            <h5 className="font-medium text-xl">
                Select an Item you would like to sell
            </h5>
            <p className="text-xs">
                Below you will find the Nft's you own in your wallet
            </p>

            <div className="p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100">
                <div className="flex items-center space-x-6">
                    {isLoadingNft ? (
                        <>
                            {/* Skeleton Loading */}
                            {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                    <ListingSkeleton />
                                ))}
                        </>
                    ) : (
                        <>
                            {nfts?.map((nft) => (
                                <div
                                    onClick={() => {
                                        if (
                                            selectedNft &&
                                            selectedNft?.metadata.id ===
                                                nft.metadata.id
                                        ) {
                                            setSelectedNft(null);
                                        } else {
                                            setSelectedNft(nft);
                                        }
                                    }}
                                    className={[
                                        "flex flex-col space-y-2 card min-w-fit border-2 bg-gray-100",
                                        selectedNft?.metadata.id ===
                                        nft.metadata.id
                                            ? "ring-4 ring-gray-600 dark:ring-white"
                                            : "",
                                    ].join(" ")}
                                    key={nft.metadata.id}
                                >
                                    <MediaRenderer
                                        className="h-36 rounded-lg bg-gray-200"
                                        src={nft.metadata.image}
                                    />
                                    <p className="truncate text-lg font-bold">
                                        {nft.metadata.name}
                                    </p>
                                    <p className="truncate text-xs">
                                        {nft.metadata.description}
                                    </p>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>

            {selectedNft && (
                <form>
                    <div className="flex flex-col p-10">
                        <div className="grid grid-cols-2 gap-5">
                            <label
                                htmlFor="directListing"
                                className="border-r font-light"
                            >
                                Direct Listing/Fixed Price
                            </label>
                            <input
                                type="radio"
                                name="listingType"
                                id="directListing"
                                value="directListing"
                                className="ml-auto h-10 w-10 cursor-pointer"
                                onChange={() => setListingType("directListing")}
                            />

                            <label
                                htmlFor="auctionListing"
                                className="border-r font-light"
                            >
                                Auction
                            </label>
                            <input
                                type="radio"
                                name="listingType"
                                id="auctionListing"
                                value="auctionListing"
                                className="ml-auto h-10 w-10 cursor-pointer"
                                onChange={() =>
                                    setListingType("auctionListing")
                                }
                            />

                            <label
                                htmlFor="price"
                                className="border-r font-light"
                            >
                                Price
                            </label>
                            <input
                                type="text"
                                placeholder="0.05"
                                className="outline-none bg-gray-100 p-5 dark:text-ebayDark border"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
            )}
        </main>
    );
}

export default ListItem;
