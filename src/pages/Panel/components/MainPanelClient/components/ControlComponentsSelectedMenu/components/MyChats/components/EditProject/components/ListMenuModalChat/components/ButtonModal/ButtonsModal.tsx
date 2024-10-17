import { useContext } from "react";
import { ModalContext } from "../../../../../../../../../../../../../../context/ModalContext";
import { useSearchParams } from "react-router-dom";
import { TipContainer } from "../../../../../../../../../../../../../../components/TipContainer/TipContainer";
import { FaUpload } from "react-icons/fa6";
import { FaEdit, FaTrash } from "react-icons/fa";

interface ButtonsModalTypes {
    eventDelete: () => Promise<void>
}

export function ButtonsModal({ eventDelete }: ButtonsModalTypes) {
    const { clearModal } = useContext(ModalContext);
    const [params, setParams] = useSearchParams();

    const handleDiscardProject = () => {
        setParams(params);
        clearModal(null, { clearLast: true })
    }

    return (
        <div className="w-3/4 md:w-full flex justify-evenly md:mb-4">
            <button type="submit">
                <TipContainer tip="Salvar">
                    <div className="group flex justify-center items-center w-[45px] h-[50px] border border-primary-100 dark:border-light hover:border-primary-100 rounded-full cursor-pointer">
                        <FaUpload
                            className="size-4 group-hover:fill-primary-100"
                        />
                    </div>
                </TipContainer>
            </button>

            <button type="button">
                <div
                    onClick={handleDiscardProject}
                    className="group flex justify-center items-center w-[45px] h-[50px] border border-primary-100 dark:border-light hover:border-primary-100 rounded-full cursor-pointer"
                >
                    <TipContainer tip="Descartar">
                        <FaEdit
                            className="size-4 group-hover:fill-primary-100"
                        />
                    </TipContainer>
                </div>
            </button>


            <div
                onClick={eventDelete}
                className="group flex justify-center items-center w-[45px] h-[50px] border border-primary-100 dark:border-light hover:border-primary-100 rounded-full cursor-pointer"
            >
                <TipContainer tip="Deletar">
                    <button type="button">
                        <FaTrash
                            className="size-4 group-hover:fill-primary-100"
                        />
                    </button>
                </TipContainer>
            </div>
        </div>
    )
};
