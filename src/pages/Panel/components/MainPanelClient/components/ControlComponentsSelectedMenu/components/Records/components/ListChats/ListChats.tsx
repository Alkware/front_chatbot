import { Dispatch, SetStateAction } from "react"
import { formatDate } from "../../../../../../../../../../functions/formatDate"
import { useSearchParams } from "react-router-dom";
import { MessageManager } from "../../../../../../../../../../@types/messageManager.types";


interface ListChats {
    chats: MessageManager[] | [],
    selectedChatById: Dispatch<SetStateAction<string | undefined>>
}

export function ListChats({ chats, selectedChatById }: ListChats) {
    const [searchParams, setSearchParams] = useSearchParams();
    const isOpen = searchParams.get("mobile_modal_select_chat") === "open";


    const handleSelectConversation = (id: string) => {
        searchParams.delete("mobile_modal_select_chat");
        setSearchParams(searchParams)
        selectedChatById(id)
    }

    return (
        !!chats.length &&
        <div
            data-isopen={window.innerWidth < 768 ? !!isOpen : true}
            className="w-full md:w-[400px] md:max-h-[400px] fixed md:static top-0 md:bg-transparent left-0 h-full overflow-auto flex flex-col border-r border-light/40 data-[isopen=false]:hidden"
        >
            {
                chats.map((chat, index) =>
                    chat.messages.length > 1 &&
                    <div
                        key={chat.id}
                        className="w-full cursor-pointer hover:bg-primary-200 transition-colors p-4 border border-primary-100/20"
                        onClick={() => handleSelectConversation(chat.id)}
                    >
                        <h2
                            className="whitespace-nowrap text-ellipsis overflow-hidden py-1 text-xl font-bold"
                            key={chat.messages.join()}
                        >
                            {
                                chat.messages.length > 1 ?
                                    chat.messages[1].message.replace("<br/>", "")
                                    :
                                    `Chat ${index.toString().padStart(2, "0")}`
                            }
                        </h2>
                        <div className="flex justify-between">
                            <span className="italic text-xs">{chat.messages.length} messagens</span>
                            <span className="italic text-xs">{
                                formatDate(chat.messages[chat.messages.length - 1].time).dateFormat_A
                            }</span>
                        </div>
                    </div>
                )
            }
        </div>
    )
};