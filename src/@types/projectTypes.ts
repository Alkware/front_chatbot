import { Dispatch, SetStateAction } from "react";

export interface ProjectTypes {
    project_name: string,
    logo: string,
    prompt: string,
    client_id: string,
    bio: string,
    describe_client: string;
    chat_input_message: string[],

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