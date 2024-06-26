import z from "zod";

export type DatabaseSchema = z.infer<typeof databaseSchema>

export const databaseSchema = z.object({
    step_0: z.object({
        products: z.array(z.object({
            name: z.string().min(1, "Você precisa definir o nome do produto"),
            value: z.string().min(1, "Informe o valor do produto!"),
            description: z.string().min(50, "Informe um descrição detalhada do seu produto de pelo menos 50 caracteres"),
            image: z.object({
                url: z.string().min(1, "Faça o upload da imagem do seu produto"),
                description: z.string().min(50, "Informe um descrição detalhada da sua imagem de pelo menos 50 caracteres"),
            }),
            optional_variable: z.optional(z.array(z.object({
                title: z.optional(z.string()),
                answer: z.optional(z.string())
            }))),
            questions: z.optional(z.array(z.object({
                ask: z.string(),
                answer: z.string(),
            }))),
        })).min(1, "Você precisa cadastrar pelo menos um produto"),
        observation: z.optional(z.string()),
    }),
    step_1: z.object({
        payment_methods: z.array(z.string()).min(1, "Informe pelo menos um método de pagamento."),
        credit_card_installments: z.string().optional(),
        order_tracking: z.string().optional(),
        tracking_link: z.string().optional(),
    }),
    step_2: z.object({
        warranty_time: z.object({
            type: z.string().min(1, "Defina o formato de tempo da garantia"),
            time: z.string().min(1, "Defina o tempo de garantia"),
        }),
        how_guarantee_work: z.string().min(1, "Informe como funciona a garantia!"),
        how_exchanges_work_and_returns: z.string().optional(),
    }),
    step_3: z.object({
        company_name: z.string().min(1, "Informe o nome da sua empresa!"),
        address: z.string().optional(),
        contact_email: z.string().min(1, "Informe o e-mail da sua empresa.").email("E-mail inválido"),
        contact_phone_number: z.string().min(11, "Número de telefone inválido!"),
        support_hours: z.array(z.object({
            day: z.string().min(1, "Informe o dia que você presta suporte humano."),
            start: z.string().min(1, "Informe a hora em que você começa a prestar suporte humano"),
            end: z.string().min(1, "Informe a hora em que você termina a prestar suporte humano"),
        }))
    }),
    step_4: z.object({
        ia_name: z.string().optional(),
        restrictions: z.string().optional(),
        client_describe: z.string().min(1, "Descreva quem é seu publico alvo")
    })
});