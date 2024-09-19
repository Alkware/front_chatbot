import { FormEventHandler, MouseEvent, useContext } from "react"
import { ModalContext } from "../../../../../../../../../../../context/ModalContext"
import { calculatesRemainingFreeTrialDays } from "../../../../../../../../../../../functions/calculatesRemainingFreeTrialDays"
import { PopOver } from "../../../../../../../../../../../components/modal/templates/PopOver"
import { refundRequested } from "../../../../../../../../../../../api/refundRequested"
import { Client } from "../../../../../../../../../../../@types/Client.types"
import { PopUp } from "../../../../../../../../../../../components/modal/templates/PopUp"
import { TextArea } from "../../../../../../../../../../../components/Form/components/Fields/TextArea/TextArea"
import { Button } from "../../../../../../../../../../../components/button/Button"


export function ButtonRequestRefund({ client }: { client?: Client }) {
    const { setModalContent } = useContext(ModalContext)

    const freeTrial = () => {
        if (client?.plan_management && Number(client.plan_management.plan.monthly_price) > 0) return calculatesRemainingFreeTrialDays(client?.plan_management.free_trial)
        else return 0
    }

    const handleRefundRequested = async () => {

        // Função responsável por criar a solicitação de reembolso do usuário...
        const requestRefund: FormEventHandler<HTMLFormElement> = (e) => {
            e.preventDefault();
            const reason = e.currentTarget.querySelector("textarea")?.value;
            const review = e.currentTarget.querySelector("div > span[data-active='true']")?.textContent

            // Verifica se o motivo e a nota foram preenchidos...
            if (!reason || !review) {
                setModalContent({
                    componentName: "modal_error_refund",
                    components:
                        <PopOver
                            componentName="modal_error_refund"
                            message="Informe o motivo da solicitação do seu reembolso e de uma nota para sua expêriencia na Wipzee."
                            type="WARNING"
                        />
                })

                return;
            }

            // Função que se auto executa para solicitar o reembolso...
            (async () => {
                if (client) {
                    const data = {
                        client_id: client.id,
                        reason: reason || "",
                        product_review: Number(review || 0)

                    }

                    const response = await refundRequested(data);

                    if (response) {
                        setModalContent({
                            componentName: "modal_request_success",
                            components: <PopOver message="Solicitação de reembolso foi enviada com sucesso!" componentName="modal_request_success" />
                        })
                        setTimeout(() => window.location.reload(), 1000)
                    } else {
                        setModalContent({
                            componentName: "modal_error_request",
                            components:
                                <PopOver
                                    message="Ocorreu um erro ao enviar sua solicitação de reembolso, por favor entre em contato com nosso suporte."
                                    componentName="modal_error_request"
                                />
                        })
                    }
                } else {
                    setModalContent({
                        componentName: "modal_error_client",
                        components: <PopOver message="Erro ao processar o cliente, por favor recarregue a página." componentName="modal_error_client" />
                    })
                }
            })();

        }

        // Lida com a seleção da nota da expêriencia dentro da plataforma da Wipzee...
        const handleSelectReview = ({ currentTarget }: MouseEvent<HTMLSpanElement>) => {
            const container = currentTarget.closest("div[data-review='review']");
            container?.querySelectorAll("span").forEach(span => span.dataset.active = "false");
            currentTarget.dataset.active = "true";
        }

        // Modal para extrair informações do motivo do reembolso...
        setModalContent({
            componentName: "modal_reason_client",
            components:
                <PopUp>
                    <h2 className="p-4 text-xl font-medium text-center">Solicitação de reembolso</h2>
                    <form
                        className="w-auto md:w-[500px] p-4 space-y-3"
                        onSubmit={requestRefund}
                    >
                        <TextArea
                            name="reason"
                            title="Por qual motivo você deseja pedir seu reembolso?"
                        />
                        <h2 className="text-center p-4">De uma nota para a sua experiência com a Wipzee. </h2>

                        <div
                            data-review="review"
                            className="w-4/5 flex mx-auto justify-between mt-12"
                        >
                            {
                                Array.from({ length: 6 }).map((_, index) =>
                                    <span
                                        key={index}
                                        className="w-12 h-12 text-light bg-primary-100/30 hover:bg-primary-100 data-[active=true]:bg-primary-100 transition-colors p-3 rounded-full flex items-center justify-center font-bold cursor-pointer"
                                        onClick={handleSelectReview}
                                    >{index}</span>)
                            }
                        </div>
                        <div className="w-full flex justify-center mt-8">
                        <Button>Enviar</Button>
                        </div>
                    </form>
                </PopUp>
        })
    }



    const realeaseRefundButton = () => {
        if (!!client?.plan_management && Number(client.plan_management.plan.monthly_price) > 0) {
            if (!!client?.refund_requested.length && client.plan_management.status === "ACTIVE" && freeTrial() > 0) {
                if (client.refund_requested[0].status !== "PENDING") return true
                else return false
            } else {
                if (freeTrial() > 0 && client.plan_management.status !== "DISABLED") return true
                else return false
            }
        } else false
    }

    const handleCancelSubscription = () => {
        if (client) {
            window.open(`https://dash.ticto.com.br/subscription-verification?code=${client?.ticto_order_code}&email=${client?.purchase_email}`)
        } else {
            setModalContent({
                componentName: "modal_failed_cancel",
                components:
                    <PopOver
                        message="Falha ao preencher os dados de cancelamento, por favor entre em contato com o suporte."
                        componentName="modal_failed_cancel"
                    />
            })
        }
    }

    const realeaseCancelSubscriptionButton = () => {
        if (!!client?.plan_management && Number(client.plan_management.plan.monthly_price) > 0) {
            if (client.plan_management.status === "ACTIVE" && freeTrial() <= 0) {
                if (!!client.refund_requested.length && client.refund_requested[0].status !== "PENDING") return true
                else return false
            }
        } else false
    }



    return (
        realeaseRefundButton() ?
            <div className="w-full flex justify-center">
                <a onClick={handleRefundRequested} className="text-center underline cursor-pointer">Pedir reembolso</a>
            </div>
            :
            realeaseCancelSubscriptionButton() &&
            <div className="w-full flex justify-center">
                <a onClick={handleCancelSubscription} className="text-center underline cursor-pointer">Gerenciar assinatura</a>
            </div>
    )
};