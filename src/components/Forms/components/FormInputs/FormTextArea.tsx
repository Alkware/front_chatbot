import { TextareaForm } from "./components/TextareaForm";

interface FormTextArea {
    field_name: string,
    title: string,
    height: number
}

export function FormTextArea({ field_name, title, height }: FormTextArea) {
    const chat = JSON.parse(localStorage.getItem("chat") || "{}")

    return (
        <TextareaForm 
            field_name={field_name}
            title={title}
            height={height}
            defaultValue={chat[field_name]}
        />
    )
};