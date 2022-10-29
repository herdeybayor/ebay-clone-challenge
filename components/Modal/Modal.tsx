import React from "react";
import ReactModal from "react-modal";

import { IoMdClose } from "react-icons/io";
import { useTheme } from "next-themes";
import useColorTheme from "../../utils/useColorTheme";

interface Props {
    noCancelButton?: boolean;
    children: React.ReactNode;
    onModalClose?: () => void;
}

export type ModalHandle = {
    openModal: () => void;
    closeModal: () => void;
};

const Modal: React.ForwardRefRenderFunction<ModalHandle, Props> = (
    { children, noCancelButton, onModalClose },
    ref
) => {
    const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        onModalClose && onModalClose();
    };

    React.useImperativeHandle(
        ref,
        () => ({
            openModal: openModal,
            closeModal: closeModal,
        }),
        []
    );

    React.useEffect(() => {
        ReactModal.setAppElement("body");
    }, []);

    const theme = useColorTheme();

    return (
        <ReactModal
            style={{
                overlay: {
                    position: "fixed",
                    inset: 0,
                    backgroundColor:
                        theme === "dark" ? "#ffffff30" : "#00000050",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },
                content: {
                    position: "absolute",
                    inset: "auto",
                    background: theme === "dark" ? "#0f1217" : "#fff",
                    overflow: "auto",
                    border: "none",
                    WebkitOverflowScrolling: "touch",
                    borderRadius: "4px",
                    outline: "none",
                    padding: "20px",
                    maxHeight: "60vh",
                },
            }}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Modal"
            ariaHideApp={true}
            preventScroll={true}
        >
            <div className="flex flex-col text-chumBlack">
                {!noCancelButton && (
                    <div
                        onClick={closeModal}
                        className="bg-[#D9D9D94D]/30 active:scale-125 transition-transform duration-300 cursor-pointer p-3 rounded-full ml-auto"
                    >
                        <IoMdClose className="flex-shrink-0" />
                    </div>
                )}
                {children}
            </div>
        </ReactModal>
    );
};

export default React.forwardRef(Modal);
