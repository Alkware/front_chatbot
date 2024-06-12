import { RefObject, useContext, useRef } from "react"
import { IoCaretDownOutline } from "react-icons/io5";
import { ClientContext } from "../../context/ClientContext";
import { updateTutorialClient } from "../../api/client";

interface TutorialContainer {
    children: any,
    title: string,
    text: string,
    hidden?: boolean;
    positionY?: "BOTTOM" | "TOP";
    positionX?: "LEFT" | "CENTER" | "RIGHT";
}

export function TutoralContainer({ children, title, text, positionY = "BOTTOM", positionX = "CENTER", hidden }: TutorialContainer) {
    const ballonTutorialRef: RefObject<HTMLDivElement> = useRef(null);
    const { client, setClient } = useContext(ClientContext)

    const handleUpdateTutorial = async () => {
        if (client) {
            const clientUpdated = await updateTutorialClient(client.id, false);
            setClient(clientUpdated)
        }
    }

    return (
        client &&
        <div
            className="flex items-center relative group"
        >
            <div
                data-active={client.tutorial}
                data-hidden={hidden}
                className="data-[hidden=true]:hidden data-[active=false]:hidden w-screen h-screen backdrop-blur-sm fixed top-0 left-0 z-40"
            ></div>
            <div
                data-active={client.tutorial}
                ref={ballonTutorialRef}
                data-positiony={positionY}
                data-positionx={positionX}
                data-hidden={hidden}
                className={
                    `max-w-[70vw] border border-light/40 bg-primary-100 p-1 rounded-xl absolute z-40 
                    data-[positiony=TOP]:-top-full data-[positiony=TOP]:-translate-y-3 data-[positiony=BOTTOM]:-bottom-full data-[positiony=BOTTOM]:translate-y-[90%]
                    data-[positionx=RIGHT]:left-4/5 data-[positionx=CENTER]:left-1/2 data-[positionx=CENTER]:-translate-x-1/2 data-[positionx=LEFT]:right-0
                    text-center transition-opacity data-[hidden=true]:hidden data-[active=false]:hidden`
                }
            >

                <div
                    className="bg-primary-100 rounded-md flex flex-col justify-center items-center px-4"
                >
                    <h2 className="text-center py-2 font-bold text-xl text-light">{title}</h2>
                    <p
                        className="w-[70vw] md:w-[400px] px-4 text-center text-light text-lg"
                        dangerouslySetInnerHTML={{ __html: text }}
                    ></p>

                    <div className="w-full flex justify-center mt-8 text-light text-base">
                        <span
                            className="underline opacity-70 cursor-pointer"
                            onClick={handleUpdateTutorial}
                        >Pular tutorial</span>
                    </div>
                </div>

                <IoCaretDownOutline
                    data-positiony={positionY}
                    data-positionx={positionX}
                    className={
                        `border-light/40 fill-primary-100 absolute 
                        data-[positiony='BOTTOM']:top-0 data-[positiony='BOTTOM']:-translate-y-[78%] data-[positiony='BOTTOM']:rotate-180
                        data-[positionx='LEFT']:right-2 data-[positionx='CENTER']:left-1/2 data-[positionx=CENTER]:-translate-x-1/2
                        `
                    }
                />
            </div>
            <div
                data-hidden={hidden}
                className="z-40 data-[hidden=true]:z-0"
            >
                {children}
            </div>
        </div>
    )
};