import { UseFormRegisterReturn } from "react-hook-form"

interface FormCheckBox {
    register: UseFormRegisterReturn<any>;
    title: string;
}

export function FormCheckBox({ register, title }: FormCheckBox) {
    return (
        <div className="flex flex-row justify-evenly items-center mt-4 gap-2">
            <h2 className="text-xs whitespace-nowrap ">
                {title}
            </h2>
            <input
                type="checkbox"
                {...register}
            />
        </div>
    )
};