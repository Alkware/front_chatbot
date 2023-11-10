import { RefObject, useEffect, useRef, useState } from "react";
import Button from "../../../../components/button/ButtonBlue";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getPromptSystem, updatePromptsSystem } from "../../../../api/system";

const SystemSchema = z.object({
    seller: z.string().min(1, "O prompt não pode ficar vazio"),
    support: z.string().min(1, "O prompt não pode ficar vazio"),
})

type FormType = z.infer<typeof SystemSchema>

export function System() {
    const [access, setAccess] = useState(false)
    const refForm: RefObject<HTMLFormElement> = useRef(null);
    const { handleSubmit, register, formState: { errors } } = useForm<FormType>({
        resolver: zodResolver(SystemSchema)
    });

    useEffect(() => {
        
        (async () => {
            const result = prompt("Digite a senha de administrador prompt")
            if (result === "123") setAccess(true)
            else setAccess(false)

            const systemData = await getPromptSystem();
            if (systemData && systemData.status === 200 && refForm.current) {
                const seller = refForm.current?.querySelector("textarea[data-id=seller]")
                const support = refForm.current?.querySelector("textarea[data-id=support]")
                if (seller && support) {
                    seller.textContent = systemData.data.seller_prompt
                    support.textContent = systemData.data.support_prompt
                }
            }

        })();



    }, [])

    const handleCreatePrompt = async (data: any) => {
        const response = await updatePromptsSystem(data);
        console.log()
        if (response) {

        }
    }

    return (
        access &&
        <div className="w-full flex flex-col  px-12 py-4">
            <form onSubmit={handleSubmit(handleCreatePrompt)} ref={refForm}>
                <h2>Prompt do sistema de vendas</h2>
                <textarea
                    data-id="seller"
                    placeholder="Escreva o prompt de vendas aqui..."
                    {...register("seller")}
                ></textarea>
                <span className="text-red-500">{errors.seller?.message}</span>
                <h2>Prompt do suporte</h2>
                <textarea
                    data-id="support"
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