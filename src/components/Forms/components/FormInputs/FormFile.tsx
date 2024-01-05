import { InputFileForm } from "./components/InputFileForm";

interface FormFile {
    field_name: string
}

export function FormFile({ field_name }: FormFile) {
    const chat = JSON.parse(localStorage.getItem("chat") || "{}")

    return (
        <InputFileForm
            defaultValue={chat[field_name]}
        />
    )
};