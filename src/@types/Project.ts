import { Chat } from "./Chat";
import { Metric } from "./metric.types";
import { Prompt } from "./prompt.types";

export interface Project {
    id?: string,
    slug?: string
    project_name: string,
    logo: string,
    plan_management_id: string,
    bio: string,
    describe_client: string;
    chat_input_message: string[],
    chat_type?: string
    pixel_facebook?: string,
    is_online?: boolean,
    metric: Metric,
    created_at: string | Date,
    prompt: Prompt,
    call_to_action: Array<{
        button_text: string,
        link: string
    }>,
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
    chat: Chat[]

}

export interface ProjectCreateTypes {
    id?: string,
    slug?: string
    project_name: string,
    logo: string,
    prompt_id: string,
    plan_management_id: string,
    bio: string,
    chat_input_message: string[],
    chat_type?: string
    pixel_facebook?: string,
    is_online?: boolean,
    call_to_action: Array<{
        button_text: string,
        link: string
    }>,
}



