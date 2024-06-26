import { useEffect } from "react";
import { Root } from "../../../../../../components/Form/FormRoot";
import { useFormContext } from "react-hook-form";
import { DATABASE_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../../../variables/variables";

export function StepPoliciesAndConditions() {
    const { watch } = useFormContext();
    const type = watch("step_2.warranty_time.type");
    const time = watch("step_2.warranty_time.time");
    const how_guarantee_work = watch("step_2.how_guarantee_work");
    const how_exchanges_work_and_returns = watch("step_2.how_exchanges_work_and_returns");

    // UseEffect responsável por salvar os dados digitados pelo usuário no localstorage para manter a consistencia de dados até que a fonte de dados seja criada...
    useEffect(() => {
        const database = JSON.parse(localStorage.getItem(DATABASE_NAME_TO_SAVE_LOCALSTORAGE) || "{}");
        localStorage.setItem(DATABASE_NAME_TO_SAVE_LOCALSTORAGE, JSON.stringify({
            ...database,
            how_guarantee_work,
            how_exchanges_work_and_returns,
            warranty_time: { time, type }
        }));
    }, [type, time, how_guarantee_work, how_exchanges_work_and_returns]);

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