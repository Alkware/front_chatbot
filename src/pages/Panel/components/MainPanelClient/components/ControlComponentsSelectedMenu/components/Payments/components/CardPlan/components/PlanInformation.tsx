import { PlanManagement } from "../../../../../../../../../../../@types/planManagement"
import { calculatesRemainingFreeTrialDays } from "../../../../../../../../../../../functions/calculatesRemainingFreeTrialDays"
import { messagesEventManager } from "../../../../../../../../../../../functions/messagesEventManager"


export function PlanInformation({ plan_management }: { plan_management?: PlanManagement }) {

    const freeTrial = () => {
        if (plan_management) return calculatesRemainingFreeTrialDays(plan_management.free_trial)
        else return 0
    }




    return (
        (plan_management && plan_management.status !== "DISABLED") &&
        <div className="w-full flex flex-col items-center">
            <span>
                Status:
                <span 
                    data-status={plan_management.status}
                    className="px-1 rounded-md mx-2 bg-red-200 text-red-700 data-[status='ACTIVE']:bg-green-200 data-[status='ACTIVE']:text-green-700"
                >{plan_management.status === "ACTIVE" ? "Ativo" : "Desativado"}</span>
            </span>
            <span>Chats criados: {plan_management.project.length} / {Number(plan_management.plan.max_projects.default)}</span>
            <span>Limite de messages: {messagesEventManager(plan_management).totalMessages} / {Number(plan_management.plan.max_messages.default)} </span>
            <span>Reembolso garantido: {freeTrial() > 0 ? freeTrial() + " dias restantes" : "expirado"}</span>
        </div>
    )
};