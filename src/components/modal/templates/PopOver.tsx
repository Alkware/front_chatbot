import { MouseEvent, RefObject, useContext, useEffect, useRef } from "react"
import { ModalContext } from "../../../context/ModalContext";
import { MdInfo, MdWarning, MdOutlet } from "react-icons/md";

interface PopOver {
    message: string,
    type?: "INFORMATION" | "WARNING" | "ERROR",
    functionAfterComplete?: () => void,
    componentName: `modal_${string}`
}

export function PopOver({ message, type = "INFORMATION", functionAfterComplete, componentName }: PopOver) {
    const { clearModal } = useContext(ModalContext)
    const contentRef: RefObject<HTMLDivElement> = useRef(null);
    const background = type === "INFORMATION" ? "bg-primary-100" : type === "WARNING" ? "bg-orange-500/70" : "bg-red-800/70";
    const icon = type === "INFORMATION" ? <MdInfo className="text-3xl" /> : type === "WARNING" ? <MdWarning className="text-3xl" /> : <MdOutlet className="text-3xl" />
    const TIME_PROGRESSING = ((message?.length) / 2) + 10

    useEffect(() => {
        window.scrollTo({ behavior: "smooth", top: 0 })
        const progress: HTMLDivElement | null | undefined = contentRef.current?.querySelector("div#progress")
        let counter = 0

        if (!progress) return

        const interval = setInterval(() => {
            progress.style.width = counter + "%"

            if (counter === 100) {
                clearInterval(interval)
                clearModal(componentName)
                // Função que será executada após o termino do progress da modal
                functionAfterComplete && functionAfterComplete();
            }

            counter += 1;
        }, TIME_PROGRESSING)

        return () => clearInterval(interval)
    }, [])

    const handleCloseModal = (e: MouseEvent<HTMLDivElement>) => {
        const isModal = e.currentTarget.dataset.testid;

        if(!!isModal) clearModal(componentName)
    }   

    return (
        <div
            className="w-screen h-screen text-light flex justify-end items-start md:mt-12 animate-jump-screen z-[999]"
            ref={contentRef}
            data-testid="modal-pop-over"
            onClick={handleCloseModal}
        >
            <div
                className={`w-full md:w-auto max-w-[400px] ${background} md:rounded-lg shadow-sm shadow-white/20`}
            >
                <div className="flex justify-center items-center px-4">
                    {icon}
                    <div className="p-4 w-full">
                        <h2>{message}</h2>
                    </div>
                </div>
                <div
                    className={`w-[0%] h-[5px] bg-white`}
                    id="progress"
                ></div>
            </div>
        </div>
    )
};