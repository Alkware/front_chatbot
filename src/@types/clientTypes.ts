export interface clientTypes {
    id: string,
    logo: string,
    fullname: string,
    isAdmin: boolean,
    user: string,
    plan_management: {
        free_trial: Date,
        project: Array<{
            id: string
            slug: string,
            project_name: string,
            logo: string,
            prompt: string,
            chat_type: string,
            is_online: boolean,
            bio: string,
            metric: {
                chat_event: Array<{
                    used_tokens: Array<{
                        input: number, 
                        output: number, 
                    }>
                }>,
                button_event: Array<{}>,
            }
        }>,
        plan: {
            max_projects: number,
            plan_name: string,
            max_wips: number,
        }

    }
}

export interface clientRegisterTypes {
    email: string,
    password: string,
    fullname: string
}

export interface clientLoginTypes {
    email: string,
    password: string
}