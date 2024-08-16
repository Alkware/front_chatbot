import { useFormContext } from "react-hook-form";
import { Root } from "../../../../components/Form/FormRoot";
import { UploadFile } from "./components/UploadFile/UploadFile";
import { Input } from "../../../../components/Form/components/Fields/Input/Input";
import { TextArea } from "../../../../components/Form/components/Fields/TextArea/TextArea";
import { InputDate } from "../../../../components/Form/components/Fields/InputDate/InputDate";

interface StepBasicServiceInfo {
    client_id: string | undefined;
}

export function StepBasicServiceInfo({ client_id }: StepBasicServiceInfo) {
    const formContext = useFormContext();

    return (
        <>
            <UploadFile
                name="images"
                client_id={client_id}
                limitSelect={5}
                formContext={formContext}
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
                    type="number"
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

            <TextArea
                name="description"
                title="Faça uma descrição detalhada do seu serviço"
                formContext={formContext}
            />
        </>
    )
};