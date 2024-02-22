import { IoIosRedo, IoIosUndo } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { STEP_NAME_URL } from "../../../../../variables/variables";
import { Button } from "../../../../button/Button";
import { IoCreate } from "react-icons/io5";
import { useContext } from "react";
import { ModalContext } from "../../../../../context/ModalContext";
import { PopOver } from "../../../../modal/templates/PopOver";
import { useFormContext } from "react-hook-form";

interface FormButtonStep {
    numberChildren: number;
    findErrorMessage: (errors: Object)=> string;
}

export function FormButtonStep({ numberChildren, findErrorMessage }: FormButtonStep) {
    const { trigger, formState: { errors } }  = useFormContext();
    const [params, setParams] = useSearchParams();
    const { setModalContent } = useContext(ModalContext)
    const currentStep = Number(params.get(STEP_NAME_URL))
    const isLastStep = currentStep === (numberChildren - 1);

    const handleNextStep = async () => {
        const currentStep = (params.get(STEP_NAME_URL) || "0");
        const stepKey: any = `step_${currentStep}`
        const isValid = await trigger(stepKey);
        
        if (isValid) {
            const nextStep = currentStep + 1;
            params.set(STEP_NAME_URL, nextStep.toString())
            setParams(params)
        } else {
            const error = findErrorMessage(errors)
            setModalContent({
                componentName: "modal_error_form_database",
                components:
                    <PopOver
                        componentName="modal_error_form_database"
                        message={error}
                        type="WARNING"
                    />
            })
        }
    }

    const handlePreviousStep = () => {
        const previousStep = currentStep - 1;
        if (previousStep >= 0) {
            params.set(STEP_NAME_URL, previousStep.toString())
            setParams(params)
        }
    }


    const handleErrors = async () => {
        const currentStep = (params.get(STEP_NAME_URL) || "0");
        const stepKey: any = `step_${currentStep}`
        const isValid = await trigger(stepKey);
        console.log(isValid, errors)

        if (isValid) return { isError: false, message: "" }

        return { isError: true, message: "Preencha todos os campos necessários!" }
    }


    return (
        <div className="w-full flex gap-20 justify-center items-center my-8">
            <Button
                type="button"
                customClass="px-4 cursor-pointer"
                onClick={handlePreviousStep}
            > <IoIosUndo /> Voltar</Button>

            <Button
                type="submit"
                data-islaststep={isLastStep}
                customClass="data-[islaststep=false]:hidden justify-center px-4"
            >
                Enviar
                <IoCreate />
            </Button>

            <Button
                type="button"
                data-islaststep={isLastStep}
                customClass="data-[islaststep=true]:hidden justify-center px-4"
                onClick={handleNextStep}
            >
                Proximo
                <IoIosRedo />
            </Button>

        </div>
    )
};