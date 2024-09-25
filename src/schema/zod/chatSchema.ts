import z from "zod";

export type ChatSchema = z.infer<typeof chatSchema>

export const chatSchema = z.object({
    project_name: z.string().min(1, "Você precisa definir um nome para seu chat"),
    logo_id: z.coerce.string().min(1, "Faça o upload da logo do chat"),
    chat_input_message: z.array(z.string().min(1, "Informe a primeira mensagem que será enviada ao seu cliente")).nonempty(),
    artificial_intelligence_id: z.coerce.string().min(1, "Informe uma inteligência artificial"),
    bio: z.string().optional(),
    links: z.optional(z.array(z.object({
        title: z.string().min(1, "Informe o titulo do seu link"),
        url: z.string().url("Informe uma url valída para seu link!"),
        description: z.string().min(1, "Informe uma descrição do seu link.")
    }))),
    facebook_pixel: z.coerce.string().optional().nullable(),
    chat_appearance: z.object({
        chat_icon: z.number().min(1, "Selecione um icon para o widget do seu chat.").optional(),
        icon_text: z.string().min(1, "Informe um texto para o icone do chat.").optional(),
        primary_color: z.string().min(1, "Informe um cor primária para seu chat.").optional(),
        second_color: z.string().min(1, "Informe uma cor secondária para seu chat.").optional(),
        background: z.string().min(1, "Informe uma cor de fundo para seu chat.").optional(),
    }).optional(),
    slug: z.coerce.string().optional(),
})
