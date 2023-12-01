import { useContext } from "react";
import ButtonMain from "../../../../components/button/ButtonBlue";
import { ClientContext } from "../../../../context/ClientContext";
import { ModalContext } from "../../../../context/ModalContext";
import { PopUp } from "../../../../components/modal/templates/PopUp";
import { ChoosePlan } from "./components/ChoosePlan";
import { PopOver } from "../../../../components/modal/templates/PopOver";
import { reactivatePlan, refundRequested } from "../../../../api/refundRequested";
import { calculatesRemainingFreeTrialDays } from "../../../../functions/calculatesRemainingFreeTrialDays";
import ButtonGreen from "../../../../components/button/ButtonGreen";

export function Payments() {
    const { client } = useContext(ClientContext);
    const { setModalContent } = useContext(ModalContext)

    const handleChangePlan = () => {
        if (client) {
            setModalContent({
                isOpenModal: true,
                components: <PopUp><ChoosePlan client={client} /></PopUp>
            })
        }
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
                    isOpenModal: true,
                    components: <PopOver message="Solicitação de reembolso foi enviada com sucesso!" />
                })
                setTimeout(() => window.location.reload(), 1000)
            } else {
                setModalContent({
                    isOpenModal: true,
                    components: <PopOver message="Ocorreu um erro ao enviar sua solicitação de reembolso, por favor entre em contato com nosso suporte." />
                })
            }



        } else {
            setModalContent({
                isOpenModal: true,
                components: <PopOver message="Erro ao processar o cliente, por favor recarregue a página." />
            })
        }
    }

    const freeTrial = () => {
        if (client?.plan_management) return calculatesRemainingFreeTrialDays(client?.plan_management.free_trial)
        else return 0
    }

    const handleRefundReactived = async () => {
        if (client) {
            const response = await reactivatePlan(client.id)
            if (response) {
                setModalContent({
                    isOpenModal: true,
                    components: <PopOver message="Plano reativado com  sucesso!" />
                })
                setTimeout(() => window.location.reload(), 1500);
            }
        }
    }

    const realeaseRefundButton = () => {
        if (!!client?.refund_requested.length) {
            if ( client.refund_requested[0].status === "CANCEL" ) return true
            else return false
        } else if(client?.plan_management){
            if(client?.plan_management && freeTrial() > 0 && client.plan_management.status !== "DISABLED")return true
        }else {
            if(!!client?.plan_management)return true
            else return false
        }
    }

    const realeaseAddPlanButton = () => {
        if (!!client?.plan_management) return true
        if (!!client?.refund_requested.length  && client.refund_requested[0].status !== "PENDING") return true
        return false
    }

    return (
        <div className="w-full">
            <div className="w-full p-4 flex gap-6 justify-center">
                <div className="w-1/2 min-w-[150px] max-w-[400px] border border-zinc-600 p-2 rounded-md">
                    <h2 className="w-full text-center">Plano atual:</h2>
                    <div className="w-full flex justify-center p-4">
                        {
                            client?.plan_management && client.plan_management.status !== "DISABLED" ?
                                <span className="font-bold text-yellow-600 uppercase">{client.plan_management.plan.plan_name}</span>
                                :
                                <span className="text-zinc-400/60">Sem plano</span>

                        }
                    </div>
                    {
                        (client?.plan_management && client.plan_management.status !== "DISABLED") &&
                        <div className="w-full flex flex-col">
                            <span>Projetos criados: {client?.plan_management.project.length} / {client?.plan_management.plan.max_projects}</span>
                            <span>Limite de wips: {client?.plan_management.used_wips} / {client?.plan_management.plan.max_wips}</span>
                            <span>Reembolso garantido: {freeTrial() > 0 ? freeTrial() + " dias restantes" : "expirado"}</span>
                            <span>Status do plano: {client?.plan_management.status === "ACTIVED" ? "desativado" : "Ativo"}</span>
                        </div>

                    }
                    {
                        realeaseAddPlanButton() &&
                        <div className="w-full flex flex-col gap-4 my-4">
                            <ButtonMain onClick={handleChangePlan}>
                                {
                                    client?.plan_management && client.plan_management.status !== "DISABLED" ?
                                        "Mudar de plano"
                                        :
                                        "Adicionar plano"
                                }
                            </ButtonMain>
                        </div>
                    }

                    {
                        realeaseRefundButton() &&
                        <div className="w-full flex justify-center">
                            <a onClick={handleRefundRequested} className="text-center underline cursor-pointer">Pedir reembolso</a>
                        </div>
                    }
                </div>

                {
                    (!!client?.refund_requested.length && client.refund_requested[0].status !== "CANCEL") &&
                    <div className="w-1/2 min-w-[150px] max-w-[400px] border border-zinc-600 p-2 rounded-md">
                        <h2 className="w-full text-center pb-4 text-xl">Reembolso solicitado:</h2>
                        <span className="flex gap-2 text-zinc-400">
                            Reembolso solicidado em:
                            <p>{client.refund_requested[0].created_at.substring(0, 10)}</p>
                        </span>
                        <span className="flex gap-2 text-zinc-400">
                            Plano:
                            <p>{client.plan_management.plan.plan_name}</p>
                        </span>
                        <span className="flex gap-2 text-zinc-400">
                            Status:
                            {
                                client.refund_requested[0].status === "PENDING" ?
                                    <p className="text-red-600">Pendente</p>
                                    :
                                    client.refund_requested[0].status === "APPROVED" ?
                                        <p className="text-green-600">Dinheiro devolvido</p>
                                        :
                                        <p className="text-zinc-200">Reembolso cancelado</p>

                            }
                        </span>
                        <div className="w-full flex justify-center mt-6">
                            {

                                client.refund_requested[0].status === "PENDING" &&
                                    <ButtonGreen
                                        onClick={handleRefundReactived}

                                    >
                                        Cancelar reembolso
                                    </ButtonGreen>

                            }
                        </div>

                    </div>
                }
            </div>

            <div className="w-full flex flex-col items-center">
                <h2 className="text-xl p-2">Historico de pagamentos</h2>
                <div className="w-full max-w-[1000px]">
                    {
                        client?.plan_management ?
                            <div className="w-full flex flex-col">
                                <div className="w-full flex p-4 justify-between border border-zinc-800">
                                    <span className="w-1/3 text-center">Pago em</span>
                                    <span className="w-1/3 text-center">Valor pago</span>
                                    <span className="w-1/3 text-center">Método de pagamento</span>
                                    <span className="w-1/3 text-center">Status</span>
                                </div>
                                {
                                    client.plan_management.trasaction.map((payment, index) =>
                                        <div key={index} className="w-full flex px-4 justify-between border border-zinc-500/20">
                                            <span className="w-1/3 text-center">{payment.created_at.replace("T", " - ").replace("Z", "").substring(0, 18)}</span>
                                            <span className="w-1/3 text-center">R${payment.amount_paid.toFixed(2).replace(".", ",")}</span>
                                            <span className="w-1/3 text-center">{payment.payment_method}</span>
                                            <span className="w-1/3 text-center">{payment.status === "REJECT" ? "Aprovado" : "Recusado"}</span>
                                        </div>
                                    )
                                }
                            </div>
                            :
                            <h2 className="text-zinc-500">Você ainda não efetuou nenhum pagamento</h2>
                    }
                </div>
            </div>

        </div>
    )
};