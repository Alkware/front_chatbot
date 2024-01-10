import { TextareaForm } from "./components/TextareaForm";

interface FormTextArea {
    fieldName: string,
    title: string,
    height: number,
    register?: any
}

export function FormTextArea({ fieldName, title, height, register }: FormTextArea) {
    return (
        register &&
        <TextareaForm
            fieldName={fieldName}
            title={title}
            height={height}
            register={register}
        />
    )
};