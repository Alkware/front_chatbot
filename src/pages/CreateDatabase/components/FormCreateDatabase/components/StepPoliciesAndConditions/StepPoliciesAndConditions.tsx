import { Root } from "../../../../../../components/Form/FormRoot";

export function StepPoliciesAndConditions() {


    return (

        <Root.Step index={2} stepTitle="Politicas e condições">

            <Root.Input
                type="number"
                name="step_2.days_of_warranty"
                title="Quantos dias o cliente tem de garantia?"
            />

            <Root.TextArea
                name="step_2.how_guarantee_work"
                title="Como funciona a garantia?"
            />

            <Root.Optional
                name="step_2.how_exchanges_work_and_returns"
                defaultField={""}
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