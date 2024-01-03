import { z } from "zod";

export const ProjectSchema = z.object({
    chat_type: z.string().min(1, "Você ainda não escolheu o tipo de chat").optional(),
    project_name: z.string().min(1, "O nome do projeto não pode ser vazio").refine(value => /^[a-zA-Z0-9\s]*$/.test(value), {
        message: 'O nome não pode conter caracteres especiais.',
    }),
    slug: z.string().refine(value => /^[a-zA-Z0-9\s]*$/.test(value), {
        message: 'Não são permitidos caracteres especiais.',
    }).optional(),
    bio: z.string().min(1, "Bio não pode estar vazia"),
    logo: z.string().min(1, "Logo não pode estar vazio"),
    // prompt: z.string().min(1, "Prompt não pode estar vazio"),
    call_to_action: z.object({
        button_text: z.string().min(1, "O nome do botão não pode estar vazio").max(18, "O nome do botão não pode ter mais que 18 caracteres"),
        link: z.string().min(1, "O link não pode estar vazio"),
    }),
    prompt_id: z.string().min(1, "Você precisa selecionar uma base de dados"),
    pixel_facebook: z.string().optional(),
    chat_input_message: z.array(
        z.string().min(1, "Você precisa criar a primeira mensagem").max(500, "Sua mensagem é muito longa")
    ).min(1, "Você precisa adicionar pelo menos uma mensagem").max(3, "Você pode adicionar até 3 mensagens")
})

export const DatabaseSchema = z.object({
    prompt_name:  z.string().min(1, "Você não pode deixar seu prompt vazio."),
    prompt: z.string().min(1, "Você não pode deixar seu prompt vazio."),
    describe_client: z.string().optional(),
})


export { z }