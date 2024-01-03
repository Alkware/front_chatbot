import { useContext } from "react"
import { ModalContext } from "../../../context/ModalContext"

interface PopUp {
    children: any
}

export function PopUp({ children }: PopUp) {
    const { setModalContent } = useContext(ModalContext)

    const handleCloseModal = ({ target }: any) => {
        if (target.dataset.close)
            setModalContent({
                isOpenModal: false,
            })
    }

    return (
        <div
            className="w-full h-full flex justify-center items-center"
            data-close
            onClick={handleCloseModal}
        >
            <div className="p-4 bg-primary-100 text-light dark:bg-primary-300 border border-primary-100 rounded-md">
                {children}
            </div>
        </div>
    )
};