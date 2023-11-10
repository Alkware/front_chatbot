import { InputTextForm } from "../ComponentsForms/InputTextForm"
import { TextareaForm } from "../ComponentsForms/TextareaForm"

interface ProductDescribe {
    register: any,
}

export function ProductDescribe({ register }: ProductDescribe) {
    return (
        <div
            className="w-full h-full flex-col hidden overflow-y-auto"
            id="container"
            data-index="product_describe"
        >
            <h2 className="text-2xl w-full text-center p-4">Descrição do produto:</h2>

            <TextareaForm
                field_name="prompt"
                title="Escreva seu prompt aqui:"
                placeholder="Crie seu prompt aqui"
                height={300}
                register={register}
            />

            <TextareaForm
                field_name="describe_client"
                title="Escreva a persona do seu cliente aqui:"
                placeholder="Descrição do cliente"
                height={120}
                register={register}
            />


            <div className="w-full flex gap-8 justify-evenly">
                <InputTextForm
                    field_name="call_to_action.button_name"
                    title="Digite o nome do botão da cta"
                    placeholder="ex: Comprar agora"
                    register={register}
                />

                <InputTextForm
                    field_name="call_to_action.link"
                    title="Digite o link do seu CTA"
                    placeholder="ex: https://meusite.com/vendas"
                    register={register}
                />
            </div>


        </div>
    )
};