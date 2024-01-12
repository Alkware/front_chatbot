import { RefObject, useEffect, useRef, useState } from "react"
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom"
import { CHAT_NAME_TO_SAVE_LOCALSTORAGE } from "../../variables/variables";

interface SimulatorChat {
    active: boolean | undefined,
}

export function SimulatorChat({ active }: SimulatorChat) {
    const [chat, setChat] = useState()
    const refContentBio: RefObject<HTMLDivElement> = useRef(null);
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const chatLocalStorage = JSON.parse(localStorage.getItem(CHAT_NAME_TO_SAVE_LOCALSTORAGE) || "[]");
        if (typeof chatLocalStorage["project_name"] !== "undefined") setChat(chatLocalStorage)
    }, [searchParams])


    const handleDisplayContentBio = () => {
        const content = refContentBio.current
        if (content) {
            const isActive = content.dataset.active;
            if (isActive === "true") content.dataset.active = "false"
            else content.dataset.active = "true"
        }
    }

    return (
        (active && chat) &&
        <div className="w-1/4 min-w-[300px] max-h-[500px] bg-light rounded-xl overflow-hidden relative">

            {/* <div
                className="w-full h-[60px] bg-green-500 flex cursor-pointer"
                onClick={handleDisplayContentBio}
            >

                <div className="w-1/5 h-full flex justify-center items-center">
                    <img
                        data-islogo={!!chat.logo}
                        src={chat.logo || ""}
                        alt=""
                        className="w-[40px] h-[40px] object-cover rounded-full data-[islogo='true']:block hidden"
                    />
                    <div
                        data-islogo={!!chat.logo}
                        className="w-[40px] h-[40px] object-cover rounded-full data-[islogo='true']:hidden flex flex-col justify-center items-center text-green-900 overflow-hidden text-[8px] bg-white"
                    ><span>sem</span><span>imagem</span></div>
                </div>

                <div className="w-4/5 h-full flex items-center">
                    <h2 className="text-light font-bold whitespace-nowrap text-ellipsis overflow-hidden">{chat.project_name}</h2>
                </div>

                <div
                    ref={refContentBio}
                    data-active={false}
                    className="data-[active='false']:hidden absolute top-0 w-full h-1/2 bg-light border-b border-black"
                >
                    <div className="w-full p-3">
                        <FaX
                            className="fill-primary-100 cursor-pointer"
                        />
                    </div>

                    <div className="w-full flex justify-center items-center">
                        <img
                            src={chat.logo || ""}
                            alt=""
                            className="w-[80px] h-[80px] object-cover rounded-full"
                        />
                    </div>

                    <div className="w-full py-8 flex justify-center items-center">
                        <p className="w-4/5 text-center text-dark">{"Descrição do chat"}</p>
                    </div>

                </div>

            </div>

            <div className="w-full h-[400px] flex flex-col gap-1 py-4 px-2">
                {
                    Array(5).fill(1).map((_, index, self) =>
                        index % 2 == 0 ?
                            <div
                                key={index}
                                data-isfirstmsg={index === 0}
                                data-islastmsg={index === (self.length - 1)}
                                className="w-3/4 h-[12px] data-[isfirstmsg='true']:h-auto data-[islastmsg='true']:h-auto data-[islastmsg='true']:p-0 data-[isfirstmsg='true']:bg-green-600 data-[islastmsg='true']:bg-green-600 bg-zinc-300 data-[isfirstmsg='true']:py-1 text-light rounded-lg my-3 p-3 flex items-center"
                            >
                                {index === 0 ? chat.chat_input_message[0] : ""}
                                {
                                    (
                                        index === (self.length - 1)
                                        &&
                                        !!chat.call_to_action.length
                                        &&
                                        chat.call_to_action[0].button_text
                                        &&
                                        chat.call_to_action[0].button_text.length > 0
                                    ) &&
                                    <div className="w-full h-full flex flex-col justify-center items-center">
                                        <p className="w-full border-b border-zinc-400 p-1 px-2"> Agora basta clicar no botão abaixo:</p>
                                        <a
                                            className="flex gap-2 items-center p-2 text-light cursor-pointer text-sm"
                                            href={chat.call_to_action[0].button_link || "#"}
                                            target="_blank"
                                        >
                                            <FaExternalLinkAlt /> {chat.call_to_action[0].button_text}
                                        </a>
                                    </div>
                                }
                            </div>
                            :
                            <div
                                key={index}
                                className="w-3/4 h-[12px]  bg-zinc-300 rounded-lg p-3 self-end"
                            ></div>
                    )
                }
            </div> */}

        </div>
    )
};