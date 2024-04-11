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
        <div className="w-full flex flex-col">
            <span>Projetos criados: {plan_management.project.length} / {Number(plan_management.plan.max_projects.default)}</span>
            <span>Limite de messages: {messagesEventManager(plan_management).totalMessages} / {Number(plan_management.plan.max_messages.default)} </span>
            <span>Reembolso garantido: {freeTrial() > 0 ? freeTrial() + " dias restantes" : "expirado"}</span>
            <span>Status do plano: {plan_management.status === "ACTIVE" ? "Ativo" : "Desativado"}</span>
        </div>
    )
};