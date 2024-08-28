import z from "zod";

export type ServiceSchema = z.infer<typeof serviceSchema>;

export const serviceSchema = z.object({
    images: z.array(z.string()).min(1, "Informe pelo menos uma imagem para seu serviço"),
    service_name: z.string().min(1, "O nome do serviço não pode estar vazio."),
    price: z.coerce.number().min(1, "O preço do serviço não pode estar vazio."),
    promocional_price: z.object({
        price: z.coerce.number().min(1, "O preço promocional do serviço não pode estar vazio."),
        end_date: z.object({
            day: z.string().min(1, "Informe até que dia vai a promoção."),
            month: z.string().min(1, "Informe até que mês vai a promoção."),
            year: z.string().min(1, "Informe até que ano vai a promoção."),
        }, { required_error: "Informe até quando vai a promoção" })
    }).nullable().optional(),
    description: z.string().min(1, "A descrição do serviço não pode estar vazia."),
    payment_methods: z.array(z.string()),
    credit_card_installments: z.string().nullable(),
    warranty_time: z.object({
        type: z.string().min(1, "O tipo de data parta garantia do serviço, não pode estar vazia."),
        time: z.coerce.number().min(1, "O tempo de garantia do serviço não pode estar vazio.")
    }),
    how_guarantee_work: z.string().min(1, "Informe como funciona a garantia do seu serviço."),
    is_service_online: z.boolean().default(false),
    questions: z.array(z.object({
        ask: z.string().min(1, "Digite a pergunta"),
        answer: z.string().min(1, "Digite a resposta")
    })).nullable().optional(),
    extra_information: z.string().nullable().optional()
});