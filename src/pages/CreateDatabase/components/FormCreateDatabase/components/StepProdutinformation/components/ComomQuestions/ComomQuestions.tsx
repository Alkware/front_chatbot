import { useContext, useEffect } from "react";
import { Button } from "../../../../../../../../components/button/Button";
import { useFieldArray, useFormContext } from "react-hook-form";
import { MdAdd, MdRemoveCircle } from "react-icons/md";
import { Root } from "../../../../../../../../components/Form/FormRoot";
import { ModalContext } from "../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../components/modal/templates/PopOver";

export function ComomQuestions() {
    const { setModalContent } = useContext(ModalContext);
    const { control, watch } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'step_0.questions'
    });

    useEffect(() => {
        !fields.length &&
            append({ ask: "", answer: "" })
    }, [])

    const handleAddNewAsk =()=>{
        const product = watch(`step_0.questions.${fields.length - 1}`)

        if (product.ask && product.answer) {
            append({ ask: "", answer: ""})
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

        <div className="w-full flex flex-col">
            <div className="w-full flex items-center justify-between my-4">
                <h2 className="font-medium text-xl">Cadastre suas perguntas frequentes</h2>
                <Button
                    type="button"
                    onClick={handleAddNewAsk}
                ><MdAdd /> Adicionar perguntas</Button>
            </div>

            <Root.MultipleInput
                fields={fields}
                remove={remove}
                titleParameter="ask"
            >
                {
                    fields.map((field, index) =>
                        <div key={field.id} className="flex justify-start bg-primary-100/20 rounded-md p-4 items-center gap-4">
                            <div className="w-[90%] flex gap-6 justify-center items-center">
                                <Root.Input
                                    name={`step_0.questions.${index}.ask`}
                                    title="Digite uma pergunta"
                                />

                                <Root.Input
                                    name={`step_0.questions.${index}.answer`}
                                    title="Digite a resposta"
                                />
                            </div>

                            <MdRemoveCircle
                                onClick={() => remove(index)}
                                className="fill-red-500 text-2xl cursor-pointer"
                            />
                        </div>
                    )
                }
            </Root.MultipleInput>
        </div>
    )
};