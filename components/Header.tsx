import React from "react";
import { useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import Image from "next/image";

import {
    HiOutlineBell,
    HiOutlineShoppingCart,
    HiOutlineChevronDown,
} from "react-icons/hi";

import { SlMagnifier } from "react-icons/sl";

import Modal, { ModalHandle } from "./Modal";
import ThemeToggler from "./ThemeToggler";
import ConnectModalContent from "./ConnectModalContent";

type Props = {};

function Header({}: Props) {
    const address = useAddress();

    const modalRef = React.useRef<ModalHandle>(null);

    const openModal = () => {
        modalRef.current?.openModal();
    };

    const closeModal = () => {
        modalRef.current?.closeModal();
    };

    return (
        <>
            <div className="max-w-6xl mx-auto p-2">
                <nav className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-sm">
                        <button
                            onClick={openModal}
                            className="connectWalletBtn"
                        >
                            {address
                                ? `Hi, ${address.slice(0, 5)}...${address.slice(
                                      -4
                                  )}`
                                : "Connect Wallet"}
                        </button>

                        <p className="headerLink">Daily Deals</p>
                        <p className="headerLink">Help & Contact</p>
                    </div>

                    <ThemeToggler />

                    <div className="flex item-center space-x-4 text-sm">
                        <p className="headerLink">Ship to</p>
                        <p className="headerLink">Sell</p>
                        <p className="headerLink">Watchlist</p>

                        <Link
                            href="/addItem"
                            className="flex items-center hover:link"
                        >
                            Add to Inventory{" "}
                            <HiOutlineChevronDown className="text-base" />
                        </Link>

                        <HiOutlineBell className="text-2xl cursor-pointer hover:scale-125 transition" />
                        <HiOutlineShoppingCart className="text-2xl cursor-pointer hover:scale-125 transition" />
                    </div>
                </nav>

                <hr className="mt-2" />

                <section className="flex items-center space-x-2 py-5">
                    <div className="h-16 w-16 sm:w-28 md:w-76 cursor-pointer flex-shrink-0 relative">
                        <Link href="/">
                            <Image
                                className="h-full w-full object-contain"
                                src="https://links.papareact.com/bdb"
                                width={100}
                                height={100}
                                alt="logo"
                            />
                        </Link>
                    </div>

                    <button className="hidden lg:flex items-center space-x-2 w-20">
                        <p className="text-gray-600 dark:text-white/50 text-sm">
                            Shop by Category
                        </p>
                        <HiOutlineChevronDown className="flex-shrink-0 text-sm" />
                    </button>

                    <div className="flex items-center space-x-2 px-2 md:px-5 py-2 border-black dark:border-gray-400 border-2 flex-1">
                        <SlMagnifier className="text-gray-400" />
                        <input
                            className="outline-none flex-1 bg-transparent"
                            placeholder="Search for Anything"
                            type="text"
                        />
                    </div>

                    <button className="hidden md:inline-flex bg-blue-600 text-white px-5 md:px-10 py-2 border-2 border-blue-600">
                        Search
                    </button>
                    <Link href="/create">
                        <button className="hidden md:inline-flex bg-transparent text-blue-600 px-5 md:px-10 py-2 border-2 border-blue-600 hover:bg-blue-600/50 hover:text-white transition-colors duration-200">
                            List Item
                        </button>
                    </Link>
                </section>
                <hr />
            </div>

            {/* Connect to Wallet Modal */}
            <Modal noCancelButton ref={modalRef}>
                <ConnectModalContent
                    address={address}
                    closeModal={closeModal}
                />
            </Modal>
        </>
    );
}

export default Header;
