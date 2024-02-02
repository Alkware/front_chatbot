import z from "zod";

export type CreateChatSchema = z.infer<typeof createChatSchema>

export const createChatSchema = z.object({
    step_0: z.object({
        project_name: z.string().min(1),
        logo: z.instanceof(FileList).transform(list => list.item(0))
    }),
    step_1: z.object({
        prompt_id: z.string().min(1),
        chat_input_message: z.string().min(1),
        call_to_action: z.array(z.object({
            button_text: z.string().min(1),
            button_link: z.string().url().min(1),
            cta_describe: z.string().min(40, "Vocẽ precisa criar uma descrição maior para seu botão")
        })).optional()
    }),
})
