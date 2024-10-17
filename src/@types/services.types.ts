import {  Image } from "./images.types";
import { PlanManagement } from "./planManagement";

export type Promocional_price = {
    price?: number | null;
    end_date?: {
        day?: string | null,
        month?: string | null,
        year?: string | null,
    } | null
};

export type Category = {
    name: string;
};

export type Warranty_time = {
    type: string;
    time: number
};
export type Optional_variable = {
    title: string;
    value: string
};

export type Questions = {
    ask: string;
    answer: string
};

export interface Service {
    id: string
    plan_management_id: string
    category: Category
    service_name: string
    price: string
    promocional_price?: Promocional_price | null
    description: string
    payment_methods: string[]
    credit_card_installments?: string | null;
    is_service_online: boolean;
    warranty_time: Warranty_time
    questions?: Questions[] | null;
    how_guarantee_work: string
    extra_information?: string | null;
    plan_management?: PlanManagement;
    images: Image[];
    image_main: Image;
    created_at?: Date
    updated_at?: Date
}


export type Create_Service = Omit<Partial<Service>, "images"> & { images: string[] }