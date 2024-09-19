import { Plan } from "./Plan";
import { Project } from "./Project"
import { MessageManager } from "./messageManager.types";
import { Product } from "./products.types";
import { Service } from "./services.types";
import { Artificial_Intelligence } from "./artificialInteligence.types";
import { Client_Company } from "./clientCompany.types";

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
    message_manager: MessageManager
    products: Product[];
    services: Service[];
    artificial_intelligence: Artificial_Intelligence[]
    client_company: Client_Company[]
    trasaction: Array<{
        payment_method: string,
        amount_paid: number,
        created_at: string,
        updated_at: string,
        status: "APPROVED" | "REJECT" | "PENDING"
        transaction_describe : | "PAYMENT" | "REFUND_REQUEST" | "REFUND_CANCELLATION" | "SUBSCRIPTION_CANCELLATION" | "UNKNOWN"
    }>,
}

