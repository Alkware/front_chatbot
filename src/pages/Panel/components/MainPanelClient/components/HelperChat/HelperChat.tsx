import { useState } from "react";
import { RiChatSmile2Fill } from "react-icons/ri";

interface HelperChat { }

export function HelperChat({ }: HelperChat) {
    const [openChat, setOpenChat] = useState<boolean>(false);

    const handleDisplayChat = () => {
        setOpenChat(v => !v);
    }

    return (
        <div className="fixed bottom-8 right-8 flex justify-center gap-2 items-end cursor-pointer">
            <span className="font-bold">Precisa de ajuda?</span>
            <RiChatSmile2Fill
                className="size-10 fill-primary-100"
                onClick={handleDisplayChat}
            />
            <div
                data-display={!!openChat}
                className="data-[display=false]:hidden fixed z-20 bottom-20 right-10 w-[90vw] h-[150vw] lg:w-[30vw] lg:h-[40vw] rounded-lg overflow-hidden"
                id="wipzee-chat"
            ></div>
        </div>
    )
};