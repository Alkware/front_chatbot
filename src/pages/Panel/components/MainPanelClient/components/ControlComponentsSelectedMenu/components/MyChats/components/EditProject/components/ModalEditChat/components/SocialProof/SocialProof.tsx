import { useFieldArray, useFormContext } from "react-hook-form";
import { Root } from "../../../../../../../../../../../../../../components/Form/FormRoot";
import { Button } from "../../../../../../../../../../../../../../components/button/Button";
import { MdAdd, MdDelete } from "react-icons/md";

export function SocialProof() {
    const { control } = useFormContext();

    const { fields, remove, append } = useFieldArray({
        control,
        name: "step_0.social_proof"
    })


    return (
        <Root.Container className="overflow-auto h-[400px] mt-8">
 
            <Root.Container className="flex justify-between items-center">
                <div className="flex flex-col text-center">
                    <h2 className="text-xl font-bold">Adicione avaliações dos seus clientes:</h2>
                    <span className="text-sm opacity-70">(Essas avaliações estarão visível na bio do chat)</span>
                </div>
                <Button
                    type="button"
                    onClick={() => append({})}
                >
                    Adicionar <MdAdd />
                </Button>
            </Root.Container>

            <Root.Container className="px-4">
                {
                    fields.map((field: any, index: number) =>
                        <Root.Container
                            className="w-full flex flex-col gap-6 my-4 p-2 border border-primary-100 relative"
                            key={field.id}
                        >
                            <MdDelete
                                className="absolute -top-3 -right-3 bg-red-800/50 fill-red-500 cursor-pointer rounded-full p-1 text-2xl"
                                onClick={() => remove(index)}
                            />
                            <Root.Container className="w-full flex justify-start items-center gap-4">
                                <Root.File
                                    name={`step_0.social_proof.${index}.avatar`}
                                    sizeContainer="50px"
                                />
                                <Root.Input
                                    title="Nome do cliente"
                                    name={`step_0.social_proof.${index}.person_name`}
                                />
                                <Root.Input
                                    type="number"
                                    title="Nota da avaliação"
                                    name={`step_0.social_proof.${index}.rating`}
                                    min={0}
                                    max={5}
                                />
                            </Root.Container>

                            <Root.TextArea
                                name={`step_0.social_proof.${index}.text`}
                                title="Oque o cliente achou do produto?"
                            />
                            <Root.Container className="flex gap-4 justify-start">
                                <Root.File
                                    name={`step_0.social_proof.${index}.images.0`}
                                    sizeContainer="50px"
                                />
                                <Root.File
                                    name={`step_0.social_proof.${index}.images.1`}
                                    sizeContainer="50px"
                                />
                                <Root.File
                                    name={`step_0.social_proof.${index}.images.2`}
                                    sizeContainer="50px"
                                />
                            </Root.Container>

                        </Root.Container>
                    )
                }
            </Root.Container>

        </Root.Container>
    )
};