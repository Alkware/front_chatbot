import z from "zod";

export type DatabaseSchema = z.infer<typeof databaseSchema>

export const databaseSchema = z.object({
    step_0: z.object({
        products: z.array(z.object({
            name: z.string().min(1, "Você precisa definir o nome do produto"),
            value: z.string().min(1, "Informe o valor do produto!"),
            description: z.string().min(1, "Informe como seu produto funciona"),
            optional_variable: z.optional(z.array(z.object({
               field_title: z.string().min(1, "O titulo da sua variável não pode estar vazio."),
               options: z.array(z.string()).min(1, "Vocẽ precisa definir pelo menos uma opção.")
            })))
        })).min(1, "Você precisa cadastrar pelo menos um produto"),

        questions: z.array(z.object({
            ask: z.string().min(1, "Digite a pergunta frequente do cliente."),
            answer: z.string().min(1, "Digite a resposta frequente."),
        })).min(1, "Você precisa adicionar pelo menos uma pergunta frequente")
    }),
    step_1: z.object({
        payment_methods: z.array(z.string()).min(2, "Informe pelo menos dois meio de pagamento!"),
        how_to_buy: z.string().min(1, "Informe um passo a passo para seu cliente efetuar compra do seu produto"),
        order_tracking: z.string().optional(),
        tracking_link: z.string().optional(),
    }),
    step_2: z.object({
        days_of_warranty: z.coerce.number().min(1, "Informe pelo menos 1 dia de garantia para seus clientes").max(1000, "Você pode definir no máximo 1000 dias de garantia"),
        how_guarantee_work: z.string().min(1, "Informe como funciona a garantia!"),
        how_exchanges_work_and_returns: z.string().min(1, "Informe como funciona as trocas e devoluções!"),
    }),
    step_3: z.object({
        company_name: z.string().min(1, "Informe o nome da sua empresa!"),
        CNPJ: z.optional(z.string().refine(text => text.includes("/"), "Digite um cnpj valído!")),
        address: z.string().min(1, "Informe o endereço da sua empresa!"),
        contact_email: z.string().min(1, "Informe o e-mail da sua empresa.").email("E-mail inválido"),
        contact_phone_number: z.string().min(11, "Número de telefone inválido!"),
        support_hours: z.string().min(1, "Informe qual o horário para atendimento humano!"),
    }),
    step_4: z.object({
        ia_name: z.string().optional(),
        restrictions: z.string().optional(),
        client_describe: z.string().min(1, "Descreva quem é seu publico alvo")
    })
})
