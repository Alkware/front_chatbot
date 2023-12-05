import { Metric } from "./metric.types";

export interface ProjectTypes {
    id?: string,
    slug?: string
    project_name: string,
    logo: string,
    prompt: string,
    plan_management_id: string,
    bio: string,
    describe_client: string;
    chat_input_message: string[],
    chat_type?: string
    pixel_facebook?: string,
    is_online?: boolean,
    metric: Metric,
    call_to_action: Array<{
        button_text: string,
        link: string
    }>,
}


