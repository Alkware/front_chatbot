import { RefObject, useContext, useEffect, useRef } from "react"
import { ModalContext } from "../../../context/ModalContext";

export function PopUp({ message }: { message: string }) {
    const { setModalContent } = useContext(ModalContext)
    const contentRef: RefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {
        const timeOut = setTimeout(()=>{
            contentRef.current?.classList.add("-translate-x-[50px]")
            const timeout2 = setTimeout(()=>{
                contentRef.current?.classList.add("translate-x-0")
                contentRef.current?.classList.remove("-translate-x-[50px]")
                clearTimeout(timeout2)
            }, 200)
            clearTimeout(timeOut)
        }, 10)
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
        }, 25)

        return () => clearInterval(interval)
    }, [])

    return (
        <div
            className="w-full h-full flex justify-end items-start mt-12 translate-x-full transition-transform duration-200"
            ref={contentRef}
        >
            <div className="bg-blue_main2 rounded-lg overflow-hidden shadow-sm shadow-white/20">
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