export interface clientTypes {
    id: string,
    logo: string,
    fullname: string,
    isAdmin: boolean,
    user: string,
    plan_management: {
        id: string,
        free_trial: Date,
        last_pyament: string,
        next_payment: string,
        status: "DISABLED" | "ACTIVE",
        used_wips: number,
        created_at: string,
        trasaction: Array<{
            payment_method: string,
            amount_paid: number,
            created_at: string,
            updated_at: string,
            status: "APPROVED" | "REJECT"
        }>,
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

    },
    refund_requested: Array<{
        created_at: string,
        status: "PENDING" | "APPROVED" | "CANCEL",
    }>,
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