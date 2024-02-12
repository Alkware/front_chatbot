import z from "zod";

export type ChatSchema = z.infer<typeof chatSchema>

export const chatSchema = z.object({
    step_0: z.object({
        project_name: z.string().min(1, "Você precisa definir um nome para seu chat"),
        logo: z.string().url(),
        bio: z.string().optional(),
    }),
    step_1: z.object({
        prompt_id: z.string().min(1),
        chat_input_message: z.array(z.string().min(1)),
        call_to_action: z.array(z.object({
            button_text: z.string().min(1, "Você precisa definir um texto para seu link."),
            button_link: z.string().url("Digite uma url valída para seu link!"),
            button_describe: z.string().min(30, "Você precisa criar uma descrição maior para seu botão. Lembre-se a descrição é muito importante para o contexto da conversa.")
        })).max(3).optional()
    }),
    step_2: z.object({
        facebook_pixel: z.coerce.string().optional(),
    }).optional(),
    step_3: z.object({
        chat_appearence: z.object({
            chat_icon: z.number().min(1, "Carregue um icon para seu chat."),
            icon_text: z.string().min(1, "Informe um texto para o icone do chat."),
            primary_color: z.string().min(1, "Informe um cor primária para seu chat."),
            second_color: z.string().min(1, "Informe uma cor secondária para seu chat."),
            background: z.string().min(1, "Informe uma cor de fundo para seu chat."),
        }).optional(),
    }).optional(),
    step_4: z.object({
        slug: z.coerce.string().optional(),
    }).optional(),
})
