import { PlanManagement } from "../../../../../../../@types/planManagement";
import { calculateWips } from "../../../../../../../functions/calculateWipsRemaining";
import { calculatesRemainingFreeTrialDays } from "../../../../../../../functions/calculatesRemainingFreeTrialDays";

export function PlanInformation({ plan_management }: { plan_management?: PlanManagement }) {

    const freeTrial = () => {
        if (plan_management) return calculatesRemainingFreeTrialDays(plan_management.free_trial)
        else return 0
    }

    return (
        (plan_management && plan_management.status !== "DISABLED") &&
        <div className="w-full flex flex-col">
            <span>Projetos criados: {plan_management.project.length} / {plan_management.plan.max_projects}</span>
            <span>Limite de wips: {calculateWips(plan_management).usedWips} / {plan_management.plan.max_wips}</span>
            <span>Reembolso garantido: {freeTrial() > 0 ? freeTrial() + " dias restantes" : "expirado"}</span>
            <span>Status do plano: {plan_management.status === "ACTIVE" ? "Ativo" : "Desativado"}</span>
        </div>
    )
};