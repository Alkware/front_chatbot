import { Client_Company } from "./clientCompany.types"
import { PlanManagement } from "./planManagement"
import { Product } from "./products.types"
import { Project } from "./Project"
import { Service } from "./services.types"

export interface Artificial_Intelligence {
    id: string
    plan_management_id: string
    client_company_id: string

    identification: string
    artificial_name?: string
    client_describe: string
    restrictions?: string | null; 
    
    ai_products_Services: Ai_products_Services[];
    plan_management: PlanManagement
    company: Client_Company;
    project: Project[]

    created_at: Date
    updated_at: Date
}

export interface Ai_products_Services{
    product_id: string,
    service_id: string;
    product: Product;
    service: Service;
}

export type Info_Artificial_Intelligence = Omit<Artificial_Intelligence,
    "id" |
    "created_at" |
    "updated_at" |
    "plan_management" |
    "ai_products_Services" |
    "company" |
    "project"
> & {
    products_id: string[];
    services_id: string[];
    client_company_id: string
};