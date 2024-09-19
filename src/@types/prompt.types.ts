export interface Prompt {
    id: string
    prompt_name: string
    prompt: string
    client_describe: string,
    prompt_query: string

}

export interface CreatePrompt {
    prompt: string
    client_describe: string,
    prompt_query: string
    prompt_name: string;
}
