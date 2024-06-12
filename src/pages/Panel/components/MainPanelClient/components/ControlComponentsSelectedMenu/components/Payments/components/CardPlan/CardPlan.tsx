import { PlanName } from "./components/PlanName"
import { PlanInformation } from "./components/PlanInformation"
import { ButtonChangeAndAddPlan } from "./components/ButtonChangeAndAddPlan"
import { ButtonRequestRefund } from "./components/ButtonRequestRefund"
import { Client } from "../../../../../../../../../../@types/Client"

export function CardPlan({ client }: { client?: Client }) {
    return (
        <div className="w-4/5 md:w-1/2 min-w-[150px] max-w-[400px] min-h-[200px] flex flex-col justify-between border border-zinc-600 p-2 rounded-md z-20">

            <div className="w-full flex justify-center gap-2">
                <h2 className="text-center">Plano atual:</h2>
                <PlanName plan_management={client?.plan_management} />
            </div>

            <div className="w-full flex justify-center my-4">
                <PlanInformation plan_management={client?.plan_management} />
            </div>

            <ButtonChangeAndAddPlan client={client} />
            <ButtonRequestRefund client={client} />
        </div>
    )
};