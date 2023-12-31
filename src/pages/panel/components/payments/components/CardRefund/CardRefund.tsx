import { useContext } from "react";
import { clientTypes } from "../../../../../../@types/clientTypes";
import { ModalContext } from "../../../../../../context/ModalContext";
import { reactivatePlan } from "../../../../../../api/refundRequested";
import { PopOver } from "../../../../../../components/modal/templates/PopOver";
import ButtonGreen from "../../../../../../components/button/ButtonGreen";

export function CardRefund({ client }: { client?: clientTypes }) {
    const { setModalContent } = useContext(ModalContext)



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




    return (
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
    )
};