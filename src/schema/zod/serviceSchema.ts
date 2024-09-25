import z from "zod";

export type ServiceSchema = z.infer<typeof serviceSchema>;

/**
 *  Schema responsável por validar a criação e edição do serviço
 * @description Todas as mensagens de texto precisa seguir o formato `{number}:{string}`, os : são um separador,
 * o número informado antes é usado para segmentar em qual step do formulário está gerando o erro, e a string após os :
 * são para informar o tipo de erro...
 * @example {0:Informe um nome} => 
 * '0': é a step onde está localizado o input
 * 'Informe um nome': é a mensagem descrevendo o erro.
 */
export const serviceSchema = z.object({
    images: z.preprocess((data) => data ?? [], z.array(z.string()).nonempty("0:Informe pelo menos uma imagem para seu produto")),
    service_name: z.string().min(1, "0:O nome do serviço não pode estar vazio."),
    price: z.string().min(1, "0:O preço do serviço não pode estar vazio."),
    promocional_price: z.object({
        price: z.coerce.number().min(1, "0:O preço promocional do serviço não pode estar vazio."),
        end_date: z.object({
            day: z.string().min(1, "0: Informe até que dia vai a promoção."),
            month: z.string().min(1, "0: Informe até que mês vai a promoção."),
            year: z.string().min(1, "0:Informe até que ano vai a promoção."),
        }, { required_error: "0:Informe até quando vai a promoção" })
    }).nullable().optional(),
    link_buy: z.string().url().optional().nullable(),
    description: z.string().min(1, "0:A descrição do serviço não pode estar vazia."),
    payment_methods: z.preprocess(data => data ?? [], z.array(z.string()).nonempty("1:Informe pelo menos um método de pagamento")),
    credit_card_installments: z.string().nullable(),
    warranty_time: z.object({
        type: z.string().min(1, "1:O tipo de data parta garantia do serviço, não pode estar vazia."),
        time: z.coerce.number().min(1, "1:O tempo de garantia do serviço não pode estar vazio.")
    }),
    how_guarantee_work: z.string().min(1, "1:Informe como funciona a garantia do seu serviço."),
    is_service_online: z.boolean().default(false),
    questions: z.array(z.object({
        ask: z.string(),
        answer: z.string()
    })).nullable().optional(),
    extra_information: z.string().nullable().optional()
});