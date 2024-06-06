import { useContext, useEffect, useState } from "react";
import { ClientContext } from "../../../../../../../../../../context/ClientContext";
import { Project } from "../../../../../../../../../../@types/Project";
import { formatDate } from "../../../../../../../../../../functions/formatDate";
import { Lead_collected, Message, PlanMessageManager } from "../../../../../../../../../../@types/planMessageManager.types";
import { MdLeaderboard } from "react-icons/md";
import { TipContainer } from "../../../../../../../../../../components/TipContainer/TipContainer";
import { useSearchParams } from "react-router-dom";


interface ContentChats {
    planMessageManager: PlanMessageManager[],
    index: number
}

interface InfoChat {
    logoChat: string;
    projectName: string;
    leads: Lead_collected[];
}

export function ContentChats({ planMessageManager, index }: ContentChats) {
    const { client } = useContext(ClientContext);
    const [infoChat, setInfoChat] = useState<InfoChat>();
    const [param, setParam] = useSearchParams();


    useEffect(() => {
        if (planMessageManager.length) {
            const logoChat = client?.plan_management.project.find((project: Project) => planMessageManager && project.id === project.id)?.logo
            const projects = client?.plan_management.project.find((project: any) => planMessageManager && project.id === project.id);
            const projectName = projects?.project_name
            const leads = projects?.plan_message_manager.map(msg => msg.lead_collected).flat();

            if (logoChat && projectName && leads?.length) {
                setInfoChat({ logoChat, projectName, leads })
            }
        }
    }, [])


    const handleDisplayLeadsCollected = () => {
        param.set("tab", "leads");
        setParam(param);
    }

    return (
        infoChat &&
        <div className="w-full h-full flex flex-col mb-8 md:mb-0" >
            <div className="w-full h-full flex flex-col gap-4">
                <div className="w-full h-[60px] flex justify-between items-center px-4 bg-primary-100">
                    <div className="flex gap-2 items-center">
                        <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
                            <img
                                src={infoChat?.logoChat}
                                alt="logo do cliente"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="px-4 text-xl text-light">{infoChat?.projectName}</p>
                    </div>
                    <TipContainer tip="Leads coletados" positionX="LEFT">
                        <div
                            className="flex gap-2 items-center cursor-pointer"
                            onClick={handleDisplayLeadsCollected}
                        >
                            <MdLeaderboard />
                            {infoChat.leads.filter(lead => lead.email || lead.name || lead.cell_phone && lead).length}
                        </div>
                    </TipContainer>
                </div>

                <div className="w-full h-full max-h-[400px] p-4 flex flex-col gap-4 overflow-auto">
                    {
                        planMessageManager[index]?.messages ? planMessageManager[index].messages.map((msg: Message, index) =>
                            <div
                                key={index}
                                data-player={msg.player}
                                className="w-full flex data-[player='1']:justify-end justify-start"
                            >
                                <div
                                    data-player={msg.player}
                                    className="max-w-[80%] bg-primary-100/50 dark:bg-light text-black/80 data-[player='1']:bg-primary-100 dark:data-[player='1']:bg-primary-200 data-[player='1']:text-light p-2 rounded-xl"
                                >
                                    <h2
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