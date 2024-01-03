import { deleteProject, updateProject } from "../../../../api/project";
import { useContext } from "react";
import { ModalContext } from "../../../../context/ModalContext";
import { FcFile, FcFullTrash, FcUpload } from "react-icons/fc";
import { PopOver } from "../../../modal/templates/PopOver";

interface ButtonsModalTypes {
    project?: any,
    setNewProject: (projects: any) => void,
}

export function ButtonsModal({ project, setNewProject }: ButtonsModalTypes) {
    const { setModalContent } = useContext(ModalContext)


    const handleDeleteProject = async () => {
        const confirmDelete = confirm("Você tem certeza que deseja excluir esse chat?")
        if (confirmDelete && project && project.id) {
            const deleted = await deleteProject(project.id);
            if (setNewProject && deleted && deleted.status === 200) {
                setNewProject((projects: any) => projects.filter((v: any) => v.id !== project.id))
                alert("Chat deletado com sucesso")
                setModalContent({ isOpenModal: false })
            }
        }
    }

    const handleUpdateProject = async (data: any) => {
        if (data && project.slug) {
            const projectUpdate = await updateProject(data, project.slug)
            if (projectUpdate && projectUpdate.status === 200) {
                setNewProject((projects: any) => [...projects.filter((v: any) => v.id !== project.id), projectUpdate.data])
                setModalContent({
                    isOpenModal: true,
                    components: <PopOver message="Chat atualizado com sucesso" />
                })
            }
        }
    }

    return (
        <div className="w-full flex justify-evenly mb-4">
            <div className="p-2 bg-dark border border-light rounded-full">
                <FcUpload
                    className="text-3xl cursor-pointer rotate-180"
                    onClick={handleUpdateProject}
                />
            </div>

            <div className="p-2 bg-dark border border-light rounded-full">
                <FcFile
                    className="text-3xl cursor-pointer"
                    onClick={() => setModalContent({ isOpenModal: false })}
                />
            </div>

            <div className="p-2 bg-dark border border-light rounded-full">
                <FcFullTrash
                    className="text-3xl cursor-pointer"
                    onClick={handleDeleteProject}
                />
            </div>


        </div>
    )
};