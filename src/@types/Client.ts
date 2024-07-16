import { Notification_client } from "./notification_client"
import { PlanManagement } from "./planManagement"

export interface Client {
    id: string,
    logo: string,
    fullname: string,
    cpf_cnpj: string,
    email: string,
    is_admin: boolean,
    tutorial: boolean;
    user: string,
    ticto_order_code: string,
    purchase_email: string,
    plan_management: PlanManagement,
    notification_client: Notification_client[],
    refund_requested: Array<{
        created_at: string,
        status: "PENDING" | "APPROVED" | "CANCEL",
    }>,
    created_at: string;
}


export interface clientRegisterTypes {
    email: string;
    password: string;
    fullname: string;
    origin: string;
}

export interface clientLoginTypes {
    email: string,
    password: string
}