import z from "zod";

export type ProductSchema = z.infer<typeof productSchema>;

export const productSchema = z.object({
    images: z.array(z.string()).min(1, "Informe pelo menos uma imagem para seu produto"),
    product_name: z.string().min(1, "O nome do produto não pode estar vazio."),
    price: z.coerce.number().min(1, "O preço do produto não pode estar vazio."),
    promocional_price: z.object({
        price: z.coerce.number().min(1, "O preço promocional do produto não pode estar vazio."),
        end_date: z.object({
            day: z.string().min(1, "Informe até que dia vai a promoção."),
            month: z.string().min(1, "Informe até que mês vai a promoção."),
            year: z.string().min(1, "Informe até que ano vai a promoção."),
        }, { required_error: "Informe até quando vai a promoção" })
    }).nullable().optional(),
    description: z.string().min(1, "A descrição do produto não pode estar vazia."),
    payment_methods: z.array(z.string()),
    credit_card_installments: z.string().nullable(),
    warranty_time: z.object({
        type: z.string().min(1, "O tipo de data parta garantia do produto, não pode estar vazia."),
        time: z.coerce.number().min(1, "O tempo de garantia do produto não pode estar vazio.")
    }),
    how_guarantee_work: z.string().min(1, "Informe como funciona a garantia do seu produto."),
    how_product_will_be_delivered: z.string().min(1, "Descreva como seu produto vai ser entregue."),
    how_exchanges_work_and_returns: z.string().min(1, "informe como funciona as trocas e devoluções"),
    optional_variable: z.array(z.object({
        title: z.string().min(1, "O titulo da variável não pode estar vazia"),
        value: z.string().min(1, "O valor da variável não pode estar vazia.")
    })).nullable().optional(),
    tracking_link: z.string().url().nullable().optional(),
    questions: z.array(z.object({
        ask: z.string().min(1, "Digite a pergunta"),
        answer: z.string().min(1, "Digite a resposta")
    })).nullable().optional(),
    extra_information: z.string().nullable().optional()
});