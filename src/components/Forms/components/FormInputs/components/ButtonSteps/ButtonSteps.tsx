import { IoIosRedo, IoIosUndo } from "react-icons/io";
import { Button } from "../../../../../button/Button";
import { useSearchParams } from "react-router-dom";
import { ButtonAction } from "./components/ButtonAction/ButtonAction";

interface ButtonSteps {
    stepSize: number;
    plan_management_id: string | undefined,
    isFormEdit?: boolean
}

export const STEP_NAME_URL: string = "form-step"

export function ButtonSteps({ stepSize, plan_management_id, isFormEdit = false }: ButtonSteps) {
    const [params, setParams] = useSearchParams();

    const handleNextStep = () => {
        const currentStep = Number(params.get(STEP_NAME_URL)) + 1;
        if (currentStep < stepSize) {
            params.set(STEP_NAME_URL, currentStep.toString())
            setParams(params)
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
                data-islaststep={Number(params.get(STEP_NAME_URL)) < (stepSize - 1)}
                customClass="flex justify-center px-4 data-[islaststep='false']:hidden"
                onClick={handleNextStep}
            >Proximo <IoIosRedo /></Button>

            <ButtonAction
                display={Number(params.get(STEP_NAME_URL)) === (stepSize - 1)}
                plan_management_id={plan_management_id}
            />
        </div>
    )
};