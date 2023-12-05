export interface Metric {
    chat_event: Array<{
        guest_id: string,
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
