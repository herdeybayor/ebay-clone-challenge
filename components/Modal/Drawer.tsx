import React from "react";
import ReactModal from "react-modal";

import { IoMdClose } from "react-icons/io";
import { useTheme } from "next-themes";

interface Props {
    headerText: string;
    children: React.ReactNode;
    onModalClose?: () => void;
}

export type ModalHandle = {
    openModal: () => void;
    closeModal: () => void;
};

const DrawerModal: React.ForwardRefRenderFunction<ModalHandle, Props> = (
    { children, headerText, onModalClose },
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

    const { theme, systemTheme } = useTheme();

    return (
        <ReactModal
            style={{
                overlay: {
                    position: "fixed",
                    inset: 0,
                    backgroundColor:
                        (theme === "system" ? systemTheme : theme) === "dark"
                            ? "#ffffff30"
                            : "#00000050",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },
                content: {
                    position: "absolute",
                    right: 0,
                    background:
                        (theme === "system" ? systemTheme : theme) === "dark"
                            ? "#0f1217"
                            : "#fff",
                    overflow: "auto",
                    border: "none",
                    WebkitOverflowScrolling: "touch",
                    borderRadius: "0",
                    outline: "none",
                    height: "100%",
                },
            }}
            className="w-full md:w-[50vw] h-full p-5 pb-0 md:px-10"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Modal"
            ariaHideApp={true}
            preventScroll={true}
            closeTimeoutMS={1000}
        >
            <div className="flex flex-col relative h-full w-full">
                <div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-semibold">{headerText}</h1>
                        <div className="p-1 rounded-md active:ring-2 active:ring-gray-700 hover:bg-gray-300 transition-colors duration-200 inline-flex cursor-pointer">
                            <IoMdClose
                                onClick={closeModal}
                                className="flex-shrink-0 text-3xl"
                            />
                        </div>
                    </div>
                    <hr className="mt-2" />
                </div>

                <div className="flex flex-col">{children}</div>

                <div className="absolute bottom-0">
                    <button>Cancel</button>
                    <button>Add</button>
                </div>
            </div>
        </ReactModal>
    );
};

export default React.forwardRef(DrawerModal);
