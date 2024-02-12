import { Root } from "../../../../../../../../../../../../components/Form/FormRoot";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../../../../../../../../../../../../components/button/Button";
import { MdDelete } from "react-icons/md";

export function StepEditCommonQuestions() {
    const { control } = useFormContext();

    const { append, remove, fields } = useFieldArray({
        control,
        name: "step_6.questions"
    })

    return (
        <div className="w-full flex flex-col gap-6 justify-center items-center">

            <div className="w-full flex justify-end">
                <Button
                    type="button"
                    onClick={() => append({ ask: "", answer: "" })}
                >
                    Adicionar
                </Button>
            </div>

            <div className="w-full flex flex-col">
                {
                    fields.map((field, index) =>
                        <div
                            className="w-full flex gap-4 justify-center items-center"
                            key={field.id}
                        >
                            <div className="w-full flex gap-4">
                                <Root.Input
                                    name={`step_6.questions.${index}.ask`}
                                    title="Digite uma pergunta"
                                />

                                <Root.Input
                                    name={`step_6.questions.${index}.answer`}
                                    title="Digite a resposta"
                                />
                            </div>
                            <div>
                                <MdDelete
                                    className="fill-red-700 bg-red-900/50 rounded-full p-1 text-2xl cursor-pointer"
                                    onClick={()=> remove(index)}

                                />
                            </div>
                        </div>
                    )

                }
            </div>
        </div>
    )
};