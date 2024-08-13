import { useFormContext } from "react-hook-form";
import { Root } from "../../../../components/Form/FormRoot";
import { Input } from "../../../../components/Form/components/Fields/Input/Input";
import { TextArea } from "../../../../components/Form/components/Fields/TextArea/TextArea";
import { Select } from "../../../../components/Select/Select";

export function StepAboutProductWarranty() {
    const formContext = useFormContext();

    return (
        <Root.Step
            index={2}
            stepTitle="Sobre garantia do produto"
        >
            <Root.Container
                className="flex gap-4"
                title="Qual é o período de garantia do seu produto?"
            >
                <Select
                    name="warranty_time.type"
                    title="Tipo de data"
                    formContext={formContext}
                    options={[
                        { text: "Dia(s)", value: "dia" },
                        { text: "Mês(s)", value: "mes" },
                        { text: "Ano(s)", value: "ano" },
                    ]}
                />

                <Input
                    type="number"
                    name="warranty_time.time"
                    title="Tempo de garantia?"
                    formContext={formContext}
                />

            </Root.Container>

            <TextArea
                name="how_guarantee_work"
                title="Como funciona a garantia?"
                formContext={formContext}
            />

            <TextArea
                name="how_exchanges_work_and_returns"
                title="Descreva como funciona as trocas e devoluções?"
                formContext={formContext}
            />

        </Root.Step>

    )
};