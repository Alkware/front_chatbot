import { Dispatch, SetStateAction, useContext } from "react";
import { FcSettings } from "react-icons/fc";
import { ModalEditProject } from "./components/ModalEditProject";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { Project } from "../../../../../../../../../../@types/Project";

interface EditProject {
    project: Project,
    setNewProject: Dispatch<SetStateAction<Project>>
}

export function EditProject({ project, setNewProject }: EditProject) {
    const { setModalContent } = useContext(ModalContext);

    const handleEditProject = () => {
        setModalContent({
            isOpenModal: true,
            components: <ModalEditProject setNewProject={setNewProject} project={project} />
        })
    }

    return (
        <FcSettings
            className="text-3xl hover:scale-125 transition-transform"
            onClick={handleEditProject}
        />
    )
};