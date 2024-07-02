import { useContext, useEffect, useState } from "react";
import { ListChats } from "./components/ListChats/ListChats";
import { ContentChats } from "./components/ContentChats/ContentChats";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import { ClientContext } from "../../../../../../../../context/ClientContext";
import { Project } from "../../../../../../../../@types/Project";
import { convertDateInHour } from "../../../../../../../../functions/convertDateInHour";
import { Container } from "../../../../../../../../components/Container/Container";
import { TipContainer } from "../../../../../../../../components/TipContainer/TipContainer";
import { SelectTime } from "../../../../../../../../components/SelectTime/SelectTime";
import { Options, Select } from "../../../../../../../../components/Select/Select";
import { Button } from "../../../../../../../../components/button/Button";
import { MessageManager } from "../../../../../../../../@types/messageManager.types";
import { FILTER_BY_PROJECT_NAME_URL, FILTER_BY_TIME_NAME_URL } from "../../../../../../../../variables/variables";


export function ConversationHistoric() {
    const { client } = useContext(ClientContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedChatById, setSelectedChatById] = useState<string>();
    const [chats, setChats] = useState<MessageManager[]>([]);
    // Obtem o projeto selecionado...
    const projectParam = searchParams.get(FILTER_BY_PROJECT_NAME_URL);




    // Cria uma lista de objeto para ser usado em um select...
    const projects: Options[] | undefined = client?.plan_management?.project.map((project: Project) => {
        return {
            id: project.project_name.replace(" ", "_"),
            value: project.project_name,
            text: project.project_name
        }
    });


    // Assim que o componente é montado é feito um filtro nos chats...
    useEffect(() => {
        // Obtem o filtro de tempo dos chats...
        const time = searchParams.get(FILTER_BY_TIME_NAME_URL);
        if (client) {
            if (projects?.length) {
                let projectsFiltered;
                // Filtra por projeto...
                if (projectParam) projectsFiltered = client.plan_management.project.filter((project) => project.project_name.replaceAll(" ", "_") === projectParam && project);
                else projectsFiltered = client.plan_management.project;

                // Filtra por tempo...
                const chats = projectsFiltered.map((project: Project) => {
                    const chats = project.message_manager.filter(chat => {
                        return Number(time) ? convertDateInHour(chat.created_at) <= Number(time) : true
                    })
                    return chats;
                }).flat();

                setChats(chats)
            }
        }
    }, [searchParams])


    // Função que seleciona um chat...
    const handleSelectProject = (id: string) => {
        searchParams.set("project", id.replaceAll(" ", "_"))
        setSearchParams(searchParams)
    }

    // Função responsavél por buscar novos dados da api...
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

    // Função responsável por remover a query params 'filter_time' da URL...
    const onDelete = () => {
        searchParams.delete("project")
        setSearchParams(searchParams)
    }

    return (
        <Container title="Conversas" className="flex items-center">

            <div className="w-[90%] flex flex-col-reverse md:flex-row md:justify-end gap-2 md:gap-8 md:h-[40px] px-4 md:px-0">
                <TipContainer tip="Selecione um chat">
                    <Select
                        name="select_chat"
                        title="Selecione um chat"
                        options={projects || []}
                        optionsDefault={projectParam ? Array.of(projectParam) : null}
                        onSelected={handleSelectProject}
                        onDelete={onDelete}
                    />
                </TipContainer>

                <div className="flex gap-8 justify-between">
                    <TipContainer tip="Selecione uma data  como filtro">
                        <SelectTime />
                    </TipContainer>


                    <TipContainer
                        tip="Atualize seus chats"
                        positionX="LEFT"
                    >
                        <div
                            className="p-2 bg-light dark:bg-gray border border-primary-100 rounded-md cursor-pointer"
                            onClick={reloadMetric}
                        >
                            <FaArrowRotateLeft className="text-nxl" />
                        </div>
                    </TipContainer>
                </div>
            </div>

            <div className="w-[90%] h-3/4 flex gap-4 flex-col md:flex-row md:bg-light md:dark:bg-gray my-4 border border-primary-200 rounded-md">
                {/* Esse botão só será exibido no mobile */}
                <Button
                    customClass="bg-primary-100 dark:bg-primary-200 md:hidden"
                    onClick={handleOpenModalSelectChatOnMobile}
                >Selecione um chat </Button>


                <ListChats
                    chats={chats}
                    selectedChatById={setSelectedChatById}
                />

                {!!chats.length ?
                    <ContentChats
                        chats={chats}
                        selectedChatById={selectedChatById}
                    />
                    :
                    <h2 className="p-4 text-center w-full">Você ainda não teve acessos no seu chat</h2>
                }
            </div>
        </Container>
    )
};