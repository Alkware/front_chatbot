import { useFormContext } from "react-hook-form";
import { Root } from "../../../../components/Form/FormRoot";
import { Input } from "../../../../components/Form/components/Fields/Input/Input";
import { TextArea } from "../../../../components/Form/components/Fields/TextArea/TextArea";
import { InputDate } from "../../../../components/Form/components/Fields/InputDate/InputDate";
import { UploadFile } from "../../../../components/UploadFile/UploadFile";
import { Service } from "../../../../@types/services.types";

interface StepBasicServiceInfo {
    client_id: string | undefined;
    service?: Service
}

export function StepBasicServiceInfo({ client_id, service }: StepBasicServiceInfo) {
    const formContext = useFormContext();

    return (
        <>
            <UploadFile
                name="images"
                client_id={client_id}
                limitSelect={5}
                formContext={formContext}
                imagesDefault={service?.images}
            />

            <div className="w-full mx-auto flex gap-4">
                <Input
                    name="service_name"
                    title="Digite o nome do serviço"
                    formContext={formContext}
                />
                <Input
                    name="price"
                    title="Digite o preço do serviço"
                    mask={({ currentTarget }) => {
                        const value = currentTarget.value;
                        let num = value.replace(/[^0-9]/g, '');
                        // Adiciona o separador de milhares e o símbolo da moeda
                        currentTarget.value = 'R$ ' + num.replace(/(\d)(\d{8})$/, '$1.$2').replace(/(\d)(\d{5})$/, '$1.$2').replace(/(\d)(\d{2})$/, '$1,$2');
                    }}
                    formContext={formContext}
                />
            </div>

            <Root.Optional
                name="promocional_price"
                text="Deseja adicionar valor promocional?"
                className=" flex-row items-end"
            >
                <Input
                    name="promocional_price.price"
                    title="Digite o preço do serviço"
                    type="number"
                    formContext={formContext}
                />
                <InputDate
                    name="promocional_price.end_date"
                    title="Até quando vai essa promoção?"
                    formContext={formContext}
                />
            </Root.Optional>

            <Root.Optional
                name="link_buy"
                text="Deseja adicionar link para a compra?"
            >
                <Input
                    name="link_buy"
                    title="Digite o link para compra do serviço"
                    formContext={formContext}
                    onChange={({ currentTarget }) => {
                        if (!currentTarget.value.toLowerCase().includes("http"))
                            currentTarget.value = `https://${currentTarget.value.replace("http", "")}`
                    }}
                />
            </Root.Optional>

            <TextArea
                name="description"
                title="Faça uma descrição detalhada do seu serviço"
                formContext={formContext}
            />
        </>
    )
};