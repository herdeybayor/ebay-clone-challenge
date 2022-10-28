import { NFT } from "@thirdweb-dev/sdk";
import React from "react";
import { ModalHandle } from "../../components/Modal/Modal";

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
    };
}

export default useListItem;
