import { Dispatch, SetStateAction, useContext } from "react";
import { FcSettings } from "react-icons/fc";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { Project } from "../../../../../../../../../../@types/Project";
import { Prompt } from "../../../../../../../../../../@types/prompt.types";
import { ModalEditChat } from "./components/ModalEditChat/ModalEditChat";

interface EditProject {
    project: Project,
    setNewProject: Dispatch<SetStateAction<Project[]>>
    prompts: Prompt[]
}

export function EditProject({ project, setNewProject, prompts }: EditProject) {
    const { setModalContent } = useContext(ModalContext);

    const handleEditProject = () => {
        setModalContent({
            componentName: "modal_open_modal_edit",
            components: 
            <ModalEditChat
                setProjects={setNewProject}
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