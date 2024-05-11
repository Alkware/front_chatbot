import { useContext, useEffect, useState } from "react";
import { ListChats } from "./components/ListChats/ListChats";
import { ContentChats } from "./components/ContentChats/ContentChats";
import { IoIosChatboxes } from "react-icons/io";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import { ClientContext } from "../../../../../../../../context/ClientContext";
import { Chat } from "../../../../../../../../@types/Chat";
import { Project } from "../../../../../../../../@types/Project";
import { convertDateInHour } from "../../../../../../../../functions/convertDateInHour";
import { Container } from "../../../../../../../../components/Container/Container";
import { TipContainer } from "../../../../../../../../components/TipContainer/TipContainer";
import { SelectTime } from "../../../../../../../../components/SelectTime/SelectTime";
import { Select } from "../../../../../../../../components/Select/Select";
import { Button } from "../../../../../../../../components/button/Button";


export function ConversationHistoric() {
    const { client } = useContext(ClientContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [index, setIndex] = useState<number>(0);
    const [chats, setChats] = useState<Chat[]>([]);

    const projects = client?.plan_management?.project.map((project: Project) => Object({ id: project.project_name.replace(" ", "_"), name: project.project_name }))

    useEffect(() => {
        const time = searchParams.get("filter_time_chats")
        const projectParam = searchParams.get("project")
        if (client) {

            if (projects?.length) {

                let projectsFiltered;
                if (projectParam) {
                    projectsFiltered = client.plan_management.project.filter((project) => project.project_name.replace(" ", "_") === projectParam && project);
                } else {
                    projectsFiltered = client.plan_management.project;
                }


                const chats = projectsFiltered.map((project: Project) => {
                    const chat = project.chat.filter(chat => Number(time) ? convertDateInHour(chat.created_at) <= Number(time) : true)
                    return chat
                }).flat();


                setChats(chats)
            }
        }

    }, [searchParams])


    const handleSelectProject = ({ target }: any) => {
        const index = target.selectedIndex
        const selected = target.options[index].value
        const newUrlParams = new URLSearchParams(searchParams)
        newUrlParams.set("project", selected)
        setSearchParams(newUrlParams)
    }

    const reloadMetric = async ({ currentTarget }: any) => {

        if (client?.plan_management) {
            const icon: SVGAElement = currentTarget.querySelector("svg")
            icon.classList.add("rotate-[-360deg]", "transition-transform", "duration-1000")



            const timeout = setTimeout(() => {
                icon.classList.remove("rotate-[-360deg]", "transition-transform", "duration-1000")
                clearTimeout(timeout)
            }, 1000);
        }
    }

    // função que só estará disponível no mobile
    const handleOpenModalSelectChatOnMobile = () => {
        searchParams.append("mobile_modal_select_chat", "open");
        setSearchParams(searchParams)
    }

    return (
        <Container title="Registros" className="px-0 md:px-8">

            <div className="w-full flex flex-col-reverse md:flex-row gap-2 md:gap-8 md:h-[40px]  px-4 md:px-0">
                <TipContainer tip="Selecione um chat">
                    <Select
                        title="Selecione um chat"
                        options={projects || []}
                        Icon={IoIosChatboxes}
                        handleSelectDatabase={handleSelectProject}
                    />
                </TipContainer>

                <div className="flex gap-8 justify-between">
                    <TipContainer tip="Selecione uma data  como filtro">
                        <SelectTime typeFilter="filter_time_chats" />
                    </TipContainer>


                    <TipContainer tip="Atualize seus chats">
                        <div
                            className="p-2 bg-light dark:bg-gray border border-primary-100 rounded-md cursor-pointer"
                            onClick={reloadMetric}
                        >
                            <FaArrowRotateLeft className="text-xl" />
                        </div>
                    </TipContainer>
                </div>
            </div>

            <div className="w-full h-3/4 flex gap-4 flex-col md:flex-row md:bg-light md:dark:bg-gray my-4 overflow-hidden px-2">
                {/* Esse botão só será exibido no mobile */}
                <Button
                    customClass="bg-primary-100 dark:bg-primary-200 md:hidden"
                    onClick={handleOpenModalSelectChatOnMobile}

                >Selecione um chat </Button>


                <ListChats
                    chats={chats}
                    setIndex={setIndex}
                />
                {
                    !!chats.length &&
                    <ContentChats
                        chats={chats}
                        index={index}
                    />
                }
            </div>
        </Container>
    )
};