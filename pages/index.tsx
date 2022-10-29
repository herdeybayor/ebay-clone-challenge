import { BanknotesIcon, ClockIcon } from "@heroicons/react/24/outline";
import { MediaRenderer } from "@thirdweb-dev/react";
import type { NextPage } from "next";

import { ListingType } from "@thirdweb-dev/sdk";
import Link from "next/link";
import { Header, NftSkeleton } from "../components";
import useListItem from "../utils/hooks/useListItem";

const Home: NextPage = () => {
    const { listings, loadingListings } = useListItem();

    return (
        <>
            <div className="to-pink-500[0.35] dark:to-pink-500[0.25] bg-gradient-to-tr from-purple-500/[0.35] dark:from-purple-500/[0.15] min-h-screen">
                <Header />

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
                                <Link
                                    key={listing.id}
                                    href={`/listing/${listing.id}`}
                                >
                                    <div className="group relative cursor-pointer transition duration-500 ease-in-out hover:scale-105">
                                        <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 opacity-30 blur transition duration-1000 group-hover:opacity-80"></div>
                                        <div className="relative flex items-center justify-between space-x-4 divide-gray-600 rounded-xl bg-gray-100 px-1.5 leading-none text-pink-200 transition duration-200 hover:text-purple-300 dark:bg-black sm:p-2">
                                            <div className="duration-600 w-full origin-top-left rounded-2xl p-3 sm:w-auto md:w-full">
                                                <div className="flex flex-col">
                                                    <div className="flex-1 flex flex-col pb-2 items-center">
                                                        <MediaRenderer
                                                            className="w-44"
                                                            src={
                                                                listing.asset
                                                                    .image
                                                            }
                                                        />
                                                    </div>

                                                    <div className="pt-2 space-y-4">
                                                        <h2 className="text-lg truncate text-pink-500 font-bold">
                                                            {listing.asset.name}
                                                        </h2>
                                                        <hr />
                                                        <p className="truncate text-sm text-gray-600 dark:text-white/60">
                                                            {
                                                                listing.asset
                                                                    .description
                                                            }
                                                        </p>
                                                    </div>

                                                    <p className="flex items-center space-x-1">
                                                        <span className="font-bold text-black dark:text-white">
                                                            {
                                                                listing
                                                                    .buyoutCurrencyValuePerToken
                                                                    .displayValue
                                                            }
                                                        </span>
                                                        <span className="text-">
                                                            {
                                                                listing
                                                                    .buyoutCurrencyValuePerToken
                                                                    .symbol
                                                            }
                                                        </span>
                                                    </p>

                                                    <div
                                                        className={[
                                                            "flex space-x-1 items-center justify-end text-xs w-fit ml-auto p-2 rounded-lg text-white",
                                                            listing.type ===
                                                            ListingType.Direct
                                                                ? "bg-pink-500"
                                                                : "bg-orange-600",
                                                        ].join(" ")}
                                                    >
                                                        <p>
                                                            {listing.type ===
                                                            ListingType.Direct
                                                                ? "Buy Now"
                                                                : "Auction"}
                                                        </p>
                                                        {listing.type ===
                                                        ListingType.Direct ? (
                                                            <BanknotesIcon className="h-4" />
                                                        ) : (
                                                            <ClockIcon className="h-4" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
};

export default Home;
