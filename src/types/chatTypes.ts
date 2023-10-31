export interface chatClientTypes {
    client: {
        logo: string,
        business_name: string
    },
    guest: {

    },
    messages: Array<{
        time: string,
        message: string,
        player: number
    }>
}