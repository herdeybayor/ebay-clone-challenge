import { InformationCircleIcon, PhotoIcon } from "@heroicons/react/24/outline";
import React from "react";

type Props = {
    image: File | null;
    setImage: (image: File | null) => void;
    name: string;
    setName: (name: string) => void;
    description: string;
    setDescription: (description: string) => void;
};

function MintItem({
    image,
    setImage,
    name,
    setName,
    description,
    setDescription,
}: Props) {
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    React.useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                setImageUrl(reader.result as string | null)
            );
            reader.readAsDataURL(image);
        }
    }, [image]);

    return (
        <main className="mt-5 space-y-5">
            <form className="flex flex-col space-y-6">
                {/* Upload Image */}
                <div className="flex flex-col justify-center items-center space-y-4">
                    <div className="inline-flex justify-center items-center h-24 w-24 rounded-md overflow-hidden bg-gray-100 shadow-md border border-gray-200">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="item"
                                className="h-full w-full object-contain"
                            />
                        ) : (
                            <PhotoIcon className="h-10 w-10 text-gray-400" />
                        )}
                    </div>
                    <button
                        type="button"
                        className="bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <label
                            htmlFor="image"
                            className="cursor-pointer py-2 px-3 inline-flex"
                        >
                            {image ? "Change" : "Upload"} Image
                        </label>
                    </button>
                    <input
                        id="image"
                        name="image"
                        type="file"
                        className="hidden"
                        onChange={onFileChange}
                        accept="image/*"
                        required
                    />
                </div>

                {/* Name */}
                <div>
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Name of Item
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Sonny"
                        value={name}
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Sangha"
                        value={description}
                        required
                    />
                </div>
            </form>

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
        </main>
    );
}

export default MintItem;
