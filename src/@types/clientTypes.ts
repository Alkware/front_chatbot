import { PlanManagement } from "./planManagement"

export interface clientTypes {
    id: string,
    logo: string,
    fullname: string,
    isAdmin: boolean,
    user: string,
    ticto_order_code: string,
    purchase_email: string,
    plan_management: PlanManagement,
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