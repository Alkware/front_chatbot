import { PlanManagement } from "../../../../../../../../../../@types/planManagement";
import { formatDate } from "../../../../../../../../../../functions/formatDate";


export function TransactionHistoric({ plan_management }: { plan_management?: PlanManagement }) {
    return (
        <div className="w-full flex flex-col items-center">
            <h2 className="text-xl p-2">Historico de transações</h2>
            <div className="w-full flex justify-center p-4">
                {
                    plan_management ?
                        <div className="max-w-full rounded-md overflow-auto">
                            <div className="flex ounded-md">
                                <p className="w-32 md:w-40 p-4 flex-none whitespace-nowrap text-ellipsis overflow-hidden text-center bg-primary-100/20 border-y border-primary-100 ">Plano</p>
                                <p className="w-32 md:w-40 p-4 flex-none whitespace-nowrap text-ellipsis overflow-hidden text-center bg-primary-100/20 border-y border-primary-100 ">Transação</p>
                                <p className="w-32 md:w-40 p-4 flex-none whitespace-nowrap text-ellipsis overflow-hidden text-center bg-primary-100/20 border-y border-primary-100 ">Data e hora</p>
                                <p className="w-32 md:w-40 p-4 flex-none whitespace-nowrap text-ellipsis overflow-hidden text-center bg-primary-100/20 border-y border-primary-100 ">Valor do plano</p>
                                <p className="w-32 md:w-40 p-4 flex-none whitespace-nowrap text-ellipsis overflow-hidden text-center bg-primary-100/20 border-y border-primary-100 ">Método de pagamento</p>
                                <p className="w-32 md:w-40 p-4 flex-none whitespace-nowrap text-ellipsis overflow-hidden text-center bg-primary-100/20 border-y border-primary-100 ">Status</p>
                            </div>
                            {
                                plan_management.trasaction.map((payment, index) =>
                                    <div key={index} className="flex py-2 ">
                                        <span className="w-32 md:w-40 flex-none whitespace-nowrap text-center">{plan_management.plan.plan_name}</span>
                                        <span className="w-32 md:w-40 flex-none whitespace-nowrap text-center">{payment.transaction_describe === "PAYMENT" ? "Pagamento" : payment.transaction_describe === "REFUND_REQUEST" ? "Reembolso solicitado": payment.transaction_describe === "SUBSCRIPTION_CANCELLATION" ? "Plano cancelado": "Reembolso cancelado"}</span>
                                        <span className="w-32 md:w-40 flex-none whitespace-nowrap text-center">{formatDate(payment.created_at).dateFormat_A}</span>
                                        <span className="w-32 md:w-40 flex-none whitespace-nowrap text-center">R$ {payment.amount_paid}</span>
                                        <span className="w-32 md:w-40 flex-none whitespace-nowrap text-center">{payment.payment_method}</span>
                                        <span className="w-32 md:w-40 flex-none whitespace-nowrap text-center">{payment.status === "APPROVED" ? "Aprovado" : payment.status === "REJECT" ? "Recusado" : "Pendente"}</span>
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