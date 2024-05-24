import { useContext, useEffect } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { MdAdd, MdDelete } from "react-icons/md";
import { Root } from "../../../../../../../../components/Form/FormRoot";
import { ModalContext } from "../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../components/modal/templates/PopOver";


interface ComomQuestions {
    index: number
    useFormReturn: UseFormReturn
}

export function ComomQuestions({ index, useFormReturn }: ComomQuestions) {
    const { setModalContent } = useContext(ModalContext);

    const { fields, append, remove, update } = useFieldArray({
        control: useFormReturn.control,
        name: `step_0.products.${index}.questions`
    });

    useEffect(() => {
        !fields.length &&
            append({ ask: "", answer: "" })
    }, [])

    const handleAddNewAsk = () => {
        const product = useFormReturn.watch(`step_0.products.${index}.questions.${fields.length - 1}`)

        if (product.ask && product.answer) {
            append({ ask: "", answer: "" })
        } else {
            setModalContent({
                componentName: "modal_error_add_product",
                components:
                    <PopOver
                        componentName="modal_error_add_product"
                        message="Preencha todos os dados antes de adicionar uma nova pergunta"
                        type="WARNING"
                    />
            })
        }
    }

    return (
        <Root.MultipleInput
            name={`questions`}
            update={update}
            remove={remove}
        >
            {
                fields.map((field, indexQuestions) =>
                    <div key={field.id} className="flex flex-col md:flex-row justify-center rounded-md p-4 items-center gap-4">

                        <Root.Input
                            name={`questions.${indexQuestions}.ask`}
                            title="Digite uma pergunta"
                        />

                        <Root.Input
                            name={`questions.${indexQuestions}.answer`}
                            title="Digite a resposta"
                        />

                        <div className="flex gap-4 justify-center items-center">
                            <MdAdd
                                onClick={handleAddNewAsk}
                                className="fill-primary-200 bg-primary-100 text-3xl p-1 cursor-pointer rounded-full"
                            />
                            <MdDelete
                                onClick={() => fields.length > 1 && remove(indexQuestions)}
                                className="fill-red-700 bg-red-200 text-3xl p-1 cursor-pointer rounded-full"
                            />
                        </div>
                    </div>
                )
            }
        </Root.MultipleInput>
    )
};