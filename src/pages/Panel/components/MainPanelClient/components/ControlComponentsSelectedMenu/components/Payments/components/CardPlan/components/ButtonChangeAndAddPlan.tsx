import { Client } from "../../../../../../../../../../../@types/Client"
import { Button } from "../../../../../../../../../../../components/button/Button"
import { useNavigate } from "react-router-dom"


export function ButtonChangeAndAddPlan({ client }: { client?: Client }) {
    const navigate = useNavigate();

    const handleChangePlan = () => {
        navigate("/plans")
    }

    const realeaseAddPlanButton = () => {
        if (!!client?.refund_requested.length && client.refund_requested[0].status !== "PENDING") return true
        return true
    }

    return (
        realeaseAddPlanButton() &&
        <div className="w-full flex flex-col my-4 justify-center items-center">
            <Button onClick={handleChangePlan}>
                {
                    (client?.plan_management && client.plan_management.status) !== "DISABLED" ?
                        Number(client?.plan_management.plan.monthly_price) > 0 ?
                        "Mudar de plano"
                        :
                        "Contratar plano"
                        :
                        "Adicionar plano"
                }
            </Button>
        </div>
    )
};