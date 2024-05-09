import { useFormContext } from "react-hook-form";
import { Root } from "../../../../../../components/Form/FormRoot";

export function StepPaymentMethodAndConditions() {
    const { watch } = useFormContext();
    const payments = watch("step_1.payment_methods");
    const isCreditCard = typeof payments === "object" && payments?.find((payment: any) => payment === "Cartão de crédito");

    return (
        <Root.Step index={1} stepTitle="Métodos de pagamentos e condições">

            <Root.Container
                className="flex w-full"
                title="Quais são os métodos de pagamentos aceitos?"
            >
                <Root.Select
                    title="Escolha seus métodos de pagamentos"
                    multipleSelect={true}
                    name="step_1.payment_methods"
                    options={[
                        { value: "Pix", text: "Pix" },
                        { value: "Boleto", text: "Boleto" },
                        { value: "Cartão de débito", text: "Cartão de débito" },
                        { value: "Cartão de crédito", text: "Cartão de crédito" },
                        { value: "Pagamentos em aplicativo", text: "Pagamentos em aplicativo" },
                    ]}
                />
            </Root.Container>

            <Root.Container
                title="Quantas vezes o cliente pode parcelar?"
                hiddenContainer={!!isCreditCard ? false : true}
                className="max-w-[200px]"
            >
                <Root.Select
                    title="Quantas parcelas?"
                    name="step_1.credit_card_installments"
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

            <Root.Optional
                name="step_2.order_tracking"
                defaultField={""}
                text="Você está entregando um produto físico?"
                className="w-full flex flex-col gap-6 "
            >
                <Root.TextArea
                    name="step_2.order_tracking"
                    title="Descreva como seu produto vai ser entregue e as politicas de frete?"
                />

                <Root.Optional
                    name="step_2.tracking_link"
                    defaultField={""}
                    active={false}
                    text="Você possui link para rastrear pedido?"
                >
                    <Root.Input
                        title="Digite a url do site:"
                        name="step_2.tracking_link"
                        onChange={({ target }) => {
                            if (!target.value.toLowerCase().includes("http"))
                                target.value = `https://${target.value.replace("http", "")}`
                        }}
                    />
                </Root.Optional>
            </Root.Optional>


        </Root.Step>
    )
};