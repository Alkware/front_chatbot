import { PlanManagement } from "../@types/planManagement";

export function messagesEventManager(plan_management: PlanManagement) {
    const input = plan_management.plan_message_manager
        .reduce((total, message) => total + message.input, 0)

    const output = plan_management.plan_message_manager
        .reduce((total, message) => total + message.output, 0)

    const totalMessages = input + output

    const maxMessages = plan_management.plan.max_messages

    return {
        input,
        output,
        totalMessages,
        maxMessages,
        reminingMessages: maxMessages - totalMessages
    }
}