import { Guest } from "./guest.types";
import { Image } from "./images.types"
import { Notification_client } from "./notification_client"
import { PlanManagement } from "./planManagement"

export interface Client {
    id: string
    fullname: string
    logo: string | null
    cpf_cnpj: string | null
    email: string
    user: string
    verified_email: boolean
    tutorial: boolean
    ticto_order_code: string
    purchase_email: string
    cell_phone: string | null
    machine_ip: string | null
    traffic_origin: string[]
    images: Image[];
    notification_client: Notification_client[];
    plan_management: PlanManagement;
    refund_requested: any;
    guest: Guest[];
    created_at: Date
    updated_at: Date
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