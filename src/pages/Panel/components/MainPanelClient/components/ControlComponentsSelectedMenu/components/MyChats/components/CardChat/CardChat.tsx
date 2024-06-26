import { Project } from "../../../../../../../../../../@types/Project";
import { Dispatch, SetStateAction, useContext } from "react";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { ToggleComponent } from "../../../../../../../../../../components/Toggle/Toggle";
import { PopOver } from "../../../../../../../../../../components/modal/templates/PopOver";
import { updateIsOnlineProject } from "../../../../../../../../../../api/project";
import { PopUp } from "../../../../../../../../../../components/modal/templates/PopUp";
import { TipContainer } from "../../../../../../../../../../components/TipContainer/TipContainer";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ShareProject } from "./components/ShareProject/ShareProject";
import { ModalEditChat } from "../EditProject/components/ModalEditChat/ModalEditChat";
import { Database } from "../../../../../../../../../../@types/Database.types";
import { TutoralContainer } from "../../../../../../../../../../components/TutoralContainer/TutoralContainer";
import { updateTutorialClient } from "../../../../../../../../../../api/client";
import { ClientContext } from "../../../../../../../../../../context/ClientContext";
import { Client } from "../../../../../../../../../../@types/Client";
import { FaChartColumn, FaGear, FaLink } from "react-icons/fa6";

interface CardChat {
    project: Project,
    setNewProject: Dispatch<SetStateAction<any>>
    prompts: Database[]

}

export function CardChat({ project, setNewProject, prompts }: CardChat) {
    const { client, setClient } = useContext(ClientContext);
    const { setModalContent } = useContext(ModalContext);
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();

    const handleEditProject = async () => {
        if (params.get("tour") === "2") {
            params.set("tour", "0")
            setParams(params)
            if (client) {
                const clientResponse: Client = await updateTutorialClient(client.id, false);
                setClient(clientResponse)
            }
        }

        setModalContent({
            componentName: "modal_edit_project",
            components:
                <PopUp positionModal="START">
                    <ModalEditChat
                        setProjects={setNewProject}
                        project={project}
                        prompts={prompts}
                    />
                </PopUp>
        })
    }

    const handleSaveStatusProject = async (prop: any, slug: string | undefined) => {
        if (!slug) {
            setModalContent({
                componentName: "modal_failed_updated_status_chat",
                components:
                    <PopOver
                        message="Falha ao atualizar o status do chat, reinicie a página e tente novamente"
                        componentName="modal_failed_updated_status_chat"
                        type="WARNING"
                    />
            })

            return false
        }

        const response = await updateIsOnlineProject(prop, slug);
        if (response?.status === 200) {
            // Atualiza a lista de projetos
            setNewProject((projects: any) => {
                // busca o projeto que teve seu status alterado e altera para o novo status
                projects.find((project: any) => project.id === response.data.id).is_online = response.data.is_online;
                return projects
            })
            return true
        }
        else {
            setModalContent({
                componentName: "modal_failed_updated_status_chat_02",
                components:
                    <PopOver
                        message="Falha ao atualizar o status do chat, reinicie a página e tente novamente"
                        componentName="modal_failed_updated_status_chat_02"
                        type="WARNING"
                    />
            })
            return false
        }
    }

    const handleGetLinks = () => {
        // adiciona 'tour' parametro a url indicando que o usuário foi para o 2° parte do tutorial;
        params.set("tour", "2");
        setParams(params);

        // Verifica se existe uma slug, caso não exista, avisa o cliente da falha.
        if (!project.slug) {
            setModalContent({
                componentName: "modal_failed_display_link",
                components: <PopOver message="Falha ao exibir seus links" type="ERROR" componentName="modal_failed_display_link" />
            })
            return
        }

        setModalContent({
            componentName: "modal_display_share_project",
            components:
                <PopUp positionModal="START">
                    <ShareProject
                        slug={project.slug}
                    />
                </PopUp>
        })
    }

    return (
        project &&
        <div
            key={project.slug}
            className="w-full text-light relative flex flex-col items-center gap-2 cursor-pointer rounded-xl"
        >
            <div
                className="w-full flex justify-between items-center gap-2 p-2"
            >
                <div className="flex justify-center gap-2">
                    <TutoralContainer
                        title="Vamos acessar seu chat"
                        text="Clique aqui em cima para obter seu link ou para pegar o código do widget"
                        positionX="RIGHT"
                        hidden={params.get("tour") === "2" || params.get("tour") === "0"}
                    >
                        <TipContainer tip="Veja todos os seus links">
                            <FaLink
                                className="text-xl"
                                onClick={handleGetLinks}
                            />
                        </TipContainer>
                    </TutoralContainer>

                    <TutoralContainer
                        title="Vamos personalizar seu chat"
                        text="Agora que já viu como funciona, vamos conhecer como podemos deixar ele de acordo com a sua marca!"
                        positionX={window.innerWidth >= 768 ? "RIGHT" : window.innerWidth <= 480 ? "RIGHT" : "CENTER"}
                        hidden={params.get("tour") !== "2"}
                    >
                        <TipContainer tip="Edite seu chat">
                            <FaGear
                                className="text-xl"
                                onClick={handleEditProject}
                            />
                        </TipContainer>
                    </TutoralContainer>

                </div>
                <div className="flex justify-center">
                    <TipContainer tip="Ative ou desative seu chat">
                        <ToggleComponent
                            isActive={project.is_online}
                            template="onOff"
                            cb={(prop) => { return handleSaveStatusProject(prop, project.slug) }}
                        />
                    </TipContainer>
                </div>
            </div>

            <div
                className="w-[150px] h-[110px] rounded-xl overflow-hidden"
            >
                <img
                    src={project.logo || "https://via.placeholder.com/100"}
                    alt="imagem do projeto"
                    className="w-full h-full object-cover"
                    onClick={()=> window.open(`https://chat.wipzee.com/${project.slug}`)}
                />
            </div>
            <h2
                className="text-center py-4 font-bold text-xl flex gap-2 items-center "
                onClick={()=> navigate("/panel?tab=metrics")}
            >
                <FaChartColumn />
                {project.project_name}
            </h2>
        </div>
    )
};