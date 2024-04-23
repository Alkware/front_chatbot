import { Root } from "../../../../../../components/Form/FormRoot";

export function StepPersonalityIA() {
    return (
        <Root.Step index={4} stepTitle="Personalidade da IA">

            <Root.Optional
                text="Deseja dar um nome a sua inteligência artificial?"
                active={false}
            >
                <Root.Input
                    name="step_4.ia_name"
                    title="Qual o nome da sua inteligência artificial?"
                />
            </Root.Optional>

            <Root.Optional
                text="Deseja adicionar restrições de palavras ou frase?"
                active={false}
                name="step_4.restrictions"
            >
                <Root.Input
                    name="step_4.restrictions"
                    title="Faça uma lista de restrições para que a IA evite utiliza-la em uma conversa"
                />
            </Root.Optional>

            <Root.TextArea
                title="Faça uma breve descrição de quem é seu público (cliente)"
                name="step_4.client_describe"
            />


        </Root.Step>

    )
};