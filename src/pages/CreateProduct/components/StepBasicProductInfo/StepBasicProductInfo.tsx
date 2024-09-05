import { useFormContext } from "react-hook-form";
import { Root } from "../../../../components/Form/FormRoot";
import { Input } from "../../../../components/Form/components/Fields/Input/Input";
import { TextArea } from "../../../../components/Form/components/Fields/TextArea/TextArea";
import { InputDate } from "../../../../components/Form/components/Fields/InputDate/InputDate";
import { Product } from "../../../../@types/products.types";
import { UploadFile } from "../../../../components/UploadFile/UploadFile";

interface StepBasicProductInfo {
    client_id: string | undefined;
    product?: Product
}

export function StepBasicProductInfo({ client_id, product }: StepBasicProductInfo) {
    const formContext = useFormContext();

    return (
        <>
            <UploadFile
                name="images"
                client_id={client_id}
                limitSelect={5}
                formContext={formContext}
                imagesDefault={product?.images}
            />

            <div className="w-full mx-auto flex gap-4">
                <Input
                    name="product_name"
                    title="Digite o nome do produto"
                    formContext={formContext}
                    step="1"
                />
                <Input
                    name="price"
                    title="Digite o preço do produto"
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
                    title="Digite o preço do produto"
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
                title="Faça uma descrição detalhada do seu produto"
                formContext={formContext}
            />
        </>
    )
};