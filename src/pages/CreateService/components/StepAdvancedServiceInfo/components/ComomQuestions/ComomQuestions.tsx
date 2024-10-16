import { MouseEvent, useContext } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { MdAdd, MdArrowDropDown, MdDelete } from "react-icons/md";
import { ModalContext } from "../../../../../../context/ModalContext";
import { Button } from "../../../../../../components/button/Button";
import { Text } from "../../../../../../components/Text/Text";
import { PopUp } from "../../../../../../components/modal/templates/PopUp";
import { FormAddQuestion } from "./components/FormAddQuestion/FormAddQuestion";

export function ComomQuestions() {
    const { setModalContent } = useContext(ModalContext);
    const formContext = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control: formContext.control,
        name: `questions`
    });

    /**
     * Função responsável por exibir o formulário para adicionar novas perguntas...
     */
    const handleAddNewAsk = () => {
        setModalContent({
            componentName: "modal_add_new_ask",
            components: <PopUp>
                <FormAddQuestion
                    append={append}
                />
            </PopUp>
        })
    }

    const openAskAnswer = (e: MouseEvent<HTMLDivElement>) => {
        const container = e.currentTarget;
        const containerAnswer = container.querySelector("div#container-answer");
        if (containerAnswer?.classList.contains("hidden")) {
            containerAnswer?.classList.remove("hidden", "-translate-y-10");
            containerAnswer?.classList.add("visible", "translate-y-0");
        } else {
            containerAnswer?.classList.remove("visible", "translate-y-0");
            containerAnswer?.classList.add("hidden");
        }

    }

    return (
        <div className="w-full flex flex-col">
            <div className="self-end">
                <Button
                    type="button"
                    onClick={handleAddNewAsk}
                >
                    <MdAdd />
                    Criar perguntas frequentes
                </Button>
            </div>
            <div className="flex flex-col p-4">
                {!fields.length ?
                    <p className="w-full text-center">Você ainda não cadastrou nenhuma pergunta.</p>
                    :
                    <div className="flex flex-col max-h-[300px] overflow-auto">
                        {fields.map((field: any, index: number) =>
                            <div 
                                key={field.id}
                                className="w-full flex gap-2 items-center"
                            >
                                <div
                                    onClick={openAskAnswer}
                                    className="w-full"
                                >
                                    <div
                                        id="container-ask"
                                        className="w-full p-1 flex items-center cursor-pointer relative justify-center bg-primary-100 dark:bg-primary-300 border border-dark rounded-md"
                                    >
                                        <Text.h2
                                            className="md:text-base"
                                        >{field.ask}</Text.h2>

                                        <MdArrowDropDown
                                            className="absolute right-2 size-6 fill-primary-200 dark:fill-primary-100"
                                        />
                                    </div>
                                    <div
                                        id="container-answer"
                                        className="w-full p-2 bg-primary-300/50 hidden relative -translate-y-10 transition-transform duration-500"
                                    >
                                        <Text.h3>{field.answer}</Text.h3>
                                    </div>
                                </div>
                                <MdDelete
                                    className="size-6 fill-red-400 cursor-pointer"
                                    onClick={() => remove(index)}
                                />
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    )
};