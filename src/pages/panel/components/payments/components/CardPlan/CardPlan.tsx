import { clientTypes } from "../../../../../../@types/clientTypes"
import { PlanName } from "./components/PlanName"
import { PlanInformation } from "./components/PlanInformation"
import { ButtonChangeAndAddPlan } from "./components/ButtonChangeAndAddPlan"
import { ButtonRequestRefund } from "./components/ButtonRequestRefund"

export function CardPlan({ client }: { client?: clientTypes }) {
    return (
        <div className="w-1/2 min-w-[150px] max-w-[400px] border border-zinc-600 p-2 rounded-md">
            <h2 className="w-full text-center">Plano atual:</h2>

            <div className="w-full flex justify-center p-4">
                <PlanName plan_management={client?.plan_management} />
            </div>

            <div className="w-full flex justify-center p-4">
                <PlanInformation plan_management={client?.plan_management} />
            </div>

            <ButtonChangeAndAddPlan client={client} />
            <ButtonRequestRefund  client={client}/>
            
        </div>
    )
};