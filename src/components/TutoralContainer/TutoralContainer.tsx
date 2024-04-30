import { RefObject, useContext, useRef } from "react"
import { IoCaretDownOutline } from "react-icons/io5";
import { ClientContext } from "../../context/ClientContext";
import { updateTutorialClient } from "../../api/client";

interface TutorialContainer {
    children: any,
    title: string,
    text: string,
    position?: "BOTTOM" | "TOP",
    hidden?: boolean;
}

export function TutoralContainer({ children, title, text, position = "BOTTOM", hidden }: TutorialContainer) {
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
                className="data-[hidden=true]:hidden data-[active=false]:hidden w-screen h-screen backdrop-blur-sm fixed top-0 left-0 z-50"
            ></div>
            <div
                data-active={client.tutorial}
                ref={ballonTutorialRef}
                data-position={position}
                data-hidden={hidden}
                className={
                    `border border-light/40 bg-primary-100 p-1 rounded-xl absolute z-50 left-1/2 -translate-x-1/2 
                    data-[position=TOP]:-top-full data-[position=TOP]:-translate-y-full data-[position=BOTTOM]:-bottom-full data-[position=BOTTOM]:translate-y-full
                    text-center transition-opacity  data-[hidden=true]:hidden data-[active=false]:hidden`
                }
            >

                <div
                    className=" bg-primary-100 rounded-md flex flex-col justify-center items-center px-4"
                >
                    <h2 className="text-center py-2 font-bold text-xl text-light">{title}</h2>
                    <p
                        className="w-[400px] px-4 text-center text-light text-lg"
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
                    data-position={position}
                    className="border-light/40 fill-primary-100 absolute left-1/2 -translate-x-1/2 data-[position='BOTTOM']:top-0 data-[position='BOTTOM']:-translate-y-[78%] data-[position='BOTTOM']:rotate-180"
                />
            </div>
            <div
                data-hidden={hidden}
                className="z-50 data-[hidden=true]:z-0"
            >
                {children}
            </div>
        </div>
    )
};