import { Root } from "../../../../../../components/Form/FormRoot";

export function StepPaymentsAndDeliveryProduct() {
    return (
        <Root.Step index={1} stepTitle="MÉTODOS DE PAGAMENTO E CONDIÇÕES">

            <Root.Container className="flex" title="Quais são os métodos de pagamentos aceitos?">

                <Root.Select
                    title="Escolha seus métodos de pagamentos"
                    isMultiple={true}
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

            <Root.TextArea
                name="step_1.how_to_buy"
                title="Descreva o passo a passo para seu cliente efetuar compra do seu produto"
            />

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