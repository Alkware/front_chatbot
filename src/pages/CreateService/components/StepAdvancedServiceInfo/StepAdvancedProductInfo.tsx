import { useFormContext } from "react-hook-form";
import { Root } from "../../../../components/Form/FormRoot";
import { TextArea } from "../../../../components/Form/components/Fields/TextArea/TextArea";
import { ComomQuestions } from "./components/ComomQuestions/ComomQuestions";

export function StepAdvancedServiceInfo() {
    const formContext = useFormContext();

    return (
        <>
            <Root.Optional
                name={`is_service_online`}
                text="O serviço que você oferece é prestado online?"
                functionOnToggle={()=> formContext.register("is_service_online", { value: true })}
                functionOffToggle={()=> formContext.register("is_service_online", { value: false })}
            />
            
            <Root.Optional
                name={`questions`}
                text="Esse serviço possui perguntas frequentes?"
            >
                <ComomQuestions />
            </Root.Optional>
            <Root.Optional
                name="extra_information"
                text="Deseja adicionar mais alguma informação que esteja faltando sobre seu serviço?"
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