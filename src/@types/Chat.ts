export interface Chat {
    id: string,
    created_at: string,
    project_id: string,
    historic_messages: []
    messages: Array<{
        message: string,
        player: number,
        time: string,
    }>
    client: {
        logo: string,
        business_name: string
    },
    guest: {

    },
}