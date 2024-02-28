import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputPassword {
    name: string
}

export function InputPassword({ name }: InputPassword) {
    const { register } = useFormContext();
    const [isOpen, setIsOpen] = useState<Boolean>(false);

    const handleDisplayPassword = ()=> setIsOpen(v => !v)

    return (
        <div className="w-3/5 px-2 rounded-md flex justify-center items-center gap-2 bg-gray_light">
            <input
                className=""
                type={isOpen ? "text" : "password"}
                {...register(name)}
            />
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