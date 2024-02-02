import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface FormFile extends InputHTMLAttributes<HTMLInputElement>{
    name: string
}

export function FormFile(props: FormFile) {
    const { register } = useFormContext();

    return (
        <div className="w-full flex justify-evenly items-center mt-4">
            <label
                className="border border-dashed border-primary-100 bg-zinc-600/40 rounded-md p-4 cursor-pointer flex gap-4 items-center"
            >
                Faça o upload da sua logo
                <input
                    type="file"
                    className="hidden"
                    accept=".png, .jpg, .jpeg, .webp"
                    {...register(props.name)}
                />
            </label>

        </div>

    )
};