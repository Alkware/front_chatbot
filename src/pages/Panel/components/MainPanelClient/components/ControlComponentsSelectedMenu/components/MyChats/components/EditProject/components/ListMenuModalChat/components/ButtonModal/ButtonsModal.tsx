import { useContext } from "react";
import { ModalContext } from "../../../../../../../../../../../../../../context/ModalContext";
import { FcFile, FcFullTrash, FcUpload } from "react-icons/fc";
import { PopUp } from "../../../../../../../../../../../../../../components/modal/templates/PopUp";
import { Confirm } from "../../../../../../../../../../../../../../components/modal/templates/Confirm";
import { useSearchParams } from "react-router-dom";
import { CTA_NAME_URL } from "../../../../../../../../../../../../../../variables/variables";

interface ButtonsModalTypes {
    eventDelete: () => Promise<void>
}

export function ButtonsModal({ eventDelete }: ButtonsModalTypes) {
    const { setModalContent, clearModal } = useContext(ModalContext);
    const [params, setParams] = useSearchParams();

    const handleDeleteProject = async () => {
        setModalContent({
            componentName: "modal_delete",
            components:
                <PopUp>
                    <Confirm
                        message={`Essa ação excluirá permanentemente! Você tem certeza? `}
                        confirmFunction={handleDeleteProject}
                        cancelFuntion={() => clearModal("modal_delete")}
                    />
                </PopUp>
        })
    }


    const handleDiscardProject = () => {
        params.delete(CTA_NAME_URL);
        setParams(params)
        clearModal(null, { clearLast: true })
    }

    return (
        <div className="w-full flex justify-evenly mb-4">
            <div className="p-2 bg-dark border border-light rounded-full">
                <button type="submit">
                    <FcUpload
                        className="text-3xl cursor-pointer rotate-180"
                    />
                </button>
            </div>

            <div className="p-2 bg-dark border border-light rounded-full">
                <button type="button" onClick={handleDiscardProject}>
                    <FcFile
                        className="text-3xl cursor-pointer"

                    />
                </button>
            </div>

            <div className="p-2 bg-dark border border-light rounded-full">
                <button type="button" onClick={eventDelete}>
                    <FcFullTrash
                        className="text-3xl cursor-pointer"
                    />
                </button>
            </div>


        </div>
    )
};
