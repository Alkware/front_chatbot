import { useFormContext } from "react-hook-form";
import { Root } from "../../../../components/Form/FormRoot";
import { AddVariables } from "./components/AddVariables/AddVariables";
import { TextArea } from "../../../../components/Form/components/Fields/TextArea/TextArea";
import { ComomQuestions } from "../../../CreateService/components/StepAdvancedServiceInfo/components/ComomQuestions/ComomQuestions";

export function StepAdvancedProductInfo() {
    const formContext = useFormContext();

    return (
        <>
            <Root.Optional
                name={`optional_variable`}
                text="Esse produto possui alguma caracteristica?"
            >
                <AddVariables />
            </Root.Optional>

            <Root.Optional
                name={`questions`}
                text="Esse produto possui perguntas frequentes?"
            >
                <ComomQuestions />
            </Root.Optional>
            <Root.Optional
                name="extra_information"
                text="Deseja adicionar mais alguma informação que esteja faltando sobre seu produto?"
            >
                <TextArea
                    name="extra_information"
                    title="Digite todas as informações faltando aqui"
                    formContext={formContext}
                />
            </Root.Optional>
        </>
    )
};