import { useContext, useEffect, useState } from "react"
import { getPlans } from "../../../../../../api/plan";
import { FaCheck, FaWindowClose } from "react-icons/fa";
import { ModalContext } from "../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../components/modal/templates/PopOver";
import { Client } from "../../../../../../@types/Client";
import { Button } from "../../../../../../components/button/Button";


interface Plans {
    id: string,
    plan_name: string,
    price: number,
    max_projects: number,
    max_wips: number,
    orderRelevance: number,
    link: string
}

export function ChoosePlan({ client }: { client: Client }) {
    const [plans, setPlans] = useState<Plans[]>();
    const { setModalContent } = useContext(ModalContext)

    useEffect(() => {
        (async () => {
            const response = await getPlans();
            response && setPlans(response.data)
        })();
    }, [])

    const handleClose = () => {
        setModalContent({
            isOpenModal: false
        })
    }

    const handleChoosePlan = (plan: Plans) => {
        if (client.plan_management && client.plan_management.status === "ACTIVE" && client.plan_management.plan.plan_name === plan.plan_name) return

        if (client) window.location.href = `${plan.link}?cid=${client.id}&pid=${plan.id}`
        else {
            setModalContent({
                isOpenModal: true,
                components: <PopOver message="Erro ao abrir o checkout" />
            })
        }

    }

    const controlWhatButtonDisplay = (plan: Plans) => {
        if (!!client.plan_management) {
            if (client.plan_management.plan.plan_name === plan.plan_name) return true
            else false
        } else return false
    }

    return (
        plans &&
        <div className="min-w-[250px] flex flex-col gap-4">
            <div className="w-full flex justify-between items-center">
                <h2 className="w-full font-bold text-xl">Escolha um plano:</h2>
                <FaWindowClose className="cursor-pointer" onClick={handleClose} />
            </div>

            <div className="w-full flex gap-4">
                {
                    plans.length ?
                        plans.map(plan =>
                            <div
                                key={plan.plan_name}
                                className="min-w-[200px] border border-zinc-400/60 rounded-md p-2 flex flex-col items-center"
                            >
                                <h2 className="text-yellow-600">{plan.plan_name}</h2>
                                <div className="w-full flex flex-col my-2">
                                    <div className="w-full flex gap-2 items-center ">
                                        <FaCheck className="fill-green-500" />
                                        <p className="text-sm">Quantidade de chats: {plan.max_projects}</p>
                                    </div>
                                    <div className="w-full flex gap-2 items-center">
                                        <FaCheck className="fill-green-500" />
                                        <p className="text-sm">Limite de wips: {plan.max_wips}</p>
                                    </div>
                                </div>
                                <span className="">R$ {Number(plan.price).toFixed(2).replace(".", ",")}</span>
                                {
                                    controlWhatButtonDisplay(plan) ?
                                        <Button
                                            onClick={() => handleChoosePlan(plan)}
                                            className={`mt-8 ${client.plan_management.status === "ACTIVE" ? "opacity-60 cursor-not-allowed" : "opacity-100"}`}
                                        >
                                            {
                                                client.plan_management.status !== "ACTIVE" ?
                                                    "Reativar plano"
                                                    :
                                                    "Plano atual"
                                            }
                                        </Button>
                                        :
                                        <Button
                                            onClick={() => handleChoosePlan(plan)}
                                            className="mt-8"
                                        >Quero esse</Button>
                                }
                            </div>
                        )
                        :
                        <h2>Nenhum plano foi encontrado!</h2>
                }
            </div>

        </div>
    )
};