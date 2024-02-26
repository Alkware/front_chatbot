import { useFieldArray, useFormContext } from "react-hook-form";
import { Root } from "../../../../../../components/Form/FormRoot";
import { Button } from "../../../../../../components/button/Button";
import { MdRemoveCircle } from "react-icons/md";
import { useEffect } from "react";

export function StepPaymentsMethods() {
    const { control } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'step_4.products'
    });

    useEffect(() => {
        !fields.length &&
            append({ name: "", value: "R$ 0" })
    }, [])

    return (
        <Root.Step index={4} stepTitle="Métodos de pagamentos">
            <Root.Container className="flex" title="Quais são os métodos de pagamentos aceitos?">

                <Root.Select
                    title="Escolha seus métodos de pagamentos"
                    isMultiple={true}
                    name="step_4.payment_methods"
                    options={[
                        { value: "Pix", text: "Pix" },
                        { value: "Boleto", text: "Boleto" },
                        { value: "Cartão de débito", text: "Cartão de débito" },
                        { value: "Cartão de crédito", text: "Cartão de crédito" },
                        { value: "Pagamentos em aplicativo", text: "Pagamentos em aplicativo" },
                    ]}
                />

            </Root.Container>

            <Root.TextArea
                name="step_4.how_to_buy"
                title="como comprar seu produto?"
            />

            <div className="w-full flex flex-col gap-4">
                <div className="w-full flex items-center justify-between my-4">
                    <h2 className="font-medium text-xl">Registre os produtos disponíveis para essa fonte de dados</h2>
                    <Button
                        type="button"
                        onClick={() => append({ name: "", value: "R$ 0" })}
                    > Adicionar produto</Button>
                </div>

                {
                    fields.map((field, index) =>

                        <div key={field.id} className="flex justify-center items-center gap-8">
                            <div className="w-4/5 flex gap-6 justify-center items-center">
                                <Root.Input
                                    name={`step_4.products.${index}.name`}
                                    title="De um nome a esse produto:"
                                />

                                <Root.Input
                                    name={`step_4.products.${index}.value`}
                                    onChange={({ target }) => {
                                        const number = parseFloat(target.value.replace(/[^\d]/g, '')) / 100;
                                        const formatNumber = number.toLocaleString('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        });

                                        target.value = formatNumber
                                    }}
                                    title="Qual o valor do produto?"
                                />
                            </div>

                            <MdRemoveCircle
                                onClick={() => remove(index)}
                                className="fill-red-500 text-2xl cursor-pointer"
                            />
                        </div>
                    )
                }
            </div>


        </Root.Step>
    )
};