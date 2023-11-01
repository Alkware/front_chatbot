import { useEffect, useState } from "react";
import Button from "../../../../components/button/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePromptsSystem } from "../../../../api/system";

const SystemSchema = z.object({
    seller: z.string().min(1, "O prompt não pode ficar vazio"),
    support: z.string().min(1, "O prompt não pode ficar vazio"),
})

type FormType = z.infer<typeof SystemSchema>

export function System() {
    const [access, setAccess] = useState(false)
    const { handleSubmit, register, formState: { errors } } = useForm<FormType>({
        resolver: zodResolver(SystemSchema)
    });

    useEffect(() => {
        const result = prompt("Digite a senha de administrador prompt")
        if (result === "123") setAccess(true)
        else setAccess(false)
    }, [])

    const handleCreatePrompt = async (data: any) => {
        const response = await updatePromptsSystem(data);
        console.log(response)
    }

    return (
        access &&
        <div className="w-full flex flex-col  px-12 py-4">
            <form onSubmit={handleSubmit(handleCreatePrompt)}>
                <h2>Prompt do sistema de vendas</h2>
                <textarea
                    placeholder="Escreva o prompt de vendas aqui..."
                    {...register("seller")}
                ></textarea>
                <span className="text-red-500">{errors.seller?.message}</span>
                <h2>Prompt do suporte</h2>
                <textarea
                    placeholder="Escreva o prompt de suporte aqui..."
                    {...register("support")}
                ></textarea>
                <span className="text-red-500">{errors.support?.message}</span>
                <div className="flex w-full justify-center">
                    <Button customClass="my-8">Enviar prompts</Button>
                </div>
            </form>
        </div>
    )
};