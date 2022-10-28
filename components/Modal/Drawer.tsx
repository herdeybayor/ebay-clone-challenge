import React from "react";
import ReactModal from "react-modal";

import { IoMdClose } from "react-icons/io";
import { useTheme } from "next-themes";

interface Props {
    headerText: string;
    children: React.ReactNode;
    onModalClose?: () => void;
    onSuccessClick?: () => void;
    successBtnText?: string;
}

export type ModalHandle = {
    openModal: () => void;
    closeModal: () => void;
};

const DrawerModal: React.ForwardRefRenderFunction<ModalHandle, Props> = (
    { children, headerText, onModalClose, onSuccessClick, successBtnText },
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
            className="w-full md:w-[50vw] h-full p-5 pb-0 md:px-10 drawer"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Modal"
            ariaHideApp={true}
            preventScroll={true}
            closeTimeoutMS={1000}
        >
            <div className="flex flex-col justify-between relative h-full w-full">
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

                <div className="flex flex-col flex-1">{children}</div>

                <div className="absolute left-0 bottom-0 border-t w-[calc(100%+40px)] md:w-[calc(100%+80px)] -mx-5 md:-mx-10 px-5 md:px-10 py-4 flex justify-end space-x-5">
                    <button
                        onClick={closeModal}
                        className="outline-none px-5 font-medium border-2 border-blue-500 py-2 rounded-md text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onSuccessClick?.();
                        }}
                        className="outline-none px-5 font-medium border-2 border-blue-500 py-2 rounded-md text-white bg-blue-500"
                    >
                        {successBtnText || "Add"}
                    </button>
                </div>
            </div>
        </ReactModal>
    );
};

export default React.forwardRef(DrawerModal);