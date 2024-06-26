import { useState } from "react";
import { UseFormReturn, useFormContext } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputPassword {
    name: string;
    form?: UseFormReturn;
}

export function InputPassword({ name, form }: InputPassword) {
    const formContext = useFormContext() || form;
    const [isOpen, setIsOpen] = useState<Boolean>(false);

    const handleDisplayPassword = () => setIsOpen(v => !v)

    return (
        <div className="w-full px-2 rounded-md flex justify-center items-center gap-2 bg-gray_light">
            {
                formContext ?
                    <input
                        type={isOpen ? "text" : "password"}
                        {...formContext.register(name)}
                    />
                    :
                    <input
                        name={name}
                        type={isOpen ? "text" : "password"}
                    />
            }
            <FaEye
                data-isopen={!!isOpen}
                className="text-2xl data-[isopen=false]:hidden"
                onClick={handleDisplayPassword}
            />
            <FaEyeSlash
                data-isopen={!!isOpen}
                className="text-2xl data-[isopen=true]:hidden"
                onClick={handleDisplayPassword}
            />
        </div>
    )
};