import { IoIosRedo, IoIosUndo } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import { STEP_NAME_URL } from "../../../../../variables/variables";
import { Button } from "../../../../button/Button";
import { IoCreate } from "react-icons/io5";
import { useContext } from "react";
import { ModalContext } from "../../../../../context/ModalContext";
import { PopOver } from "../../../../modal/templates/PopOver";
import { useFormContext } from "react-hook-form";

interface FormButtonStep {
    numberChildren: number;
    findErrorMessage: (errors: Object) => string;
    hiddenPreviewButton?: boolean;
    titleButtonSend?: string;
}

export function FormButtonStep({ numberChildren, findErrorMessage, hiddenPreviewButton, titleButtonSend }: FormButtonStep) {
    const [params, setParams] = useSearchParams();
    const { setModalContent } = useContext(ModalContext)
    const { trigger, formState: { errors } } = useFormContext();
    const currentStep = Number(params.get(STEP_NAME_URL))
    const isLastStep = currentStep === (numberChildren - 1);
    const navigate =  useNavigate();

    const handleNextStep = async () => {
        const currentStep = (params.get(STEP_NAME_URL) || "0");
        const stepKey: any = `step_${currentStep}`
        const isValid = await trigger(stepKey);

        if (isValid) {
            const nextStep = Number(currentStep) + 1;
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
        
        if(previousStep < 0){
            navigate("/panel")
        }

        if (previousStep >= 0) {
            params.set(STEP_NAME_URL, previousStep.toString())
            setParams(params)
        }
    }

    return (
            <div className="w-full flex gap-4 lg:gap-16 xl:gap-20 justify-center items-center mt-8">

                <Button
                    type="button"
                    data-display={hiddenPreviewButton && currentStep === 0 }
                    customClass="cursor-pointer data-[display=true]:hidden px-4 max-lg:text-sm"
                    onClick={handlePreviousStep}
                > <IoIosUndo /> { currentStep === 0 ? "Painel": "Anterior" }</Button>

                <Button
                    type="submit"
                    data-islaststep={isLastStep}
                    customClass="data-[islaststep=false]:hidden justify-center px-4 max-lg:text-sm"
                >
                    { titleButtonSend || "Enviar" }
                    <IoCreate />
                </Button>

                <Button
                    type="button"
                    data-islaststep={isLastStep}
                    customClass="data-[islaststep=true]:hidden justify-center px-4 max-lg:text-sm"
                    onClick={handleNextStep}
                >
                    Proximo
                    <IoIosRedo />
                </Button>

            </div>
    )
};