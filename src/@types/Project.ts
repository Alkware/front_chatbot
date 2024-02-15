import { Chat } from "./Chat";
import { Metric } from "./metric.types";
import { Prompt } from "./prompt.types";


export interface Project {
    id?: string,
    slug?: string
    project_name: string,
    logo: string,
    plan_management_id: string,
    prompt_id: string,
    bio: string,
    describe_client: string;
    chat_input_message: string[],
    chat_type?: string
    pixel_facebook?: string,
    is_online?: boolean,
    metric: Metric,
    created_at: string | Date,
    prompt: Prompt,
    call_to_action: Call_to_action[],
    social_proof: Social_proof[];
    plan_message_manager: Array<{
        input: number,
        output: number,
        last_messages_manager: Array<{
            time: string,
            player: number,
            tokens: {},
            message: string
        }>,
        created_at: string | Date
    }>,
    chat_appearence: {
        id: string,
        can_update: boolean,
        chat_icon: number,
        icon_text: string,
        primary_color: string,
        second_color: string,
        background: string,
    };
    chat: Chat[]
}


export type Call_to_action = {   
    button_text: string;
    button_link: string;
    button_describe: string;
}

export type Social_proof = {   
    person_name: string,
    avatar: string,
    images: string[],
    text: string,
    rating: number
}


export interface ProjectCreateTypes {
    id?: string,
    slug?: string
    project_name: string,
    logo: string,
    prompt_id: string,
    plan_management_id: string,
    chat_input_message: string[],
    chat_type?: string
    pixel_facebook?: string,
    is_online?: boolean,
    call_to_action: Call_to_action[],
}



