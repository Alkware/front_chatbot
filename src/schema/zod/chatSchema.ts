import z from "zod";

export type ChatSchema = z.infer<typeof chatSchema>

export const chatSchema = z.object({
    step_0: z.object({
        project_name: z.string().min(1, "Você precisa definir um nome para seu chat"),
        logo: z.coerce.string().url("Faça o upload da logo do chat"),
        bio: z.string().optional(),
        social_proof: z.array(z.object({
            person_name: z.string().min(1, "Informe o nome do cliente que avaliou."),
            avatar: z.string().url("Informe um avatar valído."),
            images: z.array(z.string().url()).optional(),
            text: z.string().min(1, "Informe o que o cliente achou do seu produto."),
            rating: z.coerce.number().min(0).max(5, "Informe um nota entre 0 e 5.")
        })).max(5, "Limite maxímo para adicionar avaliação é de 5.").optional()
    }),
    step_1: z.object({
        prompt_id: z.coerce.string().min(1, "Informe uma fonte de dados"),
        chat_input_message: z.array(z.string().min(1, "Informe a primeira mensagem que será enviada ao seu cliente").max(80, "Sua primeira mensagem não pode conter no máximo 80 caracteres.")).min(1, "Informe pelo menos uma mensagem para iniciar o chat com seu cliente."),
        call_to_action: z.array(z.object({
            button_text: z.string().min(1, "Você precisa definir um texto para seu link.").refine(text => {
                return (text.includes("(") || text.includes(")")) ? false : true
            }, "O texto do seu botão não pode conter parenteses '()'."),
            button_link: z.string().url("Digite uma url valída para seu link!"),
            button_describe: z.string().min(30, "Você precisa criar uma descrição maior para seu link. Lembre-se a descrição é muito importante para o contexto da conversa.")
        })).max(3, "Limite máximo para CTA é de 3").optional()
    }),
    step_2: z.object({
        facebook_pixel: z.coerce.string().optional(),
    }).optional(),
    step_3: z.object({
        chat_appearance: z.object({
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
