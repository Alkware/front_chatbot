import { useContext, useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { MdAdd, MdDelete } from "react-icons/md";
import { Root } from "../../../../../../../../components/Form/FormRoot";
import { ModalContext } from "../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../components/modal/templates/PopOver";


interface ComomQuestions {
    index: number
}
export function ComomQuestions({ index }: ComomQuestions) {
    const { setModalContent } = useContext(ModalContext);
    const { control, watch } = useFormContext();

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: `step_0.products.${index}.questions`
    });

    useEffect(() => {
        !fields.length &&
            append({ ask: "", answer: "" })
    }, [])

    const handleAddNewAsk = () => {
        const product = watch(`step_0.products.${index}.questions.${fields.length - 1}`)

        if (product.ask && product.answer) {
            append({ ask: "", answer: "" })
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
        <Root.MultipleInput
            name={`step_0.products.${index}.questions`}
            update={update}
            remove={remove}
        >
            {
                fields.map((field, index) =>
                    <div key={field.id} className="flex justify-center rounded-md p-4 items-center gap-4">
                        <div className="w-4/5 flex gap-6 justify-center items-center">
                            <Root.Input
                                name={`step_0.products.${index}.questions.${index}.ask`}
                                title="Digite uma pergunta"
                            />

                            <Root.Input
                                name={`step_0.products.${index}.questions.${index}.answer`}
                                title="Digite a resposta"
                            />
                        </div>

                        <div className="flex gap-4 justify-center items-center">
                            <MdAdd
                                onClick={handleAddNewAsk}
                                className="fill-primary-200 bg-primary-100 text-3xl p-1 cursor-pointer rounded-full"
                            />
                            <MdDelete
                                onClick={() => fields.length > 1 && remove(index)}
                                className="fill-red-700 bg-red-200 text-3xl p-1 cursor-pointer rounded-full"
                            />
                        </div>
                    </div>
                )
            }
        </Root.MultipleInput>
    )
};