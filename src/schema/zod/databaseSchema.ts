import z from "zod";

export type DatabaseSchema = z.infer<typeof databaseSchema>

export const databaseSchema = z.object({
    step_0: z.object({
        who_created: z.string().min(1),
        what_is: z.string().min(1),
        how_works: z.string().min(1),
        andvisa_record: z.string().optional(),
    }),
    step_1: z.object({
        contraindications: z.string().min(1),
        benefits: z.string().min(1),
        side_effects: z.string().min(1),
        ingredients: z.string().min(1)
    }),
    step_2: z.object({
        order_tracking: z.string().min(1),
        average_delivery_time: z.object({
            start: z.coerce.number().min(1),
            end: z.coerce.number().min(1),
        }),
        tracking_link: z.string().optional(),
    }),
    step_3: z.object({
        days_of_warranty: z.coerce.number().min(1).max(1000),
        how_guarantee_work: z.string().min(1),
        how_exchanges_work_and_returns: z.string().min(1),
        disclaimer: z.string().optional(),
    }),
    step_4: z.object({
        payment_methods: z.array(z.string()).min(1),
        how_to_buy: z.string().min(1),
        products: z.array(z.object({
            name: z.string().min(1),
            value: z.string().min(1)
        })).min(1),
    }),
    step_5: z.object({
        company_name: z.string().min(1),
        CNPJ: z.string().min(18).max(18),
        address: z.string().min(1),
        support_hours: z.string().min(1),
        contact_email: z.string().email(),
        contact_phone_number: z.string(),
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
