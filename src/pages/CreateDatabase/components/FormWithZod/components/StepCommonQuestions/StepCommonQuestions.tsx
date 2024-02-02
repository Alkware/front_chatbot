import {  useFieldArray, useFormContext } from "react-hook-form";
import { Root } from "../../../../../../components/Form-zod/FormRoot";
import { Button } from "../../../../../../components/button/Button";
import { MdRemoveCircle } from "react-icons/md";
import { useEffect } from "react";

export function StepCommonQuestions() {
    const { control } = useFormContext();


    const { fields , append , remove  } = useFieldArray({
        control,
        name: 'step_6.questions'
    });

    useEffect(() => {
        !fields.length &&
        append({ ask: "", answer: "" })
    }, [])


    return (
        <Root.Step index={6} stepTitle="Perguntas frequentes">

            <div className="w-full flex flex-col">
                <div className="w-full flex justify-end">
                    <Button
                        type="button"
                        onClick={() => append({ ask: "", answer: "" })}
                    > Adicionar perguntas</Button>
                </div>

                {
                    fields.map((field, index) =>

                        <div key={field.id} className="flex justify-center items-center gap-8">
                            <div className="w-4/5 flex gap-6 justify-center items-center">
                                <Root.Input
                                    name={`step_6.questions.${index}.ask`}
                                    title="Digite uma pergunta"
                                />

                                <Root.Input
                                    name={`step_6.questions.${index}.answer`}
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
            </div>


        </Root.Step>

    )
};