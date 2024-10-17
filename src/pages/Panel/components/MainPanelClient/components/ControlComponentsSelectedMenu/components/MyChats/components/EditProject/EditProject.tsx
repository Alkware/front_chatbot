import { Dispatch, SetStateAction, useContext } from "react";
import { FcSettings } from "react-icons/fc";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { Project } from "../../../../../../../../../../@types/Project";
import { ModalEditChat } from "./components/ModalEditChat/ModalEditChat";
import { Artificial_Intelligence } from "../../../../../../../../../../@types/artificialInteligence.types";

interface EditProject {
    project: Project,
    setNewProject: Dispatch<SetStateAction<Project[]>>
    ai: Artificial_Intelligence[]
}

export function EditProject({ project, setNewProject, ai }: EditProject) {
    const { setModalContent } = useContext(ModalContext);

    const handleEditProject = () => {
        setModalContent({
            componentName: "modal_open_modal_edit",
            components: 
            <ModalEditChat
                setProjects={setNewProject}
                project={project}
                ai={ai}
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