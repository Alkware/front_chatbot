import { RefObject, useContext, useEffect, useRef } from "react"
import { ModalContext } from "../../../context/ModalContext";

export function PopOver({ message }: { message: string }) {
    const { setModalContent } = useContext(ModalContext)
    const contentRef: RefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {

        const progress: HTMLDivElement | null | undefined = contentRef.current?.querySelector("div#progress")
        let counter = 0

        if (!progress) return

        const interval = setInterval(() => {
            progress.style.width = counter+"%"

            if(counter === 100){
                clearInterval(interval)
                setModalContent({
                    isOpenModal: false
                })
            }

            counter+= 1;
        }, 30)

        return () => clearInterval(interval)
    }, [])

    return (
        <div
            className="w-screen h-screen flex justify-end items-start mt-12 animate-jump-screen"
            ref={contentRef}
        >
            <div className="bg-blue_main2 rounded-lg shadow-sm shadow-white/20">
                <div className="p-4 w-full">
                    <h2>{message}</h2>
                </div>
                <div
                    className={`w-[0%] h-[5px] bg-white`}
                    id="progress"
                ></div>
            </div>
        </div>
    )
};