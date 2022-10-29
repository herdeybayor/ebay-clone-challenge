import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import React from "react";
import toast from "react-hot-toast";

import { ModalHandle } from "../../components/Modal/Modal";

function useMint() {
    const address = useAddress();
    const [image, setImage] = React.useState<File | null>(null);
    const [name, setName] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [isMinting, setIsMinting] = React.useState<boolean>(false);

    const inventoryModalRef = React.useRef<ModalHandle>(null);
    const connectModalRef = React.useRef<ModalHandle>(null);

    const openConnectModal = () => {
        connectModalRef.current?.openModal();
    };
    const closeConnectModal = () => {
        connectModalRef.current?.closeModal();
    };

    const openAddInventory = () => {
        inventoryModalRef.current?.openModal();
    };
    const closeAddInventory = () => {
        inventoryModalRef.current?.closeModal();
    };

    const { contract: collectionContract } = useContract(
        process.env.NEXT_PUBLIC_COLLECTION_CONTRACT,
        "nft-collection"
    );

    const {
        data: nfts,
        isLoading: isLoadingNft,
        refetch: refetchNtfs,
    } = useOwnedNFTs(collectionContract, address);

    const mintNtf = async () => {
        if (!collectionContract || !address) {
            closeAddInventory();
            toast.error("Please connect your wallet");
            return;
        }

        // Toasts
        if (!image) return toast.error("Please upload an image");
        if (!name) return toast.error("Please enter a name");
        if (!description) return toast.error("Please enter a description");

        toast.loading("Minting NFT...");
        setIsMinting(true);

        const metadata = {
            name,
            description,
            image: image,
        };

        try {
            const tx = await collectionContract.mintTo(address, metadata);

            const receipt = tx.receipt;
            const tokenId = tx.id;
            const nft = await tx.data();

            setIsMinting(false);
            refetchNtfs();
            toast.dismiss();
            toast.success("Successfully minted NFT");
            closeAddInventory();
        } catch (error) {
            toast.dismiss();
            setIsMinting(false);
            toast.error("Error minting NFT");
            console.error({ error });
        }
    };

    return {
        address,
        name,
        setName,
        description,
        setDescription,
        image,
        setImage,
        isMinting,
        openAddInventory,
        closeAddInventory,
        openConnectModal,
        closeConnectModal,
        inventoryModalRef,
        connectModalRef,
        mintNtf,
        nfts,
        isLoadingNft,
        refetchNtfs,
    };
}

export default useMint;
