import { ProjectTypes } from "./projectTypes"

export interface PlanManagement {
    id: string,
    free_trial: Date,
    last_pyament: string,
    next_payment: string,
    status: "DISABLED" | "ACTIVE",
    used_wips: number,
    created_at: string,
    trasaction: Array<{
        payment_method: string,
        amount_paid: number,
        created_at: string,
        updated_at: string,
        status: "APPROVED" | "REJECT" | "PENDING"
        transaction_describe : | "PAYMENT" | "REFUND_REQUEST" | "REFUND_CANCELLATION" | "SUBSCRIPTION_CANCELLATION" | "UNKNOWN"
    }>,
    project: ProjectTypes[],
    plan: {
        max_projects: number,
        plan_name: string,
        max_wips: number,
    }
}