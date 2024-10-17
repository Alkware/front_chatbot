import { z } from "zod";

export const loginFormSchema = z.object({
    email: z.string().min(1, "0:E-mail não pode estar vazio.").email("0:O e-mail é obrigatório.").toLowerCase(),
    password: z.string().min(1, "0:Sua senha não pode estar vazia."),
})

export type LoginFormTypes = z.infer<typeof loginFormSchema>
