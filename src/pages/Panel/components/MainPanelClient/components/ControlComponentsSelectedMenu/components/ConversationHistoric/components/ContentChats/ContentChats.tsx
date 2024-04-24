import { useContext, useEffect, useState } from "react";
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
    const [infoChat, setInfoChat] = useState<{ logoChat: string, projectName: string }>();


    useEffect(() => {
        if (chats.length) {
            const logoChat = client?.plan_management.project.find((project: Project) => chats && project.id === chats[index].project_id)?.logo
            const projectName = client?.plan_management.project.find((project: any) => chats && project.id === chats[index].project_id)?.project_name

            if (logoChat && projectName) {
                setInfoChat({ logoChat, projectName })
            }
        }
    }, [])

    return (
        infoChat &&
        <div className="w-full h-full flex flex-col" >
            <div className="w-full h-full flex flex-col gap-4">
                <div className="w-full h-[60px] flex items-center px-4 bg-primary-100">
                    <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
                        <img
                            src={infoChat?.logoChat}
                            alt="logo do cliente"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="px-4 text-xl text-light dark:text-primary-100">{infoChat?.projectName}</p>
                </div>

                <div className="w-full h-full p-4 flex flex-col gap-4 overflow-auto">
                    {
                        chats[index]?.messages ? chats[index].messages.map((msg, index) =>
                            <div
                                key={index}
                                data-player={msg.player}
                                className="w-full flex data-[player='1']:justify-end justify-start"
                            >
                                <div
                                    data-player={msg.player}
                                    className="bg-primary-100/50 dark:bg-light text-black/80 data-[player='1']:bg-primary-100 dark:data-[player='1']:bg-primary-200 data-[player='1']:text-light p-2 rounded-xl max-w-md"
                                >
                                    <h2
                                        className=""
                                        dangerouslySetInnerHTML={{ __html: msg.message }}
                                    ></h2>
                                    <span className="w-full flex justify-end text-xs italic">{formatDate(msg.time).shortHour}</span>
                                </div>
                            </div>
                        )
                            :
                            <h2 className="w-full h-[200px] flex justify-center items-center">Ainda não existe nenhuma conversa para esse chat</h2>

                    }
                </div>
            </div>
        </div >
    )
};