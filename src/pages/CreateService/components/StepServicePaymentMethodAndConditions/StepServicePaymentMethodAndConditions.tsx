import { useFormContext } from "react-hook-form";
import { Root } from "../../../../components/Form/FormRoot";
import { Select } from "../../../../components/Select/Select";
import { Input } from "../../../../components/Form/components/Fields/Input/Input";
import { TextArea } from "../../../../components/Form/components/Fields/TextArea/TextArea";

export function StepServicePaymentMethodAndConditions() {
    const formContext = useFormContext();
    const payments = formContext.watch("payment_methods")
    const isCreditCard = typeof payments === "object" && payments?.find((payment: any) => payment === "Cartão de crédito");

    return (
        <>
            <Root.Container
                className="flex w-full gap-4"
                title="Quais são os métodos de pagamentos aceitos?"
            >
                <Select
                    title="Escolha seus métodos de pagamentos"
                    multipleSelect={true}
                    name="payment_methods"
                    formContext={formContext}
                    options={[
                        { value: "Pix", text: "Pix" },
                        { value: "Boleto", text: "Boleto" },
                        { value: "Cartão de débito", text: "Cartão de débito" },
                        { value: "Cartão de crédito", text: "Cartão de crédito" },
                        { value: "Pagamentos em aplicativo", text: "Pagamentos em aplicativo" },
                    ]}
                />
                <Root.Container
                    data-hascreditcard={!!isCreditCard}
                    className="max-w-[180px] data-[hascreditcard=false]:hidden"
                >
                    <Select
                        title="Parcelas max"
                        name="credit_card_installments"
                        formContext={formContext}
                        options={[
                            { value: "1x", text: "1x" },
                            { value: "2x", text: "2x" },
                            { value: "3x", text: "3x" },
                            { value: "4x", text: "4x" },
                            { value: "5x", text: "5x" },
                            { value: "6x", text: "6x" },
                            { value: "7x", text: "7x" },
                            { value: "8x", text: "8x" },
                            { value: "9x", text: "9x" },
                            { value: "10x", text: "10x" },
                            { value: "11x", text: "11x" },
                            { value: "12x", text: "12x" },
                            { value: "18x", text: "18x" },
                            { value: "24x", text: "24x" },
                        ]}
                    />
                </Root.Container>
            </Root.Container>
            <Root.Container
                className="flex gap-4"
                title="Qual é o período de garantia do seu serviço?"
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
        </>
    )
};