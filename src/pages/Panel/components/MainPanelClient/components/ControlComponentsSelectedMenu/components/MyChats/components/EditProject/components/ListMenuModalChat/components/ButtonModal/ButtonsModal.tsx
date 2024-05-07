import { useContext } from "react";
import { ModalContext } from "../../../../../../../../../../../../../../context/ModalContext";
import { FcFile, FcFullTrash, FcUpload } from "react-icons/fc";
import { useSearchParams } from "react-router-dom";
import { CTA_NAME_URL } from "../../../../../../../../../../../../../../variables/variables";
import { TipContainer } from "../../../../../../../../../../../../../../components/TipContainer/TipContainer";

interface ButtonsModalTypes {
    eventDelete: () => Promise<void>
}

export function ButtonsModal({ eventDelete }: ButtonsModalTypes) {
    const { clearModal } = useContext(ModalContext);
    const [params, setParams] = useSearchParams();

    const handleDiscardProject = () => {
        params.delete(CTA_NAME_URL);
        setParams(params)
        clearModal(null, { clearLast: true })
    }

    return (
        <div className="w-3/4 md:w-full flex justify-evenly md:mb-4">
            <div className="flex justify-center items-center w-[45px] h-[50px] border border-light rounded-full">
                <TipContainer tip="Salvar">
                    <button type="submit">
                        <FcUpload
                            className="text-3xl cursor-pointer rotate-180"
                        />
                    </button>
                </TipContainer>
            </div>

            <div className="flex justify-center items-center w-[45px] h-[50px] border border-light rounded-full">
                <TipContainer tip="Descartar">
                    <button type="button" onClick={handleDiscardProject}>
                        <FcFile
                            className="text-3xl cursor-pointer"

                        />
                    </button>
                </TipContainer>
            </div>


            <div className="flex justify-center items-center w-[45px] h-[50px] border border-light rounded-full">
                <TipContainer tip="Deletar">
                    <button type="button" onClick={eventDelete}>
                        <FcFullTrash
                            className="text-3xl cursor-pointer"
                        />
                    </button>
                </TipContainer>
            </div>
        </div>
    )
};
