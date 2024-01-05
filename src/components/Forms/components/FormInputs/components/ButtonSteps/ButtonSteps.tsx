import { IoIosRedo, IoIosUndo } from "react-icons/io";
import { Button } from "../../../../../button/Button";
import { useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { ModalContext } from "../../../../../../context/ModalContext";
import { PopOver } from "../../../../../modal/templates/PopOver";
import { ButtonAction } from "./components/ButtonAction/ButtonAction";

interface ButtonSteps {
    stepSize: number;
    plan_management_id: string | undefined,
    isFormEdit?: boolean
}

export const STEP_NAME_URL: string = "form-step"

export function ButtonSteps({ stepSize, plan_management_id, isFormEdit = false }: ButtonSteps) {
    const [params, setParams] = useSearchParams();
    const { setModalContent } = useContext(ModalContext)

    const handleNextStep = () => {
        const currentStep = Number(params.get(STEP_NAME_URL)) + 1;
        if (currentStep < stepSize && checkInputEmpty()) {
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



    const checkInputEmpty = () => {
        const chat = JSON.parse(localStorage.getItem("chat") || "{}")
        const errorInputs = { message: "" };
        const currentStep = params.get(STEP_NAME_URL) || "0"

        if (currentStep === "0" && !chat.project_name) errorInputs.message = "Você precisa definir o nome do seu chat."
        else if (currentStep === "0" && !chat.logo) errorInputs.message = "Você precisa enviar uma logo para seu chat."
        else if (currentStep === "1" && !chat.prompt_id) errorInputs.message = "Você precisa selecionar uma fonte de dados."
        else if (currentStep === "1" && !chat.chat_input_message) errorInputs.message = "Você precisa definir uma primeira mensagem em seu chat."
        else if (currentStep === "1" && chat.call_to_action[0].button_text && !chat.call_to_action[0].button_link) errorInputs.message = "Você precisa definir um link para seu botão CTA."

        if (errorInputs.message.length > 0) {
            setModalContent({ isOpenModal: true, components: <PopOver message={errorInputs.message} type="WARNING" /> })
            return false
        } else return chat
    }

    return (
        plan_management_id && isFormEdit &&
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
                checkInputEmpty={checkInputEmpty}
                plan_management_id={plan_management_id}
            />
        </div>
    )
};