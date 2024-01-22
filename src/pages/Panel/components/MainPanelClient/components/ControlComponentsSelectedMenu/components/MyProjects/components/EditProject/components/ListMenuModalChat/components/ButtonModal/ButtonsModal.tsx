import { useContext } from "react";
import { ModalContext } from "../../../../../../../../../../../../../../context/ModalContext";
import { FcFile, FcFullTrash, FcUpload } from "react-icons/fc";
import { PopUp } from "../../../../../../../../../../../../../../components/modal/templates/PopUp";
import { Confirm } from "../../../../../../../../../../../../../../components/modal/templates/Confirm";

interface ButtonsModalTypes {
    eventSubmit: () => Promise<void>
    eventDelete: () => Promise<void>
    formName: string,
}

export function ButtonsModal({ eventSubmit, eventDelete, formName }: ButtonsModalTypes) {
    const { setModalContent, clearModal } = useContext(ModalContext)

    const handleDeleteProject = async () => {
        setModalContent({
            componentName: "modal_delete",
            components:
                <PopUp>
                    <Confirm
                        message={`Deseja realmente excluir esse ${formName}?`}
                        confirmFunction={handleDeleteProject}
                        cancelFuntion={() => clearModal("modal_delete")}
                    />
                </PopUp>
        })
    }


    const handleDiscardProject = () => {
        localStorage.removeItem(formName)
        clearModal(null, { clearLast: true })
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
                    onClick={eventDelete}
                />
            </div>


        </div>
    )
};
