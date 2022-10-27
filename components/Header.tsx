import React from "react";
import { useAddress } from "@thirdweb-dev/react";

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
            <div>
                <nav>
                    <div>
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
                    </div>
                </nav>
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
