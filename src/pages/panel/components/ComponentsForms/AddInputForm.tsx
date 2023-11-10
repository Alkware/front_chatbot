import { FcFullTrash, FcPlus } from "react-icons/fc";
import { useFieldArray } from "react-hook-form";
import { useEffect } from "react";

interface AddInputFormTypes {
    register: any,
    control: any
}

export function AddInputForm({ register, control }: AddInputFormTypes) {

    const { fields, append, remove } = useFieldArray({
        control,
        name: "chat_input_message"
    })

    useEffect(() => {
        append("")
    }, [])

    return (
        <div className="w-full flex flex-col">

            <div className="w-full flex justify-between mt-8">
                <div className="flex flex-col">
                    <h2 className="text-xl">Defina a primeira mensagem do chat</h2>
                    <span className="text-zinc-500">Você pode definir até 3 mensagens</span>
                </div>

                <FcPlus
                    className="text-3xl cursor-pointer"
                    onClick={()=> append(" ")}
                />
            </div>
            {
                fields.map((field, index) =>
                    <div 
                        className="w-full flex flex-col"
                        key={field.id}
                    >
                        <div
                            className="w-full flex gap-8 justify-center items-center"
                        >
                            <textarea
                                placeholder="ex.: Olá, como posso te ajudar hoje?"
                                className="my-2"
                                {...register(`chat_input_message.${index}`)}
                            ></textarea>
                            {
                                index !== 0 &&
                                <FcFullTrash
                                    className="text-3xl cursor-pointer"
                                    onClick={() => remove(index)}
                                />
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
};