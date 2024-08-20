import { Client_Company } from "./clientCompany.types"
import { PlanManagement } from "./planManagement"
import { Project } from "./Project"

export interface Artificial_Intelligence {
    id: string
    plan_management_id: string
    client_company_id: string
    artificial_name: string
    client_describe: string
    restrictions?: string | null; 
    
    ai_products_Services: any;
    plan_management: PlanManagement
    company: Client_Company;
    project: Project[]

    created_at: Date
    updated_at: Date
}

export type Info_Artificial_Intelligence = Omit<Artificial_Intelligence,
    "id" |
    "created_at" |
    "updated_at" |
    "plan_management" |
    "ai_products_Services" |
    "company" |
    "project"
>;