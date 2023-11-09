interface ProjectTypes {
    project_name: string,
    logo: string,
    prompt: string,
    client_id: string,
    bio: string,
    describe_client: string;
    
    id?: string,
    slug?: string
    chat_type?: string
    pixel_facebook?: string,

    call_to_action: Array<{
        button_name: string,
        link: string
    }>,

}