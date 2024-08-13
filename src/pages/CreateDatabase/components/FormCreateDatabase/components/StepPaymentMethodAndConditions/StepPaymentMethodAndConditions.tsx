import { useFormContext } from "react-hook-form";
import { Root } from "../../../../../../components/Form/FormRoot";
import { useEffect } from "react";
import { DATABASE_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../../../variables/variables";
import { Select } from "../../../../../../components/Select/Select";
import { TextArea } from "../../../../../../components/Form/components/Fields/TextArea/TextArea";
import { Input } from "../../../../../../components/Form/components/Fields/Input/Input";

export function StepPaymentMethodAndConditions() {
    const { watch } = useFormContext();
    const payments = watch("step_1.payment_methods");
    const installments = watch("step_1.credit_card_installments");
    const order_tracking =   watch("step_1.order_tracking");
    const tracking_link =   watch("step_1.tracking_link");
    const isCreditCard = typeof payments === "object" && payments?.find((payment: any) => payment === "Cartão de crédito");

    // UseEffect responsável por salvar os dados digitados pelo usuário no localstorage para manter a consistencia de dados até que a fonte de dados seja criada...
    useEffect(() => {
        const database = JSON.parse(localStorage.getItem(DATABASE_NAME_TO_SAVE_LOCALSTORAGE) || "{}");
        localStorage.setItem(DATABASE_NAME_TO_SAVE_LOCALSTORAGE, JSON.stringify({
            ...database,
            payment_methods: payments,
            credit_card_installments: installments,
            order_tracking,
            tracking_link
        }));
    }, [payments, installments, order_tracking]);

    return (
        <>
            <Root.Container
                className="flex w-full"
                title="Quais são os métodos de pagamentos aceitos?"
            >
                <Select
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
                <Select
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
                name="step_1.order_tracking"
                text="Você está entregando um produto físico?"
                className="w-full flex flex-col gap-6 "
            >
                <TextArea
                    name="step_1.order_tracking"
                    title="Descreva como seu produto vai ser entregue e as politicas de frete?"
                />

                <Root.Optional
                    name="step_1.tracking_link"
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
            </Root.Optional>
        </>
    )
};