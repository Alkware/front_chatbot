import { Images } from "./images.types";

export type Promocional_price = {
    price: number;
    end_date: string;
};

export type  Category  = {
    name: string;
};

export type  Warranty_time  = {
    type: string;
    time: number
};

export type  Questions  = {
    ask: string;
    answer: string
};
export interface Services {
    id: string
      plan_management_id: string
      category: Category
      service_name: string
      description: string
      price: number
      promocional_price: Promocional_price | null
      payment_methods: string[]
      credit_card_installments: number
      is_service_online: boolean
      warranty_time: Warranty_time
      questions: Questions[]
      images: Images[]
      how_guarantee_work: string
      extra_information: string
      created_at: Date
      updated_at: Date
}


