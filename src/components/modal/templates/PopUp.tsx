import { useContext } from "react"
import { ModalContext } from "../../../context/ModalContext"

interface PopUp {
    children: any
    noBackground?: boolean
    positionModal?: "START" | "CENTER" | "END"
}

export function PopUp({ children, noBackground, positionModal }: PopUp) {
    const { clearModal } = useContext(ModalContext)

    const handleCloseModal = ({ target }: any) => {
        if (target.dataset.close) clearModal(null, { clearLast: true })
    }

    return (
        <div
            data-position={(!!positionModal && window.innerWidth < 768) ? positionModal : "CENTER"}
            className="w-full h-full flex justify-center overflow-auto data-[position='CENTER']:items-center data-[position='START']:items-start data-[position='END']:items-end"
            onClick={handleCloseModal}
            data-close
        >
            <div
                data-nobackground={!!noBackground}
                className=" bg-light text-primary-100 dark:text-white dark:bg-primary-300 border border-primary-100 md:rounded-md data-[nobackground=true]:bg-transparent dark:data-[nobackground=true]:bg-transparent data-[nobackground=true]:border-none relative "
            >
                {children}
            </div>
        </div>
    )
};