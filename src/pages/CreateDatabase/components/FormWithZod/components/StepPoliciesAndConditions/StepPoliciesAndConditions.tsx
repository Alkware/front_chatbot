import { Root } from "../../../../../../components/Form/FormRoot";

export function StepPoliciesAndConditions() {


    return (

        <Root.Step index={3} stepTitle="Politicas e condições">

            <Root.Input
                type="number"
                name="step_3.days_of_warranty"
                title="Quantos dias o cliente tem de garantia?"
            />

            <Root.TextArea
                name="step_3.how_guarantee_work"
                title="Como funciona a garantia?"
            />


            <Root.TextArea
                name="step_3.how_exchanges_work_and_returns"
                title="Como funciona as trocas e devoluções?"
            />

            <Root.Optional active={false} text="Gostaria de deixar um disclaimer para seus clientes?">
                <Root.TextArea
                    name="step_3.disclaimer"
                    title="Aviso legal ( Disclaimer )"
                />
            </Root.Optional>
        </Root.Step>
    )
};