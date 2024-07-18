import { RefObject, useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom";

interface MainDevice {
    messages: Array<{ id: number, isUser: boolean, text: string, link?: boolean }>
}

export function MainDevice({ messages }:MainDevice) {
    const [params, setParams] = useSearchParams();
    const releasedMessages = Number(params.get("released_messages")) || 0;
    const containerMessagesRef: RefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {
        containerMessagesRef.current?.scrollBy({ behavior: "smooth", top: 1000 })

        const interval = setInterval(() => {
            const newReleasedMessages = messages.length > releasedMessages ? (releasedMessages + 1).toString() : 0;
            params.set("released_messages", newReleasedMessages.toString());
            setParams(params)
        }, 5000)

        return () => clearInterval(interval)

    }, [releasedMessages])


    return (
        <div 
            ref={containerMessagesRef}
            className="h-[65%] flex flex-col gap-2 w-full p-2 overflow-y-auto "
            >
            {
                messages.map((msg, index) => {
                    return index < Number(releasedMessages) &&
                        <div
                            key={msg.id}
                            data-isuser={msg.isUser}
                            className="w-[90%] bg-light rounded-md text-dark p-2 data-[isuser=true]:self-end data-[isuser=true]:bg-[#c2c0f7]"
                        >
                            <p
                                className="leading-5"    
                            >{msg.text}</p>
                            <p 
                                data-link={!!msg.link}
                                className="underline text-blue-500 cursor-pointer text-center border-t border-dark/30 py-2 data-[link=false]:hidden"
                            >Contratar agora</p>
                        </div>
                })
            }

        </div>
    )
};