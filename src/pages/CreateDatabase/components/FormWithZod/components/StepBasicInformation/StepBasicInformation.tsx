import { Root } from "../../../../../../components/Form-zod/FormRoot";

export function StepBasicInformation() {
    return (
        <Root.Step index={0} stepTitle="Informações básicas do produto">

            <Root.Input
                title="Quem foi o criador desse produto?"
                name="step_0.who_created"
            />
            <Root.TextArea
                title="Conte um pouco sobre seu produto..."
                height={100}
                name="step_0.what_is"
            />

            <Root.TextArea
                title="Como ele funciona?"
                height={100}
                name="step_0.how_works"
            />

            <Root.Optional 
                text="O produto possui registro na ANVISA?" 

            >
                <Root.Input
                    title="Digite o registro da ANVISA:"
                    name="step_0.andvisa_record"
                />
            </Root.Optional>

        </Root.Step>
    )
};