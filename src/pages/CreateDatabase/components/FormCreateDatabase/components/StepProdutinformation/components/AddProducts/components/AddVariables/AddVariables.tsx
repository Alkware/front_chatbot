import { useFieldArray, useFormContext } from "react-hook-form";
import { Root } from "../../../../../../../../../../components/Form/FormRoot";
import { MdAdd, MdDelete } from "react-icons/md";
import { useContext, useEffect } from "react";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../../../components/modal/templates/PopOver";

interface AddVariables {
    index: number;
}

export function AddVariables({ index }: AddVariables) {
    const { control, watch } = useFormContext();
    const { setModalContent } = useContext(ModalContext);

    const { fields, append, remove, update }: any = useFieldArray({
        name: `step_0.products.${index}.optional_variable`,
        control,
    })

    useEffect(() => {
        !fields.length && append({ title: "", answer: "" })
    }, [])

    const handleAddNewVariable = () => {
        const product = watch(`step_0.products.${index}.optional_variable.${fields.length - 1}`)

        if (product.title && product.answer) {
            append({ title: product?.title || "", answer: "" })
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
                    update={update}
                    fields={fields}
                    remove={remove}
                    titleParameter="answer"
                >
                    {
                        fields.map((field: any, indexVariable: number) =>
                            <div
                                className="flex items-center justify-between gap-3"
                                key={field.id}
                            >
                                <Root.Input
                                    name={`step_0.products.${index}.optional_variable.${indexVariable}.title`}
                                    title="Digite o nome da variável: (ex: COR)"
                                />
                                <Root.Input
                                    name={`step_0.products.${index}.optional_variable.${indexVariable}.answer`}
                                    title="Digite a variável: (ex: ROSA)"
                                />
                                <div className="flex gap-4 justify-center items-center">
                                    {
                                        indexVariable === (fields.length - 1) &&
                                        <MdAdd
                                            onClick={handleAddNewVariable}
                                            className="text-3xl bg-green-200 fill-green-700 rounded-full cursor-pointer"
                                        />
                                    }
                                    <MdDelete
                                        className="text-3xl bg-red-200 fill-red-700 rounded-full cursor-pointer"
                                        onClick={() => fields.length > 1 && remove(indexVariable)}
                                    />
                                </div>
                            </div>

                        )

                    }
                </Root.MultipleInput>

            }
        </div >

    )
};