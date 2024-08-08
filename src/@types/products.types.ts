import { Images } from "./images.types";

export type Promocional_price = {
    price: number;
    end_date: string
}

export type Category = {
    name: string;
}

export type Warranty_time = {
    type: string;
    time: number
}
export type Optional_variable = {
    title: string;
    value: string
}

export type Questions = {
    ask: string;
    answer: string
}

export interface Products {
    id: string
    plan_management_id: string
    product_name: string
    price: number
    description: string
    payment_methods: string[]
    credit_card_installments: number
    how_guarantee_work: string
    how_product_will_be_delivered: string
    tracking_link: string | null
    delivery_fee: string | null
    promocional_price: Promocional_price | null,
    category: Category
    warranty_time: Warranty_time
    optional_variable: Optional_variable[]
    questions: Questions[]
    extra_information: string | null
    how_exchanges_work_and_returns: string
    images: Images[]
    created_at: Date
    updated_at: Date
}


