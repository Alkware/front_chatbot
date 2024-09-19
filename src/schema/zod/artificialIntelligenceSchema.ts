import z from "zod";

export type ArtificialIntelligenceSchema = z.infer<typeof artificialIntelligenceSchema>

export const artificialIntelligenceSchema = z.object({
    products_id: z.array(z.string()).nullable().optional(),
    services_id: z.array(z.string()).nullable().optional(),
    artificial_name: z.string().optional(),
    restrictions: z.string().optional(),
    client_describe: z.string().min(1, "1:Descreva quem é seu publico alvo")
});