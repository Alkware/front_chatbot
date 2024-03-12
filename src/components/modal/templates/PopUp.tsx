import { useContext } from "react"
import { ModalContext } from "../../../context/ModalContext"

interface PopUp {
    children: any
    noBackground?: boolean
}

export function PopUp({ children, noBackground }: PopUp) {
    const { clearModal } = useContext(ModalContext)

    const handleCloseModal = ({ target }: any) => {
        if (target.dataset.close)  clearModal(null, { clearLast: true })
    }

    return (
        <div
            className="w-full h-full flex justify-center items-center"
            data-close
            onClick={handleCloseModal}
        >
            <div 
                data-nobackground={!!noBackground}
                className="data-[nobackground=true]:bg-transparent dark:data-[nobackground=true]:bg-transparent data-[nobackground=true]:border-none p-4 bg-primary-100 text-light dark:bg-primary-300 border border-primary-100 rounded-md"
            >
                {children}
            </div>
        </div>
    )
};