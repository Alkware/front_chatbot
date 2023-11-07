export interface clientTypes {
    id: string,
    logo: string, 
    fullname: string,
    isAdmin: boolean,
    user: string,
    project: Array<{
        id: string
        slug: string, 
        project_name: string,
        logo: string,
        prompt: string,
        chat_type: string,
        is_online: boolean,
        bio: string
    }>
}

export interface clientRegisterTypes{
    email: string, 
    password: string, 
    fullname: string
}

export interface clientLoginTypes {
    email: string,
    password: string
}