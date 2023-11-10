import { FcFile, FcFullTrash, FcOk } from "react-icons/fc";
import ButtonGreen from "../../../../components/button/ButtonGreen";
import { deleteProject } from "../../../../api/project";
import { useContext } from "react";
import { ModalContext } from "../../../../context/ModalContext";

interface ButtonsModalTypes {
    project?: any,
    setNewProject?: (projects: any) => void,
    isModalCreate: boolean
}

export function ButtonsModal({ project, setNewProject, isModalCreate }: ButtonsModalTypes) {
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

    return (
        <div className="flex self-end rounded-b-md overflow-hidden absolute top-0 right-0">
            <ButtonGreen
                customClass="rounded-none"
                icon={<FcOk />}
            >
                {isModalCreate ? "Criar chat" : "Salvar"}
            </ButtonGreen>
            <span
                className="px-2 underline cursor-pointer text-center flex justify-center gap-2 items-center bg-zinc-500"
                onClick={() => setModalContent({ isOpenModal: false })}
            >
                <FcFile />
                Descartar
            </span>
            <span
                className={`px-2 cursor-pointer text-white bg-red-900 justify-center items-center gap-2 ${isModalCreate ? "hidden" : "flex"}`}
                onClick={handleDeleteProject}
            >
                <FcFullTrash />
                Excluir chat
            </span>
        </div>
    )
};