import { useFieldArray, useFormContext } from "react-hook-form";
import { MdAdd, MdDelete } from "react-icons/md";
import { useContext, useEffect } from "react";
import { ModalContext } from "../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../components/modal/templates/PopOver";
import { Root } from "../../../../../../../../components/Form/FormRoot";
import { TipContainer } from "../../../../../../../../components/TipContainer/TipContainer";


interface AddVariables {
    index: number;
}

const options = [
    { text: "COR", value: "COR" },
    { text: "TAMANHO", value: "TAMANHO" },
    { text: "MARCA", value: "MARCA" },
    { text: "PESO", value: "PESO" },
    { text: "MODELO", value: "MODELO" },
    { text: "MATERIAL", value: "MATERIAL" },
    { text: "QUANTIDADE EM ESTOQUE", value: "QUANTIDADE EM ESTOQUE" },
    { text: "DIMENSÕES DE ENVIO", value: "DIMENSÕES DE ENVIO" },
];

export function AddVariables({ index }: AddVariables) {
    const { control, watch } = useFormContext();
    const { setModalContent } = useContext(ModalContext);

    const { fields, append, remove, update } = useFieldArray({
        name: `step_0.products.${index}.optional_variable`,
        control,
    })

    useEffect(() => {
        !fields.length && append({ title: "", answer: "" })
    }, [])

    const handleAddNewVariable = () => {
        const product = watch(`step_0.products.${index}.optional_variable.${fields.length - 1}`)

        if (product.title && product.answer) {
            append({ title: "", answer: "" })
        } else {
            setModalContent({
                componentName: "modal_error_add_product",
                components:
                    <PopOver
                        componentName="modal_error_add_product"
                        message="Preencha todos os dados antes de adicionar uma nova variável"
                        type="WARNING"
                    />
            })
        }
    }

    return (
        <div className="w-full flex flex-col gap-4">
            {
                <Root.MultipleInput
                    name={`step_0.products.${index}.optional_variable`}
                    update={update}
                    remove={remove}
                >
                    {
                        fields.map((field: any, indexVariable: number) => {
                            return <div
                                className="flex flex-col md:flex-row items-center justify-between gap-3"
                                key={field.id}
                            >
                                <Root.Select
                                    title="Variável"
                                    name={`step_0.products.${index}.optional_variable.${indexVariable}.title`}
                                    options={options}
                                />

                                <Root.Input
                                    name={`step_0.products.${index}.optional_variable.${indexVariable}.answer`}
                                    title="Digite a variável: (ex: ROSA ou ROSA, AZUL, PRETO)"
                                />
                                <div className="flex gap-4 justify-center items-center">
                                    {
                                        indexVariable === (fields.length - 1) &&
                                        <TipContainer
                                            tip="Adicionar nova varável"
                                        >
                                            <MdAdd
                                                onClick={handleAddNewVariable}
                                                className="text-3xl bg-primary-100 fill-primary-300 rounded-full cursor-pointer"
                                            />
                                        </TipContainer>
                                    }
                                    <TipContainer tip="Remove varável">
                                        <MdDelete
                                            className="text-3xl bg-red-200 fill-red-700 rounded-full cursor-pointer"
                                            onClick={() => fields.length > 1 && remove(indexVariable)}
                                        />
                                    </TipContainer>
                                </div>
                            </div>
                        })

                    }
                </Root.MultipleInput>
            }
        </div >

    )
};