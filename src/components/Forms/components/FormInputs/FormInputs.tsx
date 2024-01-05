import { InputTextForm } from "./components/InputTextForm"

interface FormInput {
    field_name: string
    title: string
}

export function FormInput({ field_name, title }: FormInput) {
    const chat = JSON.parse(localStorage.getItem("chat") || "{}")

    return (
        <InputTextForm
            field_name={field_name}
            title={title}
            defaultValue={chat[field_name]}
        />
    )
};