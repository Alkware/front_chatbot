import { MdAdd, MdRemoveCircle } from "react-icons/md";
import { Button } from "../../../../../../../../components/button/Button";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useContext, useEffect } from "react";
import { Root } from "../../../../../../../../components/Form/FormRoot";
import { ModalContext } from "../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../components/modal/templates/PopOver";

export function AddProducts() {
    const { setModalContent } = useContext(ModalContext)
    const { control, watch } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'step_0.products'
    });

    useEffect(() => {
        !fields.length &&
            append({ name: "", value: "R$ 0", description: "" })
    }, [])


    const handleAddNewProduct = () => {
        const product = watch(`step_0.products.${fields.length - 1}`)

        if (product.name && product.value && product.description) {
            append({ name: "", value: "R$ 0", description: "" })
        } else {
            setModalContent({
                componentName: "modal_error_add_product",
                components:
                    <PopOver
                        componentName="modal_error_add_product"
                        message="Preencha todos os dados antes de adicionar um novo produto"
                        type="WARNING"
                    />
            })
        }
    }


    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex items-center justify-between my-4">
                <h2 className="font-medium text-2xl">Cadastre seus produtos disponíveis:</h2>
                <Button
                    type="button"
                    onClick={handleAddNewProduct}
                ><MdAdd /> Adicionar produto</Button>
            </div>

            <Root.MultipleInput
                fields={fields}
                remove={remove}
                titleParameter="name"
            >
                {
                    fields.map((field, index) =>
                        <div
                            className="w-full bg-primary-100/20 rounded-md py-4 flex flex-col justify-center items-center gap-6"
                            tabIndex={index}
                            key={field.id}
                        >
                            <div className="w-[90%] flex gap-6 justify-center items-center">
                                <Root.Input
                                    name={`step_0.products.${index}.name`}
                                    title="De um nome a esse produto:"

                                />

                                <Root.Input
                                    name={`step_0.products.${index}.value`}
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
                                <MdRemoveCircle
                                    onClick={() => remove(index)}
                                    className="fill-red-500 text-5xl cursor-pointer"
                                />
                            </div>
                            <div className="w-[90%] flex gap-6 justify-center items-center">
                                <Root.TextArea
                                    name={`step_0.products.${index}.description`}
                                    title="Conte um pouco sobre seu produto e como ele funciona"
                                />
                            </div>
                            <div className="w-[90%] flex gap-6 justify-center items-center">
                                <Root.Optional
                                    text="Seu produto possui alguma variavél?"
                                >
                                    <Root.Input
                                        // name={`step_0.products.${index}.optional_variable.0.field_title`}
                                        name="a"
                                        title="Digite o nome da variavél: (ex: COR)"
                                    />
                                    <Root.Input
                                        // name={`step_0.products.${index}.optional_variable.0.options`}
                                        name="b"
                                        title="Digite a variavél: (ex: ROSA)"
                                    />
                                </Root.Optional>
                            </div>
                        </div>
                    )
                }
            </Root.MultipleInput>
        </div>
    )
};