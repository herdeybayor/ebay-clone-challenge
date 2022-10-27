import React from "react";
import {
    useDisconnect,
    useMetamask,
    useWalletConnect,
    useCoinbaseWallet,
} from "@thirdweb-dev/react";
import { VscDebugDisconnect } from "react-icons/vsc";

type Props = {
    address: string | undefined;
    closeModal: () => void;
};

function ConnectModalContent({ address, closeModal }: Props) {
    const connectWithMetaMask = useMetamask();
    const connectWithWalletConnect = useWalletConnect();
    const connectWithCoinbaseWallet = useCoinbaseWallet();

    const disconnect = useDisconnect();
    return (
        <div className="max-w-[300px]">
            {!address ? (
                <div className="space-y-3">
                    <div className="">
                        <h2 className="text-2xl font-semibold">
                            Connect Wallet
                        </h2>
                        <p className="text-gray-500 text-sm">
                            User your connected wallet to fill out the form
                            automatically.
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <button
                            onClick={() => {
                                connectWithMetaMask();
                            }}
                            className="py-3 text-sm bg-blue-500 text-white rounded-md"
                        >
                            Connect Metamask
                        </button>
                        <button
                            onClick={() => {
                                connectWithCoinbaseWallet();
                            }}
                            className="py-3 text-sm bg-blue-500 text-white rounded-md"
                        >
                            Connect Coinbase Wallet
                        </button>
                        <button
                            onClick={() => {
                                connectWithWalletConnect();
                            }}
                            className="py-3 text-sm bg-blue-500 text-white rounded-md"
                        >
                            Connect WalletConnect
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-5">
                    <h4 className="font-semibold text-sm text-gray-500 text-center">
                        ${address.slice(0, 4)}...${address.slice(-3)}
                    </h4>

                    <button
                        className="px-5 py-2 rounded border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300 flex space-x-1 items-center"
                        onClick={() => {
                            disconnect();
                            closeModal();
                        }}
                    >
                        <VscDebugDisconnect />
                        <span>Disconnect</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default ConnectModalContent;
