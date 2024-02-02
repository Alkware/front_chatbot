import { Root } from "../../../../../../components/Form-zod/FormRoot";


export function StepAdvancedInformation() {
    return (
        <Root.Step index={1} stepTitle="Informações avançadas do produto">
            <Root.TextArea
                name="step_1.benefits"
                title="Quais são os beneficios do seu produto?"
            />

            <Root.TextArea
                name="step_1.ingredients"
                title="Quais são os ingredientes do seu produto?"
            />

            <Root.Optional
                active={true}
                text="Esse produto possui alguma contra indicação?"
                name="step_1.contraindications"
            >
                <Root.TextArea
                    name="step_1.contraindications"
                    title="Quais são as contra-indicações do seu produto?"
                />
            </Root.Optional>

            <Root.Optional
                active={true}
                text="Existe algum efeito colateral?"
                name="step_1.side_effects"
            >
                <Root.TextArea
                    name="step_1.side_effects"
                    title="Quais?"
                />
            </Root.Optional>

        </Root.Step>
    )
};