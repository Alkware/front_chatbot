import { Dispatch, SetStateAction } from "react"
import { Chat } from "../../../../../../../../../../@types/Chat"
import { formatDate } from "../../../../../../../../../../functions/formatDate"


interface ListChats {
    chats: Chat[] | [],
    setIndex: Dispatch<SetStateAction<number>>
}

export function ListChats({ chats, setIndex }: ListChats) {

    const handleSelectConversation = (indexConversation: number) => {
        setIndex(indexConversation)
    }

    return (
        <div className="w-1/3 flex flex-col border-r border-light/40">
            {
                chats?.map((chat, index) =>
                    <div
                        key={chat.id}
                        className="w-full  cursor-pointer hover:bg-primary-200 transition-colors p-4 border border-primary-100/20"
                        onClick={() => handleSelectConversation(index)}
                    >
                        <h2
                            className="whitespace-nowrap text-ellipsis overflow-hidden py-1 text-xl font-bold"
                            key={chat.messages.join()}
                        >
                            {chat.messages[1].message.replace("<br/>", "")}
                        </h2>
                        <div className="flex justify-between">
                            <span className="italic text-xs">{chat.messages.length} messagens</span>
                            <span className="italic text-xs">{formatDate(chat.messages[chat.messages.length - 1].time).dateFormat_A}</span>
                        </div>
                    </div>
                )
            }
        </div>
    )
};