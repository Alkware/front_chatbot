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
        <div className="w-full flex flex-col gap-4 my-4">
            <Button onClick={handleChangePlan}>
                {
                    client?.plan_management && client.plan_management.status !== "DISABLED" ?
                        "Mudar de plano"
                        :
                        "Adicionar plano"
                }
            </Button>
        </div>
    )
};