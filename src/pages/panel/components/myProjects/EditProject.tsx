import { useContext } from "react";
import { FcSettings } from "react-icons/fc";
import { ModalContext } from "../../../../context/ModalContext";
import { ModalEditProject } from "../../modals/ModalEditProject";
import { SetStateProject } from "../../../../@types/projectTypes";


export function EditProject({ project, setNewProject }: SetStateProject) {
    const { setModalContent } = useContext(ModalContext);

    const handleEditProject = () => {
        setModalContent({
            isOpenModal: true,
            components: <ModalEditProject setNewProject={setNewProject} project={project}/>
        })
    }

    return (
        <FcSettings
            className="text-3xl hover:scale-125 transition-transform"
            onClick={handleEditProject}
        />
    )
};