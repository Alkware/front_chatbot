import { InputTextForm } from "./components/InputTextForm"

interface FormInput {
    fieldName: string
    title: string,
    register?: any
}

export function FormInput({ fieldName, title, register }: FormInput) {
    return (
        <InputTextForm
            fieldName={fieldName}
            title={title}
            register={register}
        />
    )
};