import { IoIosRedo, IoIosUndo } from "react-icons/io";
import { Button } from "../../../../../button/Button";
import { useSearchParams } from "react-router-dom";
import { ButtonAction } from "./components/ButtonAction/ButtonAction";
import { STEP_NAME_URL } from "../../../../../../variables/variables";
import { useContext } from "react";
import { ModalContext } from "../../../../../../context/ModalContext";
import { PopOver } from "../../../../../modal/templates/PopOver";

interface ButtonSteps {
    children: any;
    plan_management_id: string | undefined,
    isFormEdit?: boolean
    formName: string
}



export function ButtonSteps({ children, plan_management_id, isFormEdit = false, formName }: ButtonSteps) {
    const [params, setParams] = useSearchParams();
    const { setModalContent } = useContext(ModalContext)

    const handleNextStep = (e: any) => {
        const currentStep = Number(params.get(STEP_NAME_URL));
        const nextStep = currentStep + 1;
        const dataForm = JSON.parse(localStorage.getItem(formName) || "{}")[currentStep];
        const keys = Object.entries(dataForm);

        const blocked = keys.find((key: any) => key[1].length === 0)
        
        if (!blocked && nextStep < children.length) {
            params.set(STEP_NAME_URL, nextStep.toString())
            setParams(params)
        }else {
            setModalContent({
                isOpenModal: true,
                components: <PopOver message={`O campo "${blocked && blocked[0]}" não pode estar vazio, preencha-o para proceguir!`} type="WARNING" />
            })
        }
    }

    const handlePreviousStep = (e: any) => {
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
                onClick={(e) => handlePreviousStep(e)}
            > <IoIosUndo /> Voltar</Button>

            <Button
                data-islaststep={Number(params.get(STEP_NAME_URL)) < (children.length - 1)}
                customClass="flex justify-center px-4 data-[islaststep='false']:hidden"
                onClick={(e) => handleNextStep(e)}
            >Proximo <IoIosRedo /></Button>

            <ButtonAction
                display={Number(params.get(STEP_NAME_URL)) === (children.length - 1)}
                plan_management_id={plan_management_id}
            />
        </div>
    )
};