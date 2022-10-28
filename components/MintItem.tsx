import { InformationCircleIcon, PhotoIcon } from "@heroicons/react/24/outline";
import React from "react";

type Props = {};

function MintItem({}: Props) {
    return (
        <main className="mt-3 space-y-5">
            <p className="text-xs flex space-x-1 items-center text-blue-600/80">
                <InformationCircleIcon
                    cursor={"pointer"}
                    title="By add ing an item to the marketplace, you're
                            essentially Minting an NFT of the item into your
                            wallet which can then list for sale!"
                    className="h-4 w-4 flex-shrink-0"
                />
                <span>
                    By add ing an item to the marketplace, you're essentially
                    Minting an NFT of the item into your wallet which can then
                    list for sale!
                </span>
            </p>

            {/* Upload Image */}
            <div className="">
                <div className="flex flex-col justify-center items-center space-y-2">
                    <div className="inline-flex justify-center items-center h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                        <PhotoIcon className="h-10 w-10" />
                    </div>
                    <label htmlFor="image">
                        <button
                            type="button"
                            className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Add Image
                        </button>
                    </label>
                </div>
            </div>
        </main>
    );
}

export default MintItem;
