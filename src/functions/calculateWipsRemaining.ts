import { clientTypes } from "../@types/clientTypes"

export const handleCalcWipsRemaning = (client: clientTypes) => {
    const amountTokens = client.plan_management.project.reduce((total, project) =>
        total + project.metric.chat_event.reduce((total, events) =>
            total + events.used_tokens.reduce((total, tokens) => total + (tokens.input + tokens.output), 0), 0), 0)

    return Number(client.plan_management.plan.max_wips - (amountTokens / 1000)).toFixed(2).replace(".", ",")
}
