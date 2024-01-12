import { deleteProject } from "../../../../../../../../../../../../../../api/project";
import { useContext } from "react";
import { ModalContext } from "../../../../../../../../../../../../../../context/ModalContext";
import { FcFile, FcFullTrash, FcUpload } from "react-icons/fc";
import { CHAT_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../../../../../../../../../../../variables/variables";

interface ButtonsModalTypes {
    project?: any,
}

export function ButtonsModal({ project }: ButtonsModalTypes) {
    const { setModalContent } = useContext(ModalContext)


    const handleDeleteProject = async () => {
        const confirmDelete = confirm("Você tem certeza que deseja excluir esse chat?")
        if (confirmDelete && project.id) {
            const deleted = await deleteProject(project.id);
            if (deleted && deleted.status === 200) {
                localStorage.removeItem(CHAT_NAME_TO_SAVE_LOCALSTORAGE)
                alert("Chat deletado com sucesso")
                setModalContent({ isOpenModal: false })
            }
        }
    }

    const handleDiscardProject = () => {
        localStorage.removeItem(CHAT_NAME_TO_SAVE_LOCALSTORAGE)
        setModalContent({
            isOpenModal: false,
        })
    }

    return (
        <div className="w-full flex justify-evenly mb-4">
            <div className="p-2 bg-dark border border-light rounded-full">
                <button>
                    <FcUpload
                        className="text-3xl cursor-pointer rotate-180"
                    // onClick={handleUpdateProject}
                    />
                </button>
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