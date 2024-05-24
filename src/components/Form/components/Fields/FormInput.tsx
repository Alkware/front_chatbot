import { InputHTMLAttributes, MouseEvent } from "react"
import { UseFormReturn, useFormContext } from "react-hook-form"
import { FORM_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../variables/variables";
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
        // Registra os dados no localStorage.
        const databaseData = JSON.parse(localStorage.getItem(FORM_NAME_TO_SAVE_LOCALSTORAGE) || "{}");
        const fieldNameArray = e.target.name.split(".");
        const lastIndex = (fieldNameArray.length - 1)
        const fieldName = /\d/.test(fieldNameArray[lastIndex]) ? fieldNameArray[fieldNameArray.length - 2] : fieldNameArray[fieldNameArray.length - 1];
        const value = e.target.value;
        databaseData[fieldName] = value
        localStorage.setItem(FORM_NAME_TO_SAVE_LOCALSTORAGE, JSON.stringify(databaseData))
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