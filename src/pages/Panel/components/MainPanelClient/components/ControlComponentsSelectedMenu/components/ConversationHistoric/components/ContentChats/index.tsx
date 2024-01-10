import { useContext } from "react";
import { Chat } from "../../../../../../../../../../@types/Chat";
import { ClientContext } from "../../../../../../../../../../context/ClientContext";
import { Project } from "../../../../../../../../../../@types/Project";
import { formatDate } from "../../../../../../../../../../functions/formatDate";


interface ContentChats {
    chats: Chat[],
    index: number
}

export function ContentChats({ chats, index }: ContentChats) {
    const { client } = useContext(ClientContext);


    return (
        chats.length ?
        <div className="w-2/3 h-[500px] overflow-auto flex flex-col">
            <div className="w-full flex flex-col gap-4">
                <div className="w-full h-[60px] flex items-center px-4 bg-primary-100">
                    <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
                        <img
                            src={client?.plan_management.project.find((project: Project) => chats && project.id === chats[index].project_id)?.logo}
                            alt="logo do cliente"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="px-4 text-xl">{client?.plan_management.project.find((project: any) => chats && project.id === chats[index].project_id)?.project_name}</p>
                </div>

                <div className="w-full p-4 flex flex-col gap-4 overflow-y-auto">
                    {
                        chats && chats[index].messages.map((msg, index) =>
                            <div
                                key={index}
                                data-player={msg.player}
                                className="w-full flex data-[player='1']:justify-end justify-start"
                            >
                                <div
                                    data-player={msg.player}
                                    className="bg-light text-black/80 data-[player='1']:bg-primary-200 data-[player='1']:text-light p-2 rounded-xl max-w-md"
                                >
                                    <h2
                                        className=""
                                        dangerouslySetInnerHTML={{ __html: msg.message }}
                                    ></h2>
                                    <span className="w-full flex justify-end text-xs italic">{formatDate(msg.time).shortHour}</span>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
        :
        <h2 className="w-full h-[200px] flex justify-center items-center">Ainda não existe nenhuma conversa para esse chat</h2>
    )
};