export interface ChatEvent {
    used_tokens: Array<{
        input: number,
        output: number,
    }>
}