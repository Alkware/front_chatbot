import { RefObject, useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom";

interface MainDevice {
    messages: Array<{ id: number, isUser: boolean, text: string, link?: boolean }>
    size?: "BIG" | "SMALL"
}

export function MainDevice({ messages, size }:MainDevice) {
    const [params, setParams] = useSearchParams();
    const releasedMessages = Number(params.get("released_messages")) || 0;
    const containerMessagesRef: RefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {
        containerMessagesRef.current?.scrollBy({ behavior: "smooth", top: 1000 })

        const interval = setInterval(() => {
            const newReleasedMessages = messages.length > releasedMessages ? (releasedMessages + 1).toString() : -1;
            params.set("released_messages", newReleasedMessages.toString());
            setParams(params)
        }, 5000)

        return () => clearInterval(interval)

    }, [releasedMessages])


    return (
        <div 
            ref={containerMessagesRef}
            className="h-[75%] flex flex-col gap-2 w-full p-2 overflow-y-auto "
            >
            {
                messages.map((msg, index) => {
                    return (index) < (releasedMessages) &&
                        <div
                            key={msg.id}
                            data-isuser={msg.isUser}
                            data-size={size}
                            className="group data-[size='SMALL']:w-[90%] w-3/4 bg-light rounded-md text-dark p-2 data-[isuser=true]:self-end data-[isuser=true]:bg-[#c2c0f7]"
                        >
                            <p
                                className="text-base group-data-[size='SMALL']:text-sm  group-data-[size='SMALL']:leading-[.95rem]"    
                            >{msg.text}</p>
                            <p 
                                data-link={!!msg.link}
                                className="underline  group-data-[size='SMALL']:text-sm  text-blue-500 cursor-pointer text-center border-t border-dark/30 py-2 data-[link=false]:hidden"
                            >Contratar agora</p>
                        </div>
                })
            }

        </div>
    )
};