import { useContext } from "react"
import { ModalContext } from "../../../../../../../context/ModalContext"
import { PopUp } from "../../../../../../../components/modal/templates/PopUp"
import { ChoosePlan } from "../../Modals/ChoosePlan"
import ButtonMain from "../../../../../../../components/button/ButtonBlue"
import { clientTypes } from "../../../../../../../@types/clientTypes"

export function ButtonChangeAndAddPlan({ client }: { client?: clientTypes }) {
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
            <ButtonMain onClick={handleChangePlan}>
                {
                    client?.plan_management && client.plan_management.status !== "DISABLED" ?
                        "Mudar de plano"
                        :
                        "Adicionar plano"
                }
            </ButtonMain>
        </div>
    )
};