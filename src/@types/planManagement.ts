import { Project } from "./Project"
import { Prompt } from "./prompt.types"

export interface PlanManagement {
    id: string,
    free_trial: Date,
    last_pyament: string,
    next_payment: string,
    status: "DISABLED" | "ACTIVE",
    created_at: string,
    trasaction: Array<{
        payment_method: string,
        amount_paid: number,
        created_at: string,
        updated_at: string,
        status: "APPROVED" | "REJECT" | "PENDING"
        transaction_describe : | "PAYMENT" | "REFUND_REQUEST" | "REFUND_CANCELLATION" | "SUBSCRIPTION_CANCELLATION" | "UNKNOWN"
    }>,
    project: Project[],
    plan: {
        plan_name: string,
        max_projects: number,
        max_messages: number,
        max_databases: number,
    },
    prompt: Prompt[]
    plan_message_manager: Array<{
        input: number,
        output: number, 
        last_messages_send: any
    }>
}