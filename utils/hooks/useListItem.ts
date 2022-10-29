import {
    useActiveListings,
    useContract,
    useCreateAuctionListing,
    useCreateDirectListing,
    useNetwork,
    useNetworkMismatch,
} from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS, NFT } from "@thirdweb-dev/sdk";
import React from "react";
import toast from "react-hot-toast";

import { ModalHandle } from "../../components/Modal/Modal";
import network from "../network";

function useListItem() {
    const [selectedNft, setSelectedNft] = React.useState<NFT | null>(null);
    const [listingType, setListingType] = React.useState<
        "directListing" | "auctionListing" | null
    >(null);
    const [price, setPrice] = React.useState<string>("");
    const [isListing, setIsListing] = React.useState<boolean>(false);

    const listItemModalRef = React.useRef<ModalHandle>(null);

    const openListItem = () => {
        listItemModalRef.current?.openModal();
    };
    const closeListItem = () => {
        listItemModalRef.current?.closeModal();
    };

    const { contract } = useContract(
        process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
        "marketplace"
    );

    const {
        data: listings,
        isLoading: loadingListings,
        refetch: refetchListing,
    } = useActiveListings(contract);

    const networkMismatch = useNetworkMismatch();
    const [, switchNetwork] = useNetwork();

    const {
        mutate: createDirectListing,
        isLoading: isDirectListingLoading,
        error: directListingError,
    } = useCreateDirectListing(contract);
    const {
        mutate: createAuctionListing,
        isLoading: isAuctionListingLoading,
        error: auctionListingError,
    } = useCreateAuctionListing(contract);

    const handleCreateListing = async () => {
        if (!selectedNft) return toast.error("Please select an NFT to list");
        if (!listingType) return toast.error("Please select a listing type");
        if (!price) return toast.error("Please enter a price");

        if (networkMismatch) {
            switchNetwork && switchNetwork(network);
            return;
        }

        if (listingType === "directListing") {
            toast.loading("Creating direct listing...");
            createDirectListing(
                {
                    assetContractAddress:
                        process.env.NEXT_PUBLIC_COLLECTION_CONTRACT!,
                    tokenId: selectedNft.metadata.id,
                    currencyContractAddress: NATIVE_TOKEN_ADDRESS,
                    listingDurationInSeconds: 60 * 60 * 24 * 7, // 1 week
                    quantity: 1,
                    buyoutPricePerToken: price,
                    startTimestamp: new Date(),
                },
                {
                    onSuccess: (data, variable, context) => {
                        toast.dismiss();
                        toast.success("Direct listing created");
                        refetchListing();
                        closeListItem();
                    },
                    onError: (error, variable, context) => {
                        toast.dismiss();
                        toast.error("Failed to create direct listing");
                    },
                }
            );
        }

        if (listingType === "auctionListing") {
            toast.loading("Creating auction listing...");
            createAuctionListing(
                {
                    assetContractAddress:
                        process.env.NEXT_PUBLIC_COLLECTION_CONTRACT!,
                    tokenId: selectedNft.metadata.id,
                    currencyContractAddress: NATIVE_TOKEN_ADDRESS,
                    listingDurationInSeconds: 60 * 60 * 24 * 7, // 1 week
                    quantity: 1,
                    buyoutPricePerToken: price,
                    startTimestamp: new Date(),
                    reservePricePerToken: 0,
                },
                {
                    onSuccess: (data, variable, context) => {
                        toast.dismiss();
                        toast.success("Auction listing created");
                        refetchListing();
                        closeListItem();
                    },
                    onError: (error, variable, context) => {
                        toast.dismiss();
                        toast.error("Failed to create auction listing");
                    },
                }
            );
        }
    };

    return {
        selectedNft,
        setSelectedNft,
        listingType,
        setListingType,
        price,
        setPrice,
        isListing,
        setIsListing,
        listItemModalRef,
        openListItem,
        closeListItem,
        handleCreateListing,
        isDirectListingLoading,
        isAuctionListingLoading,
        networkMismatch,
        listings,
        loadingListings,
        refetchListing,
    };
}

export default useListItem;
