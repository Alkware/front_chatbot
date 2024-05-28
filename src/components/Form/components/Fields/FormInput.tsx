import { InputHTMLAttributes, MouseEvent } from "react"
import { UseFormReturn, useFormContext } from "react-hook-form"
import { Input } from "../../../Input/Input";

interface FormInput extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    title: string;
    mask?: (e: MouseEvent<HTMLInputElement, MouseEvent>) => void;
    widthContainer?: string;
    joinAtInput?: string;
    useFormReturn?: UseFormReturn;
}

export function FormInput({ title, joinAtInput, widthContainer, mask, useFormReturn, ...props }: FormInput) {
    const useFormContextReturn = useFormContext();
    const { register } = useFormContextReturn || useFormReturn;
    
    const handleOnChange = (e: any) => {
        // Executa função onChange passada no Form Input.
        props.onChange && (props.onChange(e));
        // Executa função Mask caso ela seja passada no formInput.
        mask && mask(e)
    }

    return (
        <Input
            className=" bg-light dark:bg-gray_light text-dark dark:text-light"
            title={title}
            register={register}
            onChange={handleOnChange}
            {...props}
        />
    )
};