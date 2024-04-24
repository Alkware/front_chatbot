import {  useFieldArray, useFormContext } from "react-hook-form";
import { Root } from "../../../../../../../../../../components/Form/FormRoot";
import { MdAdd, MdRemove } from "react-icons/md";
import { Button } from "../../../../../../../../../../components/button/Button";

interface AddVariables {
    index: number;
}

export function AddVariables({ index }: AddVariables) {
    const { control, watch } = useFormContext();

    const { fields, append, remove }: any = useFieldArray({
        name: `step_0.products.${index}.optional_variable`,
        control,
    })

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex justify-between items-center">
                <h2>Adicione novas variáveis:</h2>
                <Button
                    type="button"
                    onClick={() => append({ title: watch(`step_0.products.${index}.optional_variable.${fields.length - 1}.title`) || "", answer: "" })}
                >
                    <MdAdd />
                    Adicionar
                </Button>
            </div>
            {
                <Root.MultipleInput
                    fields={fields}
                    remove={remove}
                    titleParameter="answer"
                >
                    {
                        fields.map((field: any, indexVariable: number) =>
                            <div 
                                className="flex gap-4"
                                key={field.id}
                            >
                                <Root.Input
                                    name={`step_0.products.${index}.optional_variable.${indexVariable}.title`}
                                    title="Digite o nome da variável: (ex: COR)"
                                />
                                <Root.Input
                                    name={`step_0.products.${index}.optional_variable.${indexVariable}.answer`}
                                    title="Digite a variavél: (ex: ROSA)"
                                />
                                <MdRemove
                                    className="p-1 size-8 bg-red-500 fill-dark rounded-full cursor-pointer"
                                    onClick={() => remove(indexVariable)}
                                />
                            </div>

                        )

                    }
                </Root.MultipleInput>

            }
        </div >

    )
};