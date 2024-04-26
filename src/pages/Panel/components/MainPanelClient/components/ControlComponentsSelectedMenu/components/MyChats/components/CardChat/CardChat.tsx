import { Project } from "../../../../../../../../../../@types/Project";
import { Dispatch, SetStateAction, useContext } from "react";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { FaGear, FaLink } from "react-icons/fa6";
import { ToggleComponent } from "../../../../../../../../../../components/Toggle/Toggle";
import { PopOver } from "../../../../../../../../../../components/modal/templates/PopOver";
import { updateIsOnlineProject } from "../../../../../../../../../../api/project";
import { PopUp } from "../../../../../../../../../../components/modal/templates/PopUp";
import { TipContainer } from "../../../../../../../../../../components/TipContainer/TipContainer";
import { useNavigate } from "react-router-dom";
import { ShareProject } from "./components/ShareProject";
import { ModalEditChat } from "../EditProject/components/ModalEditChat/ModalEditChat";
import { Prompt } from "../../../../../../../../../../@types/prompt.types";

interface CardChat {
    project: Project,
    setNewProject: Dispatch<SetStateAction<any>>
    prompts: Prompt[]

}

export function CardChat({ project, setNewProject, prompts }: CardChat) {
    const { setModalContent } = useContext(ModalContext);
    const navigate = useNavigate();

    const handleEditProject = () => {
        setModalContent({
            componentName: "modal_edit_project",
            components:
                <PopUp>
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
                <PopUp>
                    <ShareProject
                        slug={project.slug}
                    />
                </PopUp>
        })
    }


    const handleDisplayMetric = ({ target }: any) => {
        if (target.dataset.metric) navigate("/panel?tab=1")
    }

    return (
        project &&
        <div
            key={project.slug}
            className="w-1/4 min-w-[200px] bg-primary-100 dark:bg-gray text-light relative flex flex-col items-center gap-2 cursor-pointer rounded-xl"
            onClick={handleDisplayMetric}
            data-metric
        >
            <div
                className="w-full flex justify-between items-center gap-2 p-2"
            >
                <div className="flex justify-center gap-2">
                    <TipContainer tip="Veja todos os seus links">
                        <FaLink
                            className=" text-xl"
                            onClick={handleGetLinks}
                        />
                    </TipContainer>
                    <TipContainer tip="Edite seu chat">
                        <FaGear
                            className="text-xl"
                            onClick={handleEditProject}
                        />
                    </TipContainer>
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
                data-metric
            >
                <img
                    src={project.logo || "https://via.placeholder.com/100"}
                    alt="imagem do projeto"
                    className="w-full h-full object-cover"
                />
            </div>
            <h2 className="text-center py-4 font-bold text-lg" data-metric>{project.project_name}</h2>
        </div>
    )
};