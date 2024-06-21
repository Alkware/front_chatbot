import { Plan } from "./Plan";
import { Project } from "./Project"
import { Database } from "./Database.types"
import { MessageManager } from "./messageManager.types";

export interface PlanManagement {
    id: string,
    client_id: string;
    free_trial: Date,
    last_pyament: string,
    next_payment: string,
    status: "DISABLED" | "ACTIVE",
    created_at: string,
    metric_analysis: Array<{}>;
    project: Project[],
    plan: Plan,
    prompt: Database[]
    message_manager: MessageManager
    trasaction: Array<{
        payment_method: string,
        amount_paid: number,
        created_at: string,
        updated_at: string,
        status: "APPROVED" | "REJECT" | "PENDING"
        transaction_describe : | "PAYMENT" | "REFUND_REQUEST" | "REFUND_CANCELLATION" | "SUBSCRIPTION_CANCELLATION" | "UNKNOWN"
    }>,
}

