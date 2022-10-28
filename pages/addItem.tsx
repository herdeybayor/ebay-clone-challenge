import React from "react";
import { useAddress, useContract } from "@thirdweb-dev/react";

import { Header } from "../components";

function AddItemPage() {
    const address = useAddress();

    const { contract } = useContract(
        process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
        "nft-collection"
    );

    return (
        <div>
            <Header />

            <main className="max-w-6xl mx-auto p-10 border">
                <h1>Add an Item to the Marketplace</h1>
                <h2>Item Details</h2>
                <p>
                    By add ing an item to the marketplace, you're essentially
                    Minting an NFT of the item into your wallet which can then
                    list for sale!
                </p>
            </main>
        </div>
    );
}

export default AddItemPage;
