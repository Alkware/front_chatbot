export interface Prompt {
    id: string
    prompt_name: string
    prompt: string
    describe_client: string,
    prompt_query: string
}

export interface CreatePrompt {
    prompt: string
    describe_client: string,
    prompt_query: string
}
