import { useContext, useEffect } from "react";
import { PopOver } from "../../../../../../../../components/modal/templates/PopOver";
import { ModalContext } from "../../../../../../../../context/ModalContext";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Root } from "../../../../../../../../components/Form/FormRoot";
import { MdAdd, MdDelete } from "react-icons/md";
import { TipContainer } from "../../../../../../../../components/TipContainer/TipContainer";
import { AddVariables } from "../AddVariables/AddVariables";
import { ComomQuestions } from "../ComomQuestions/ComomQuestions";

export function AddProduct() {
    const { setModalContent } = useContext(ModalContext)
    const { control, watch } = useFormContext();

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'step_0.products'
    });

    useEffect(() => {
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
        <div className="w-full flex flex-col justify-start gap-4 px-2 md:px-4 overflow-hidden">
            <div className="w-full flex items-center justify-start my-4">
                <h2 className="font-medium text-center md:text-left text-xl md:text-2xl">Cadastre seus produtos disponíveis:</h2>
            </div>

            <Root.MultipleInput
                name="step_0.products"
                update={update}
                remove={remove}
            >
                {
                    fields.map((field, index) =>
                        <div
                            className="w-full bg-primary-100/20 rounded-md pt-4 md:py-4 flex flex-col justify-center items-center gap-6 relative"
                            tabIndex={index}
                            key={field.id}
                        >
                            <div className="w-[90%] flex flex-col md:flex-row gap-6 justify-center items-center relative ">

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

                            </div>

                            <div className="w-[90%] flex gap-6 justify-center items-center">
                                <Root.TextArea
                                    name={`step_0.products.${index}.description`}
                                    title="Conte um pouco sobre seu produto e como ele funciona"
                                />
                            </div>
                            <div className="w-[90%] flex gap-6 justify-center items-center my-0 md:my-8">
                                <Root.Optional
                                    name={`step_0.products.${index}.optional_variable.${0}`}
                                    defaultField={{}}
                                    text="Esse produto possui alguma variável?"
                                    active={!!watch(`step_0.products.${index}.optional_variable.${0}.title`)}
                                >
                                    <AddVariables
                                        index={index}
                                    />
                                </Root.Optional>
                            </div>

                            <div className="w-[90%] flex gap-6 justify-center items-center my-0 md:my-8">
                                <Root.Optional
                                    name={`step_0.products.${index}.optional_variable.${0}`}
                                    defaultField={{}}
                                    text="Esse produto possui perguntas frequentes?"
                                    active={!!watch(`step_0.products.${index}.questions.${0}.ask`)}
                                >
                                    <ComomQuestions
                                        index={index}
                                    />
                                </Root.Optional>
                            </div>
                            <div className="w-full p-2 flex gap-4 justify-end items-center rounded-md">
                                <TipContainer tip="Adicionar novo produto">
                                    <MdAdd
                                        onClick={handleAddNewProduct}
                                        className="bg-primary-100 fill-primary-300 text-3xl p-1 cursor-pointer rounded-full"
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
                    )
                }
            </Root.MultipleInput>
        </div>
    )
};