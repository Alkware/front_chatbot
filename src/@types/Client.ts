import { Notification_client } from "./notification_client"
import { PlanManagement } from "./planManagement"

export interface Client {
    id: string,
    logo: string,
    fullname: string,
    cpf_cnpj: string,
    email: string,
    isAdmin: boolean,
    user: string,
    ticto_order_code: string,
    purchase_email: string,
    plan_management: PlanManagement,
    notification_client: Notification_client[],
    refund_requested: Array<{
        created_at: string,
        status: "PENDING" | "APPROVED" | "CANCEL",
    }>,

}


export interface clientRegisterTypes {
    email: string,
    password: string,
    fullname: string
}

export interface clientLoginTypes {
    email: string,
    password: string
}