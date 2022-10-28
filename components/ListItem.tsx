import {
    MediaRenderer,
    useAddress,
    useContract,
    useOwnedNFTs,
} from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import React from "react";

type Props = {};

function ListItem({}: Props) {
    const [selectedNft, setSelectedNft] = React.useState<NFT | null>(null);

    const address = useAddress();

    const { contract } = useContract(
        process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
        "marketplace"
    );

    const { contract: collectionContract } = useContract(
        process.env.NEXT_PUBLIC_COLLECTION_CONTRACT,
        "nft-collection"
    );

    const { data: nfts, isLoading: isLoadingNft } = useOwnedNFTs(
        collectionContract,
        address
    );

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
                                    <div
                                        key={i}
                                        className="flex flex-col space-y-2 w-56 flex-shrink-0 border-2 p-5 rounded-lg animate-pulse"
                                    >
                                        <div className="h-36 w-full rounded-lg bg-gray-200 animate-pulse"></div>
                                        <div className="bg-gray-200 h-2.5 rounded-full w-full animate-pulse"></div>
                                        <div className="bg-gray-200 h-2 rounded-full w-full animate-pulse"></div>
                                    </div>
                                ))}
                        </>
                    ) : (
                        <>
                            {nfts?.map((nft) => (
                                <div
                                    onClick={() => setSelectedNft(nft)}
                                    className="flex flex-col space-y-2 card min-w-fit border-2 bg-gray-100"
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
        </main>
    );
}

export default ListItem;
