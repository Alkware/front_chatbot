import { PlanManagement } from "../@types/planManagement"

export const calculateWips = (plan_management: PlanManagement) => {

    const amountTokens = plan_management.project.reduce((total, project) =>
        total + project.metric.chat_event.reduce((total, events) =>
            total + events.used_tokens.reduce((total, tokens) => total + (tokens.input + tokens.output), 0), 0), 0)

    return {
        usedWips: (amountTokens / 1000).toFixed(2).replace(".", ","),
        wipsRemaning: Number(plan_management.plan.max_wips - (amountTokens / 1000)).toFixed(2).replace(".", ",")
    }
}
