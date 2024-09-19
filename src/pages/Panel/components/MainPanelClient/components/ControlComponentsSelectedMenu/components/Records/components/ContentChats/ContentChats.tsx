import { useContext } from "react";
import { ClientContext } from "../../../../../../../../../../context/ClientContext";
import { formatDate } from "../../../../../../../../../../functions/formatDate";
import { Message, MessageManager } from "../../../../../../../../../../@types/messageManager.types";
import { TipContainer } from "../../../../../../../../../../components/TipContainer/TipContainer";
import { useSearchParams } from "react-router-dom";
import { FILTER_BY_PROJECT_NAME_URL, TAB_NAME_URL } from "../../../../../../../../../../variables/variables";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";


interface ContentChats {
    chats: MessageManager[],
    selectedChatById: string | undefined
}

export function ContentChats({ chats, selectedChatById }: ContentChats) {
    const { client } = useContext(ClientContext);
    const [param, setParam] = useSearchParams();
    const { historic_messages, messages, project_id, lead_collected } = chats.find(chat => chat.id === selectedChatById) || chats[0];
    const joinMessageWithHistoricMessage = [...historic_messages, ...messages];
    const project = client?.plan_management.project.find(project => project.id === project_id);

    // Função responsável por levar o usuário até a lista de leads...
    const handleDisplayLeadsCollected = () => {
        const project_name = project?.project_name.replaceAll(" ", "_");
        if (project_name) param.set(FILTER_BY_PROJECT_NAME_URL, project_name)
        param.set(TAB_NAME_URL, "leads");
        setParam(param);
    }

    return (
        <div className="w-full h-full md:max-h-[400px] overflow-hidden flex flex-col mb-8 md:mb-0" >
            <div className="w-full h-full flex flex-col gap-4">
                <div className="w-full h-[60px] flex justify-between items-center px-4 bg-primary-100">
                    <div className="flex gap-2 items-center">
                        <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
                            <img
                                src={"https://via.placeholder.com/100"}
                                alt="logo do cliente"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="px-4 text-xl text-light">{project?.project_name}</p>
                    </div>
                    <div
                        className="flex gap-2 items-center cursor-pointer"
                        onClick={handleDisplayLeadsCollected}
                    >
                        {!!lead_collected.find(lead => lead.email || lead.cell_phone)
                            ?
                            <TipContainer
                                tip="informações foram coletadas nesse chat"
                                positionX="LEFT"
                                positionY="BOTTOM"
                            >
                                <FaCheckCircle className="fill-green-200" />
                            </TipContainer>
                            :
                            <TipContainer
                                tip="Nenhuma informação foi coletada"
                                positionX="LEFT"
                                positionY="BOTTOM"
                            >
                                <FaCircleQuestion className="fill-red-200" />
                            </TipContainer>}
                    </div>
                </div>

                <div className="w-full h-full max-h-[320px] p-4 flex flex-col gap-4 overflow-auto">
                    {
                        joinMessageWithHistoricMessage?.map((msg: Message, index) =>
                            <div
                                key={index}
                                data-player={msg.player}
                                className="w-full flex data-[player='user']:justify-end justify-start"
                            >
                                <div
                                    data-player={msg.player}
                                    className="max-w-[80%] bg-primary-100/50 dark:bg-light text-black/80 data-[player='user']:bg-primary-100 dark:data-[player='user']:bg-primary-200 data-[player='user']:text-light p-2 rounded-xl"
                                >
                                    <h2
                                        dangerouslySetInnerHTML={{ __html: msg.message }}
                                    ></h2>
                                    <span className="w-full flex justify-end text-xs italic">{formatDate(msg.time).shortHour}</span>
                                </div>
                            </div>
                        )
                        ||
                        <h2 className="w-full h-[200px] flex justify-center items-center">Ainda não existe nenhuma conversa para esse chat</h2>

                    }
                </div>
            </div>
        </div >
    )
};