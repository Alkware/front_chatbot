import { Project } from "./Project"
import { PlanManagement } from "./planManagement"

export interface Database {
    id: string
    prompt_name: string
    prompt: string
    client_describe: string,
    prompt_query: string
    plan_management: PlanManagement,
    projects: Project[]
}

export interface CreateDatabase {
    prompt: string
    client_describe: string,
    prompt_query: string
    prompt_name: string;
}
