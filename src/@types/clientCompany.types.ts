export interface Support_hours {
    day: string;
    start: string;
    end: string;
}


export interface Client_Company {
    id: string
    company_name: string
    company_description: string
    address: string
    contact_email: string
    contact_phone_number: string
    support_hours: Support_hours[];
    created_at: Date
    updated_at: Date
}

export type Info_Client_Company = Omit<Client_Company, "id" | "created_at" | "updated_at">