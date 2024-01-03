import { useEffect, useState } from "react"
import { AddInputForm } from "../ComponentsForms/AddInputForm"
import { InputTextForm } from "../ComponentsForms/InputTextForm"
import { SelectForm } from "../ComponentsForms/SelectForm"
import { authenticateClient } from "../../../../api/client"

export function ProductDescribe() {
    const [prompt, setPrompt] = useState([]);

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
                    />
                </div>

                <AddInputForm />

                <div className="w-full flex flex-col">
                    <h2 className="text-xl font-bold">Crie o botão que será usado para direcionar os seus clientes:</h2>
                    <div className="w-full flex gap-8 justify-evenly">
                        <InputTextForm
                            field_name="button_text"
                            title="Digite o nome do botão da cta"
                        />

                        <InputTextForm
                            field_name="button_link"
                            title="Digite o link do seu CTA"
                        />
                    </div>
                </div>
            </div>

        </div>
    )
};