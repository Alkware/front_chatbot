import { PlanManagement } from "../@types/planManagement";

export function messagesEventManager(plan_management: PlanManagement) {

    const input =
        plan_management.project
            .reduce((total, project) => total + project.message_manager
                .reduce((total, message) => total + message.messages
                    .reduce((total, msg) => total + (msg.player === "user" ? 1 : 0),
                        0),
                    0),
                0)


    const output = plan_management ? (
        plan_management.project
            .reduce((total, project) => total + project.message_manager
                .reduce((total, message) => total + message.messages
                    .reduce((total, msg) => total + (msg.player === "assistant" ? 1 : 0), 0), 0), 0)
    ) : 0

    const totalMessages = input + output

    const maxMessages = plan_management ? Number(plan_management.plan.max_messages.default) : 0
    const maxBonus = plan_management ? Number(plan_management.plan.max_messages.bonus) : 0


    return {
        input,
        output,
        totalMessages,
        maxMessages,
        maxBonus,
        reminingMessages: maxMessages - totalMessages < 0 ? 0 : maxMessages - totalMessages,
        reminingMessagesBonus: maxMessages - totalMessages >= 0 ? maxBonus : maxBonus - (totalMessages - maxMessages)
    }
}