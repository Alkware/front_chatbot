import { PlanManagement } from "../../../../../../../../../../../@types/planManagement";

export function PlanName({ plan_management }: { plan_management?: PlanManagement }) {
    return (
        plan_management && plan_management.status !== "DISABLED" ?
            <span className="font-bold text-yellow-600 uppercase">{plan_management.plan.plan_name}</span>
            :
            <span className="text-zinc-400/60">Sem plano</span>
    )
};