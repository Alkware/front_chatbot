import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

export function Modal() {
    const { modalContent } = useContext(ModalContext);

    return (
        modalContent?.map((modal, index: number) => {
            return (
                modal.components &&
                <div
                    key={index}
                    className="w-screen h-screen backdrop-blur-sm absolute top-0 right-0 flex justify-end overflow-hidden z-[999]"
                >
                    {modal.components}
                </div>
            )
        })
    )
};