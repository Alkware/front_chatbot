import { IoIosCreate, IoIosRedo, IoIosUndo } from "react-icons/io";
import { Button } from "../../../../../button/Button";
import { useSearchParams } from "react-router-dom";
import { STEP_NAME_URL } from "../../../../../../variables/variables";
import { useContext } from "react";
import { ModalContext } from "../../../../../../context/ModalContext";
import { PopOver } from "../../../../../modal/templates/PopOver";

interface ButtonsFormCreate {
    stepChildren?: any;
    plan_management_id: string | undefined,
    isFormEdit?: boolean
    formName: string
    eventSubmit: (data: any) => Promise<void>,
}

export function ButtonsFormCreate({ stepChildren, plan_management_id, isFormEdit = false, formName, eventSubmit }: ButtonsFormCreate) {
    if (!plan_management_id) throw new Error("plan_management_id is missing!")
    
    const [params, setParams] = useSearchParams();
    const { setModalContent } = useContext(ModalContext)

    const handleNextStep = () => {
        const currentStep = Number(params.get(STEP_NAME_URL));
        const nextStep = currentStep + 1;
        // busca os dados do formulario e filtra pela atual step
        const formData = JSON.parse(localStorage.getItem(formName) || "{}")[currentStep];
        // transform as chaves em array
        const keys = Object.entries(formData);

        // Busca dentro do array que alguma chave está sem valor
        const secondPositionIsValueOfInput = 1
        const blocked = keys.find((key: any) => !key[secondPositionIsValueOfInput] || key[secondPositionIsValueOfInput]?.length === 0)

        if (!blocked && nextStep < stepChildren.length) {
            params.set(STEP_NAME_URL, nextStep.toString())
            setParams(params)
        } else {
            setModalContent({
                componentName: `modal_${blocked && blocked[0]}_no_empty`,
                components:
                    <PopOver
                        message={`O campo ${blocked && blocked[0]} não pode estar vazio, preencha-o para proceguir!`}
                        type="WARNING"
                        componentName={`modal_${blocked && blocked[0]}_no_empty`}
                    />
            })
        }
    }

    const handlePreviousStep = () => {
        const currentStep = Number(params.get(STEP_NAME_URL)) - 1;
        if (currentStep >= 0) {
            params.set(STEP_NAME_URL, currentStep.toString())
            setParams(params)
        }
    }

    return (
        (plan_management_id && !isFormEdit) &&
        <div className="w-full flex gap-20 justify-center items-center">


            <Button
                customClass="px-4 cursor-pointer"
                onClick={handlePreviousStep}
            > <IoIosUndo /> Voltar</Button>

            <Button
                data-islaststep={Number(params.get(STEP_NAME_URL)) < (stepChildren.length - 1)}
                customClass="flex justify-center px-4 data-[islaststep='false']:hidden"
                onClick={handleNextStep}
            >Proximo <IoIosRedo /></Button>

            <Button
                data-display={Number(params.get(STEP_NAME_URL)) === (stepChildren.length - 1)}
                customClass="hidden data-[display='true']:flex"
                onClick={eventSubmit}
            >
                Criar chat
                <IoIosCreate className="text-xl" />
            </Button>
        </div>
    )
};