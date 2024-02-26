import { Root } from "../../../../../../components/Form/FormRoot";

export function StepDeliveryProduct() {
    return (
        <Root.Step index={2} stepTitle="Sobre a entrega do produto">
            <Root.Container className="flex gap-4" title="Qual o prazo médio em dias para entrega:">
                <Root.Input
                    type="number"
                    min={1}
                    name="step_2.average_delivery_time.start"
                    title="de:"
                    joinAtInput="dia(s)"
                />

                <Root.Input
                    type="number"
                    min={1}
                    name="step_2.average_delivery_time.end"
                    title="até:"
                    joinAtInput="dia(s)"
                />
            </Root.Container>


            <Root.TextArea
                name="step_2.order_tracking"
                title="Como os clientes podem rastrear seu pedido?"
            />

            <Root.Optional
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


        </Root.Step>
    )
};