import { useFormContext } from "react-hook-form";
import { Root } from "../../../../components/Form/FormRoot";
import { Select } from "../../../../components/Select/Select";
import { TextArea } from "../../../../components/Form/components/Fields/TextArea/TextArea";
import { Input } from "../../../../components/Form/components/Fields/Input/Input";

export function StepProductPaymentMethodAndConditions() {
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

            <Root.Optional
                name="delivery_fee"
                text="Seu produto tem taxa de frete?"
            >
                <TextArea
                    name="delivery_fee"
                    title="Descreva como funciona a taxa de frete para esse produto?"
                    formContext={formContext}
                />
            </Root.Optional>

            <TextArea
                name="how_product_will_be_delivered"
                title="Descreva como seu produto vai ser entregue"
                formContext={formContext}
            />

            <Root.Optional
                name="tracking_link"
                text="Você possui link para rastrear pedido?"
            >
                <Input
                    title="Digite a url do site:"
                    name="step_1.tracking_link"
                    onChange={({ currentTarget }) => {
                        if (!currentTarget.value.toLowerCase().includes("http"))
                            currentTarget.value = `https://${currentTarget.value.replace("http", "")}`
                    }}
                />
            </Root.Optional>

        </>

    )
};