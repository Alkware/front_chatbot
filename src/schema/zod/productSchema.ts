import z from "zod";

export type ProductSchema = z.infer<typeof productSchema>;

export const productSchema = z.object({
    images: z.array(z.string()),
    product_name: z.string().min(1, "O nome do produto não pode estar vazio.")
})