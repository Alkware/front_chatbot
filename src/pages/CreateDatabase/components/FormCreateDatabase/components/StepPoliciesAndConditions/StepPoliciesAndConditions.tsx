import { Root } from "../../../../../../components/Form/FormRoot";

export function StepPoliciesAndConditions() {


    return (

        <Root.Step index={2} stepTitle="Politicas e condições">

            <Root.Container className="flex gap-4" >

                <Root.Select 
                    name="step_2.warranty_time.type"
                    title="Tipo de data"
                    options={[
                        { text: "Dia(s)", value: "dia" },
                        { text: "Mês(s)", value: "mes" },
                        { text: "Ano(s)", value: "ano" },
                    ]}
                />

                <Root.Input
                    type="number"
                    name="step_2.warranty_time.time"
                    title="Tempo de garantia?"
                />

            </Root.Container>

            <Root.TextArea
                name="step_2.how_guarantee_work"
                title="Como funciona a garantia?"
            />

            <Root.Optional
                name="step_2.how_exchanges_work_and_returns"
                text="Esse produto/serviço possui trocas e devoluções?"
            >
                <Root.TextArea
                    name="step_2.how_exchanges_work_and_returns"
                    title="Como funciona as trocas e devoluções?"
                />
            </Root.Optional>

        </Root.Step>
    )
};