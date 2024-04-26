import { MdAdd, MdDelete } from "react-icons/md";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useContext, useEffect } from "react";
import { Root } from "../../../../../../../../components/Form/FormRoot";
import { ModalContext } from "../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../components/modal/templates/PopOver";
import { AddVariables } from "./components/AddVariables/AddVariables";
import { TipContainer } from "../../../../../../../../components/TipContainer/TipContainer";

export function AddProducts() {
    const { setModalContent } = useContext(ModalContext)
    const { control, watch } = useFormContext();

    const { fields, append, remove, update } = useFieldArray({
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
        <div className="w-full flex flex-col gap-4 px-4">
            <div className="w-full flex items-center justify-start my-4">
                <h2 className="font-medium text-2xl">Cadastre seus produtos disponíveis:</h2>
            </div>

            <Root.MultipleInput
                update={update}
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
                                <div className="flex gap-4 justify-center items-center">
                                    <TipContainer tip="Adicionar novo produto">
                                        <MdAdd
                                            onClick={handleAddNewProduct}
                                            className="fill-green-700 bg-green-200 text-3xl p-1 cursor-pointer rounded-full"
                                        />
                                    </TipContainer>
                                    <TipContainer tip="Remover produto">
                                        <MdDelete
                                            onClick={() => fields.length > 1 && remove(index)}
                                            className="fill-red-700 bg-red-200 text-3xl p-1 cursor-pointer rounded-full"
                                        />
                                    </TipContainer>
                                </div>
                            </div>
                            <div className="w-[90%] flex gap-6 justify-center items-center">
                                <Root.TextArea
                                    name={`step_0.products.${index}.description`}
                                    title="Conte um pouco sobre seu produto e como ele funciona"
                                />
                            </div>
                            <div className="w-[90%] flex gap-6 justify-center items-center">
                                <Root.Optional
                                    name={`step_0.products.${index}.optional_variable.${0}`}
                                    defaultField={{}}
                                    text="Seu produto possui alguma variável?"
                                    active={!!watch(`step_0.products.${index}.optional_variable.${0}`)}
                                >
                                    <AddVariables
                                        index={index}
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