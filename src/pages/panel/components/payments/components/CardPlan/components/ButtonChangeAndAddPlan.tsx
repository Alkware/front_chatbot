import { useContext } from "react"
import { ModalContext } from "../../../../../../../context/ModalContext"
import { PopUp } from "../../../../../../../components/modal/templates/PopUp"
import { ChoosePlan } from "../../Modals/ChoosePlan"
import { Client } from "../../../../../../../@types/Client"
import { Button } from "../../../../../../../components/button/Button"

export function ButtonChangeAndAddPlan({ client }: { client?: Client }) {
    const { setModalContent } = useContext(ModalContext)

    const handleChangePlan = () => {
        if (client) {
            setModalContent({
                isOpenModal: true,
                components: <PopUp><ChoosePlan client={client} /></PopUp>
            })
        }
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