import z from "zod";

export type DatabaseSchema = z.infer<typeof databaseSchema>

export const databaseSchema = z.object({
    step_0: z.object({
        who_created: z.string().min(1, "Informe quem criou esse produto!"),
        what_is: z.string().min(1, "Informe oque é esse produto!"),
        how_works: z.string().min(1, "Informe como funciona esse produto!"),
        andvisa_record: z.string().optional(),
    }),
    step_1: z.object({
        contraindications: z.string().optional(),
        benefits: z.string().min(1, "Informe os beneficios do produto!"),
        side_effects: z.string().optional(),
        ingredients: z.string().min(1, "Informe quais os ingredientes do produto!")
    }),
    step_2: z.object({
        average_delivery_time: z.object({
            start: z.coerce.number().min(1, "Informe qual o prazo mínimo para entrega!"),
            end: z.coerce.number().min(1, "Informe qual o prazo máximo para entrega!"),
        }),
        order_tracking: z.string().min(1, "Informe como funciona o rastreamento do seu produto!"),
        tracking_link: z.string().optional(),
    }),
    step_3: z.object({
        days_of_warranty: z.coerce.number().min(1, "Informe pelo menos 1 dia de garantia").max(1000, "Você pode definir no máximo 1000 dias de garantia"),
        how_guarantee_work: z.string().min(1, "Informe como funciona a garantia!"),
        how_exchanges_work_and_returns: z.string().min(1, "Informe como funciona as trocas e devoluções!"),
        disclaimer: z.string().optional(),
    }),
    step_4: z.object({
        payment_methods: z.array(z.string()).min(2, "Informe pelo menos dois meio de pagamento!"),
        how_to_buy: z.string().min(1, "Informe como que o cliente pode comprar seu produto!"),
        products: z.array(z.object({
            name: z.string().min(1, "Vocẽ precisa definir o nome do produto"),
            value: z.string().min(1, "Informe o valor do produto!")
        })).min(1, "Você precisa registrar pelo menos um produto!"),
    }),
    step_5: z.object({
        company_name: z.string().min(1, "Informe o nome da sua empresa!"),
        CNPJ: z.string().refine(text => text.includes("/"), "Digite um cnpj valído!"),
        address: z.string().min(1, "Informe o endereço da sua empresa!"),
        contact_email: z.string().email("E-mail inválido"),
        support_hours: z.string().min(1, "Informe qual o horário para atendimento humano!"),
        contact_phone_number: z.string().min(11, "Número de telefone inválido!"),
    }),
    step_6: z.object({
        questions: z.array(z.object({
            ask: z.string(),
            answer: z.string(),
        })).min(1, "Você precisa adicionar pelo menos uma pergunta frequente")
    }),
    step_7: z.object({
        ia_name: z.string().optional(),
        restrictions: z.string().optional(),
        client_describe: z.string().min(1)
    })
})
