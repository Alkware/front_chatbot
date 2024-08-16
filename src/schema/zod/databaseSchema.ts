import z from "zod";

export type DatabaseSchema = z.infer<typeof databaseSchema>

export const databaseSchema = z.object({
    step_0: z.object({
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
    step_1: z.object({
        ia_name: z.string().optional(),
        restrictions: z.string().optional(),
        client_describe: z.string().min(1, "Descreva quem é seu publico alvo")
    })
});