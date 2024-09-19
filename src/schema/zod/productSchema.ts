import z from "zod";

export type ProductSchema = z.infer<typeof productSchema>;

/**
 *  Schema responsável por validar a criação e edição do produto
 * @description Todas as mensagens de texto precisa seguir o formato `{number}:{string}`, os : são um separador,
 * o número informado antes é usado para segmentar em qual step do formulário está gerando o erro, e a string após os :
 * são para informar o tipo de erro...
 * @example {0:Informe um nome} => 
 * '0': é a step onde está localizado o input
 * 'Informe um nome': é a mensagem descrevendo o erro.
 */
export const productSchema = z.object({
    images: z.preprocess((data) => data ?? [], z.array(z.string()).nonempty("0:Informe pelo menos uma imagem para seu produto")),
    product_name: z.string().min(1, "0:Informe o nome do produto"),
    price: z.string().min(1, "0:O preço do produto não pode estar vazio."),
    promocional_price: z.object({
        price: z.coerce.number().min(1, "O preço promocional do produto não pode estar vazio."),
        end_date: z.object({
            day: z.string().min(1, "Informe até que dia vai a promoção."),
            month: z.string().min(1, "Informe até que mês vai a promoção."),
            year: z.string().min(1, "Informe até que ano vai a promoção."),
        }, { required_error: "Informe até quando vai a promoção" })
    }).nullable().optional(),
    description: z.string().min(1, "0:A descrição do produto não pode estar vazia."),
    payment_methods: z.preprocess(data => data ?? [], z.array(z.string()).nonempty("1:Informe pelo menos um método de pagamento")),
    credit_card_installments: z.string().nullable(),
    delivery_fee: z.string().nullable().optional(),
    how_product_will_be_delivered: z.string().min(1, "1:Descreva como seu produto vai ser entregue."),
    tracking_link: z.string().url().nullable().optional(),
    warranty_time: z.object({
        type: z.string().min(1, "2:O tipo de data parta garantia do produto, não pode estar vazia."),
        time: z.coerce.number().min(1, "2:O tempo de garantia do produto não pode estar vazio.")
    }),
    how_guarantee_work: z.string().min(1, "2:Informe como funciona a garantia do seu produto."),
    how_exchanges_work_and_returns: z.string().min(1, "2:informe como funciona as trocas e devoluções"),
    optional_variable: z.array(z.object({
        title: z.string(),
        value: z.string(),
    })).nullable().optional(),
    questions: z.array(z.object({
        ask: z.string(),
        answer: z.string(),
    })).nullable().optional(),
    extra_information: z.string().nullable().optional()
});