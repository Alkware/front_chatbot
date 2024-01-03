import { TextareaForm } from "./TextareaForm";

export function AddInputForm() {

    return (
        <div className="w-full flex flex-col p-4 border rounded-lg border-zinc-500/30">

            <h2 className="text-xl mb-4 font-bold">Defina a primeira mensagem do chat</h2>

            <div
                className="w-full flex flex-col"
            >
                <div
                    className="w-full flex gap-8 justify-center items-center"
                >
                    <TextareaForm
                        title="ex.: Olá, como posso te ajudar hoje?"
                        field_name="chat_input_message"
                        height={100}
                    ></TextareaForm>

                </div>
            </div>
        </div>
    )
};