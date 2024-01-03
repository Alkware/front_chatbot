import { useEffect, useState } from "react"
import { authenticateClient } from "../../../../api/client"
import { InputTextForm } from "../../Components/InputTextForm";
import { AddInputForm } from "../../Components/AddInputForm";
import { SelectForm } from "../../Components/SelectForm";

export function ProductDescribe() {
    const [prompt, setPrompt] = useState([]);
    const chat = JSON.parse(localStorage.getItem("chat") || "{}")

    useEffect(() => {

        (async () => {
            const token = localStorage.getItem("token");
            const clientIsLogged = token && await authenticateClient(token);
            const prompt = clientIsLogged ? clientIsLogged.data.client.plan_management.prompt : []
            if (clientIsLogged && prompt.length > 0) setPrompt(prompt)
        })();

    }, [])

    return (
        <div
            className="w-full h-full flex-col gap-8 hidden overflow-y-auto animate-display-screen"
            id="container"
            data-index="product_describe"
        >
            <div className="flex flex-col gap-16 items-center">
                <div className="w-2/3">
                    <SelectForm
                        options={prompt}
                        field_name="prompt_id"
                        defaultValue={chat["prompt_id"]}
                    />
                </div>

                <AddInputForm
                    defaultValue={chat?.chat_input_message && chat?.chat_input_message[0]}
                />

                <div className="w-full flex flex-col">
                    <h2 className="text-xl font-bold">Crie o botão que será usado para direcionar os seus clientes:</h2>
                    <div className="w-full flex gap-8 justify-evenly">
                        <InputTextForm
                            field_name="button_text"
                            title="Digite o nome do botão da cta"
                            defaultValue={chat["call_to_action"] && chat["call_to_action"][0]["button_text"]}
                        />

                        <InputTextForm
                            field_name="button_link"
                            title="Digite o link do seu CTA"
                            defaultValue={chat["call_to_action"] && chat["call_to_action"][0]["button_link"]}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
};