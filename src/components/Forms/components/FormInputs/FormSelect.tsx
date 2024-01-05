import { Prompt } from "../../../../@types/prompt.types";
import { SelectForm } from "./components/SelectForm";

interface FormSelect {
    field_name: string,
    options: Array<Prompt>
}

export function FormSelect({ field_name, options }: FormSelect) {
    const chat = JSON.parse(localStorage.getItem("chat") || "{}")

    return (
        <SelectForm 
            field_name={field_name}
            options={options}
            defaultValue={chat[field_name]}
        />
    )
};