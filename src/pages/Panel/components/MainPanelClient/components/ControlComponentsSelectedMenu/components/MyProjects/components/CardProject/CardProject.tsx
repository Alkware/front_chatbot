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
import { ModalEditProject } from "../EditProject/components/ModalEditProject/ModalEditProject";
import { Prompt } from "../../../../../../../../../../@types/prompt.types";

interface CardProject {
    project: Project,
    setNewProject: Dispatch<SetStateAction<any>>
    prompts: Prompt[]

}

export function CardProject({ project, setNewProject, prompts }: CardProject) {
    const { setModalContent } = useContext(ModalContext);
    const navigate = useNavigate();

    const handleEditProject = () => {
        setModalContent({
            isOpenModal: true,
            components:
                <PopUp>
                    <ModalEditProject
                        setNewProject={setNewProject}
                        project={project}
                        prompts={prompts}
                    />
                </PopUp>
        })
    }

    const handleSaveStatusProject = async (prop: any, slug: string | undefined) => {
        if (!slug) {
            setModalContent({
                isOpenModal: true,
                components: <PopOver message="Falha ao atualizar o status do chat, reinicie a página e tente novamanete" type="WARNING" />
            })

            return false
        }

        const response = await updateIsOnlineProject(prop, slug);
        if (response?.status === 200) return true
        else {
            setModalContent({
                isOpenModal: true,
                components: <PopOver message="Falha ao atualizar o status do chat, reinicie a página e tente novamanete" type="WARNING" />
            })
            return false
        }
    }

    const handleGetLinks = () => {
        if (!project.slug) {
            setModalContent({ isOpenModal: true, components: <PopOver message="Falha ao exibir seus links" type="ERROR" /> })
            return
        }

        setModalContent({
            isOpenModal: true,
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
            className="w-1/4 min-w-[200px] bg-gray  relative flex flex-col items-center gap-2 cursor-pointer rounded-xl"
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