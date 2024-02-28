import { useContext } from "react"
import { ModalContext } from "../../../../../../../../../../../context/ModalContext"
import { calculatesRemainingFreeTrialDays } from "../../../../../../../../../../../functions/calculatesRemainingFreeTrialDays"
import { PopOver } from "../../../../../../../../../../../components/modal/templates/PopOver"
import { refundRequested } from "../../../../../../../../../../../api/refundRequested"
import { Client } from "../../../../../../../../../../../@types/Client"


export function ButtonRequestRefund({ client }: { client?: Client }) {
    const { setModalContent } = useContext(ModalContext)

    const freeTrial = () => {
        if (client?.plan_management) return calculatesRemainingFreeTrialDays(client?.plan_management.free_trial)
        else return 0
    }

    const handleRefundRequested = async () => {
        if (client) {
            const reason = prompt("Digite o motivo do seu cancelamento:")
            const review = prompt("Digite de 0 a 5, o quanto você gostou do nosso sistema")

            const data = {
                client_id: client.id,
                reason: reason || "",
                product_review: Number(review || 0)

            }

            const response = await refundRequested(data)

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
    }


    const realeaseRefundButton = () => {
        if (!!client?.plan_management) {
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
        if (!!client?.plan_management) {
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