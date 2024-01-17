import { deleteProject } from "../../../../../../../../../../../../../../api/project";
import { Dispatch, SetStateAction, useContext } from "react";
import { ModalContext } from "../../../../../../../../../../../../../../context/ModalContext";
import { FcFile, FcFullTrash, FcUpload } from "react-icons/fc";
import { DATABASE_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../../../../../../../../../../../variables/variables";
import { PopUp } from "../../../../../../../../../../../../../../components/modal/templates/PopUp";
import { Confirm } from "../../../../../../../../../../../../../../components/modal/templates/Confirm";
import { PopOver } from "../../../../../../../../../../../../../../components/modal/templates/PopOver";

interface ButtonsModalTypes {
    eventSubmit: () => Promise<void>
    data?: any,
    setData?: Dispatch<SetStateAction<[]>>
}

export function ButtonsModal({ data, eventSubmit, setData }: ButtonsModalTypes) {
    if (!setData) throw new Error("setData is missing!")
    const { setModalContent, clearModal } = useContext(ModalContext)

    const handleDeleteProject = async () => {
        setModalContent({
            componentName: "modal_delete_project",
            components:
                <PopUp>
                    <Confirm
                        message="Deseja realmente excluir esse chat?"
                        confirmFunction={handleDeleteProject}
                        cancelFuntion={() => clearModal("modal_delete_project")}
                    />
                </PopUp>
        })

        //
        //
        //
        //
        //
        //
        //
        // [TODO] - remover o buttonsModal do Form.Container, porque está tendo que fazer muitas muidas para adaptar tanto para 
        // database , quanto para chat, isso é ruim , por o <Form /> tem que ser reutilizavél e se isso ta impedindo, precisa ser
        // removido ou remanejado
        //
        //
        //
        //
        //
        //
        //
        //
        //



        async function handleDeleteProject() {
            if (data.id && setData) {
                // aqui pode ser tanto deleteProject quanto deleteDatabase. Esse é o problema!
                const deleted = await deleteProject(data.id);
                if (deleted && deleted.status === 200) {
                    localStorage.removeItem(DATABASE_NAME_TO_SAVE_LOCALSTORAGE)
                    setData((data: any) => data.filter((d: any) => d.id !== data.id))

                    setModalContent({
                        componentName: "modal_delete_chat",
                        components:
                            <PopOver
                                message="Chat excluido com sucesso!"
                                componentName="modal_delete_chat"
                                functionAfterComplete={() => clearModal(null, { clearAll: true })}
                            />
                    })
                }
            }
        }

    }

    const handleDiscardProject = () => {
        localStorage.removeItem(DATABASE_NAME_TO_SAVE_LOCALSTORAGE)
        clearModal("modal_edit_project")
    }

    return (
        <div className="w-full flex justify-evenly mb-4">
            <div className="p-2 bg-dark border border-light rounded-full">
                <button>
                    <FcUpload
                        className="text-3xl cursor-pointer rotate-180"
                        onClick={eventSubmit}
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