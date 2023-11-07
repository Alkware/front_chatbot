import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

export function Modal() {
    const { modalContent, setModalContent } = useContext(ModalContext);

    const handleCloseModal = ({ target }: any) => {
        if (target.dataset.container) {
            setModalContent({ isOpenModal: false })
        }
    }

    return (
        modalContent?.isOpenModal &&
        <div
            className="w-screen h-screen backdrop-blur-sm absolute top-0 right-0 flex justify-end overflow-hidden"
            onClick={handleCloseModal}
            data-container
        >
            {modalContent?.components}
        </div>
    )
};