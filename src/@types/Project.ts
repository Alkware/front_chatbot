import { Metric } from "./metric.types";
import { MessageManager } from "./messageManager.types";
import { Artificial_Intelligence } from "./artificialInteligence.types";
import { Chat_appearance } from "./chatAppearence.types";
import { PlanManagement } from "./planManagement";
import { Image } from "./images.types";

export interface Project {
    id: string
    plan_management_id: string
    prompt_id?: string | null
    artificial_intelligence_id: string | null;
    logo_id: string | null;
    project_name: string
    slug: string
    bio?: string
    pixel_facebook?: string | null
    is_online: boolean
    chat_input_message: string[]
    call_to_action?: any
    links?: Link[]
    chat_appearance?: Chat_appearance
    message_manager: MessageManager[]
    metric: Metric
    plan_management: PlanManagement
    artificial_intelligence: Artificial_Intelligence
    logo: Image
    created_at: Date
    updated_at: Date
}

export type Create_project = Omit<Project,
    "id" |
    "slug" |
    "bio" |
    "is_online" |
    "message_manager" |
    "metric" |
    "logo" |
    "plan_management" |
    "artificial_intelligence" |
    "created_at" |
    "updated_at" 
>;

export type Update_project = Omit<Project,
    "id" |
    "is_online" |
    "slug" |
    "message_manager" |
    "metric" |
    "logo" |
    "plan_management" |
    "artificial_intelligence" |
    "created_at" |
    "updated_at" 
> & {
    slug?: string;
};

export type Link = {
    title: string;
    url: string;
    description: string;
}
