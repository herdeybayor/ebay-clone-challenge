import { UserCircleIcon } from "@heroicons/react/24/solid";
import {
    MediaRenderer,
    useContract,
    useListing,
    useNetwork,
    useNetworkMismatch,
    useBuyNow,
    useAddress,
    useMakeOffer,
    useOffers,
    useMakeBid,
    useAcceptDirectListingOffer,
} from "@thirdweb-dev/react";
import { ListingType, NATIVE_TOKENS } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import React from "react";
import Countdown from "react-countdown";
import { RaceBy, Ring } from "@uiball/loaders";
import toast from "react-hot-toast";

import { ButtonNeon, Header, ListingCard } from "../../components";
import network from "../../utils/network";
import useColorTheme from "../../utils/useColorTheme";
import { ethers } from "ethers";

type Props = {};

function ListingPage({}: Props) {
    const router = useRouter();
    const { listingId } = router.query as { listingId: string };
    const [minimumNextBid, setMinimumNextBid] = React.useState<{
        displayValue: string;
        symbol: string;
    }>();

    const [bidAmount, setBidAmount] = React.useState<string>("");
    const [, switchNetwork] = useNetwork();
    const networkMismatch = useNetworkMismatch();

    const { contract } = useContract(
        process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
        "marketplace"
    );

    const {
        mutate: buyNow,
        isLoading: isBuying,
        error: buyError,
    } = useBuyNow(contract);

    const { data: listing, isLoading, error } = useListing(contract, listingId);

    const {
        mutate: makeOffer,
        isLoading: isMakingOffer,
        error: makeOfferError,
    } = useMakeOffer(contract);

    const {
        data: offers,
        isLoading: isLoadingOffers,
        error: offersError,
    } = useOffers(contract, listingId);

    const {
        mutate: makeBid,
        isLoading: isMakingBid,
        error: makeBidError,
    } = useMakeBid(contract);

    const {
        mutate: acceptOffer,
        isLoading: isAcceptingOffer,
        error: acceptOfferError,
    } = useAcceptDirectListingOffer(contract);

    const formatPlaceholder = () => {
        if (!listing) return;

        if (listing.type === ListingType.Direct) {
            return "Enter Offer Amount";
        }

        if (listing.type === ListingType.Auction) {
            return Number(minimumNextBid?.displayValue) === 0
                ? "Enter Bid Amount"
                : `min. ${minimumNextBid?.displayValue} ${minimumNextBid?.symbol}`;

            // TODO: Add support for bid increments
        }
    };

    React.useEffect(() => {
        if (!listingId || !contract || !listing) return;

        if (listing.type === ListingType.Auction) {
            fetchMinNextBid();
        }
    }, [listingId, contract, listing]);

    const fetchMinNextBid = async () => {
        if (!listingId || !contract) return;

        const minBidResponse = await contract.auction.getMinimumNextBid(
            listingId
        );

        setMinimumNextBid({
            displayValue: minBidResponse.displayValue,
            symbol: minBidResponse.symbol,
        });
    };

    const address = useAddress();

    const buyNft = async () => {
        if (!address) {
            toast.error("Please connect your wallet first");
            return;
        }

        if (networkMismatch) {
            switchNetwork && switchNetwork(network);
            return;
        }

        if (!listingId || !contract || !listing) return;

        toast.loading("Buying NFT...");

        await buyNow(
            {
                id: listingId,
                buyAmount: 1,
                type: listing.type,
            },
            {
                onSuccess: () => {
                    toast.dismiss();
                    toast.success("NFT bought successfully!");
                    router.push("/");
                },
                onError: (error, variable, context) => {
                    toast.dismiss();
                    toast.error("Error buying NFT");
                    console.log({ error, variable, context });
                },
            }
        );
    };

    const createBidOrOffer = async () => {
        if (!address) {
            toast.error("Please connect your wallet first");
            return;
        }
        try {
            if (networkMismatch) {
                switchNetwork && switchNetwork(network);
                return;
            }

            // Direct Listing
            if (listing?.type === ListingType.Direct) {
                if (
                    listing.buyoutPrice.toString() ===
                    ethers.utils.parseEther(bidAmount).toString()
                ) {
                    buyNft();
                    return;
                }

                toast.loading("Making offer...");
                await makeOffer(
                    {
                        listingId,
                        quantity: 1,
                        pricePerToken: bidAmount,
                    },
                    {
                        onSuccess: () => {
                            toast.dismiss();
                            toast.success("Offer made successfully!");
                            setBidAmount("");
                        },
                        onError: (error: any, variable, context) => {
                            toast.dismiss();
                            toast.error(error.message || "Error making offer");
                            console.log({ error, variable, context });
                        },
                    }
                );
            }

            // Auction Listing
            if (listing?.type === ListingType.Auction) {
                toast.loading("Making bid...");
                await makeBid(
                    {
                        listingId,
                        bid: bidAmount,
                    },
                    {
                        onSuccess: () => {
                            toast.dismiss();
                            toast.success("Bid made successfully!");
                            setBidAmount("");
                        },
                        onError: (error: any, variable, context) => {
                            toast.dismiss();
                            toast.error(error.message || "Error making bid");
                            console.log({ error, variable, context });
                        },
                    }
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    const theme = useColorTheme();

    const acceptDirectOffer = async (offer: Record<string, any>) => {
        if (!address) {
            toast.error("Please connect your wallet first");
            return;
        }

        if (networkMismatch) {
            switchNetwork && switchNetwork(network);
            return;
        }

        if (!listingId || !contract) return;

        toast.loading("Accepting offer...");

        await acceptOffer(
            {
                listingId,
                addressOfOfferor: offer.offeror,
            },
            {
                onSuccess: () => {
                    toast.dismiss();
                    toast.success("Offer accepted successfully!");
                },
                onError: (error: any, variable, context) => {
                    toast.dismiss();
                    toast.error(error.message || "Error accepting offer");
                    console.log({ error, variable, context });
                },
            }
        );
    };

    return (
        <div className="to-pink-500[0.35] dark:to-pink-500[0.25] bg-gradient-to-tr from-purple-500/[0.35] dark:from-purple-500/[0.15] min-h-screen pb-20 md:pb-10">
            <Header />

            {isLoading && (
                <div className="flex mt-10 w-full justify-center">
                    <RaceBy
                        size={80}
                        lineWeight={5}
                        speed={1.4}
                        color={theme === "dark" ? "#fff" : "rgb(236 72 153)"}
                    />
                </div>
            )}

            {!listing && !isLoading && <h1 className="">Listing not fount</h1>}

            {!isLoading && listing && (
                <main className="max-w-6xl mx-auto p-2 flex flex-col lg:flex-row space-y-10 space-x-5 pr-10">
                    <div className="p-10 mx-auto lg:mx-0 max-w-md xl:max-w-6xl">
                        <ListingCard noHover>
                            <div className="-m-5 cursor-default rounded-lg overflow-hidden ring-8 ring-pink-500 group-hover:rotate-1 transition-transform duration-200 ease-out">
                                <MediaRenderer src={listing.asset.image} />
                            </div>
                        </ListingCard>
                    </div>

                    <section className="flex-1 space-y-5">
                        <div className="">
                            <h1 className="text-xl font-bold">
                                {listing.asset.name}
                            </h1>
                            <p className="text-gray-600">
                                {listing.asset.description}
                            </p>
                            <p className="flex items-center text-xs sm:text-base space-x-1">
                                <UserCircleIcon className="h-5" />
                                <span className="font-bold pr-1">Seller </span>
                                {listing.sellerAddress}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 items-center py-2">
                            <p className="font-bold">Listing Type:</p>
                            <p>
                                {listing.type === ListingType.Direct
                                    ? "Direct Listing"
                                    : "Auction Listing"}
                            </p>

                            <p className="font-bold">Buy it Now Price:</p>
                            <p className="text-4xl font-bold">
                                {
                                    listing.buyoutCurrencyValuePerToken
                                        .displayValue
                                }{" "}
                                {listing.buyoutCurrencyValuePerToken.symbol}
                            </p>

                            {/* <button className="col-start-2 mt-2 bg-pink-500 font-bold text-white rounded-full w-44 py-4 px-10">
                                    Buy Now
                                </button> */}

                            <button
                                onClick={buyNft}
                                className="group relative col-start-2 mt-5 font-bold rounded-full w-44 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={
                                    isBuying || isMakingOffer || isMakingBid
                                }
                            >
                                <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 opacity-30 blur transition duration-1000 group-hover:opacity-100 w-44"></div>
                                <div className="neonBtn bg-pink-500 dark:bg-pink-500 py-4 px-10 w-44 rounded-full text-white hover:text-white">
                                    {isBuying ||
                                    isMakingOffer ||
                                    isMakingBid ? (
                                        <Ring
                                            size={20}
                                            lineWeight={5}
                                            speed={2}
                                            color="white"
                                        />
                                    ) : (
                                        "Buy Now"
                                    )}
                                </div>
                            </button>
                        </div>

                        {/* TODO: If DIRECT, show offers here... */}
                        {listing.type === ListingType.Direct && offers && (
                            <div className="grid grid-cols-2 gap-y-2">
                                <p className="font-bold">Offers: </p>
                                <p className="font-bold">
                                    {offers.length > 0 ? offers.length : 0}
                                </p>

                                {offers.map((offer) => (
                                    <>
                                        <p className="flex items-center ml-5 text-sm italic">
                                            <UserCircleIcon className="h-3 mr-2" />
                                            {offer.offeror.slice(0, 5)}...
                                            {offer.offeror.slice(-5)}
                                        </p>
                                        <div>
                                            <p
                                                key={
                                                    offer.listingId +
                                                    offer.offeror +
                                                    offer.totalOfferAmount.toString()
                                                }
                                                className="text-sm italic"
                                            >
                                                {ethers.utils.formatEther(
                                                    offer.totalOfferAmount
                                                )}{" "}
                                                {NATIVE_TOKENS[network].symbol}
                                            </p>

                                            {listing.sellerAddress ===
                                                address && (
                                                <button
                                                    onClick={() =>
                                                        acceptDirectOffer(offer)
                                                    }
                                                    className="p-2 w-32 bg-red-500/50 rounded-lg font-bold text-xs cursor-pointer"
                                                >
                                                    Accept Offer
                                                </button>
                                            )}
                                        </div>
                                    </>
                                ))}
                            </div>
                        )}

                        <div className="grid grid-cols-2 space-y-2 items-center justify-end">
                            <hr className="col-span-2" />

                            <p className="col-span-2 font-bold">
                                {listing.type === ListingType.Direct
                                    ? "Make an offer"
                                    : "Bid on this Auction"}
                            </p>

                            {/* FIXME: Remaining time on auction goes here... */}
                            {listing.type === ListingType.Auction && (
                                <>
                                    <p className="">Current Minimum Bid: </p>
                                    <p className="font-bold">
                                        {minimumNextBid?.displayValue}{" "}
                                        {minimumNextBid?.symbol}
                                    </p>
                                    <p className="">Time Remaining</p>
                                    <Countdown
                                        date={
                                            Number(
                                                listing.endTimeInEpochSeconds.toString()
                                            ) * 1000
                                        }
                                    />
                                </>
                            )}

                            <input
                                className="border p-2 rounded-lg mr-5 outline-none"
                                type="text"
                                placeholder={formatPlaceholder()}
                                value={bidAmount}
                                onChange={(e) => setBidAmount(e.target.value)}
                            />
                            <button
                                onClick={createBidOrOffer}
                                className="group relative col-start-2 mt-5 font-bold rounded-full w-44 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={
                                    isBuying || isMakingOffer || isMakingBid
                                }
                            >
                                <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 opacity-30 blur transition duration-1000 group-hover:opacity-100 w-44"></div>
                                <div className="neonBtn bg-orange-500 dark:bg-orange-500 py-4 px-10 w-44 rounded-full text-white hover:text-white">
                                    {isBuying ||
                                    isMakingOffer ||
                                    isMakingBid ? (
                                        <Ring
                                            size={20}
                                            lineWeight={5}
                                            speed={2}
                                            color="white"
                                        />
                                    ) : (
                                        <>
                                            {listing.type === ListingType.Direct
                                                ? "Offer"
                                                : "Bid"}
                                        </>
                                    )}
                                </div>
                            </button>
                        </div>
                    </section>
                </main>
            )}
        </div>
    );
}

export default ListingPage;
