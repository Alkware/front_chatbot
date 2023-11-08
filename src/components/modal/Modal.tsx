import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

export function Modal() {
    const { modalContent } = useContext(ModalContext);

    return (
        modalContent?.isOpenModal &&
        <div
            className="w-screen h-screen backdrop-blur-sm absolute top-0 right-0 flex justify-end overflow-hidden"
        >
            {modalContent?.components}
        </div>
    )
};