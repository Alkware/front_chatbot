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
        if (confirmDelete && project.id) {
            const deleted = await deleteProject(project.id);
            if (setNewProject && deleted && deleted.status === 200) {
                setNewProject((projects: any) => projects.filter((v: any) => v.id !== project.id))
                localStorage.removeItem("chat")
                alert("Chat deletado com sucesso")
                setModalContent({ isOpenModal: false })
            }
        }
    }

    const handleUpdateProject = async () => {
        const data = JSON.parse(localStorage.getItem("chat") || "{}")

        if (data && project.slug) {
            const projectUpdate = await updateProject(data, project.slug)
            if (projectUpdate && projectUpdate.status === 200) {
                localStorage.removeItem("chat")
                setNewProject((projects: any) => [...projects.filter((v: any) => v.id !== project.id), projectUpdate.data])
                setModalContent({
                    isOpenModal: true,
                    components: <PopOver message="Chat atualizado com sucesso" />
                })
            }
        }
    }

    const handleDiscardProject = ()=>{
        localStorage.removeItem("chat")
        setModalContent({
            isOpenModal: false,
        })
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
                    onClick={handleDiscardProject}
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