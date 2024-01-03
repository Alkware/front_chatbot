import { TextareaForm } from "./TextareaForm";

interface AddInputForm {
    defaultValue?: string
}

export function AddInputForm({ defaultValue }: AddInputForm) {

    return (
        <div className="w-full flex flex-col p-4 py-8 border rounded-lg border-zinc-500/30">

            <div
                className="w-full flex flex-col"
            >
                <div
                    className="w-full flex gap-8 justify-center items-center"
                >
                    <TextareaForm
                        title="Defina a primeira mensagem do chat..."
                        field_name="chat_input_message"
                        height={100}
                        defaultValue={defaultValue}
                    ></TextareaForm>

                </div>
            </div>
        </div>
    )
};