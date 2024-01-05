import { Dispatch, SetStateAction, useContext } from "react";
import { FcSettings } from "react-icons/fc";
import { ModalEditProject } from "./components/ModalEditProject/ModalEditProject";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { Project } from "../../../../../../../../../../@types/Project";
import { Prompt } from "../../../../../../../../../../@types/prompt.types";

interface EditProject {
    project: Project,
    setNewProject: Dispatch<SetStateAction<Project>>
    prompts: Prompt[]
}

export function EditProject({ project, setNewProject, prompts }: EditProject) {
    const { setModalContent } = useContext(ModalContext);

    const handleEditProject = () => {
        setModalContent({
            isOpenModal: true,
            components: 
            <ModalEditProject
                setNewProject={setNewProject}
                project={project}
                prompts={prompts}
            />
        })
    }

    return (
        <FcSettings
            className="text-3xl hover:scale-125 transition-transform"
            onClick={handleEditProject}
        />
    )
};