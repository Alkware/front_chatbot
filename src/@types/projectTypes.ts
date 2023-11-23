import { Dispatch, SetStateAction } from "react";

export interface Metric {
    chat_event: Array<{
        answer_time: Array<number>,
        whats_first_message: Array<string>,
        created_at: string,
        updated_at: string,
        chat_time: Array<{
            closed_at: string,
            created_at: string,
        }>,
        open_chat: Array<{
            created_at: string,
        }>,
        used_tokens: Array<{
            input: number, output: number,
            created_at: string,
        }>,
    }>
}


export interface ProjectTypes {
    project_name: string,
    logo: string,
    prompt: string,
    client_id: string,
    bio: string,
    describe_client: string;
    chat_input_message: string[],
    metric?: Metric,
    id?: string,
    slug?: string
    chat_type?: string
    pixel_facebook?: string,
    is_online?: boolean,

    call_to_action: Array<{
        button_text: string,
        link: string
    }>,
}


export interface SetStateProject {
    project: ProjectTypes;
    setNewProject: Dispatch<SetStateAction<any>>
}