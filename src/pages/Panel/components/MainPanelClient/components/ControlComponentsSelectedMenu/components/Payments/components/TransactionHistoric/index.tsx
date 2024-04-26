import { PlanManagement } from "../../../../../../../../../../@types/planManagement";
import { formatDate } from "../../../../../../../../../../functions/formatDate";


export function TransactionHistoric({ plan_management }: { plan_management?: PlanManagement }) {

    return (
        <div className="w-full flex flex-col items-center">
            <h2 className="text-xl p-2">Historico de transações</h2>
            <div className="w-full max-w-[1000px] p-4">
                {
                    plan_management ?
                        <div className="w-full flex flex-col rounded-md">
                            <div className="w-full flex p-4 justify-between bg-primary-100/20 border border-primary-100 rounded-md">
                                <span className="text-center">Plano</span>
                                <span className="text-center">Transação</span>
                                <span className="text-center">Data e hora</span>
                                <span className="text-center">Valor do plano</span>
                                <span className="text-center">Método de pagamento</span>
                                <span className="text-center">Status</span>
                            </div>
                            {
                                plan_management.trasaction.map((payment, index) =>
                                    <div key={index} className="w-full flex px-4 justify-between border border-zinc-500/20">
                                        <span className="text-center">{plan_management.plan.plan_name}</span>
                                        <span className="text-center">{payment.transaction_describe === "PAYMENT" ? "Pagamento" : payment.transaction_describe === "REFUND_REQUEST" ? "Reembolso solicitado": payment.transaction_describe === "SUBSCRIPTION_CANCELLATION" ? "Plano cancelado": "Reembolso cancelado"}</span>
                                        <span className="text-center">{formatDate(payment.created_at).dateFormat_A}</span>
                                        <span className="text-center">R${Number(payment.amount_paid).toFixed(2).replace(".", ",")}</span>
                                        <span className="text-center">{payment.payment_method}</span>
                                        <span className="text-center">{payment.status === "APPROVED" ? "Aprovado" : payment.status === "REJECT" ? "Recusado" : "Pendente"}</span>
                                    </div>
                                )
                            }
                        </div>
                        :
                        <h2 className="text-zinc-500">Você ainda não efetuou nenhum pagamento</h2>
                }
            </div>
        </div>
    )
};