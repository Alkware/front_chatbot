import { FormEvent, MouseEvent, useContext } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { MdAdd, MdArrowDropDown, MdDelete } from "react-icons/md";
import { ModalContext } from "../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../components/modal/templates/PopOver";
import { Input } from "../../../../../../components/Form/components/Fields/Input/Input";
import { TextArea } from "../../../../../../components/Form/components/Fields/TextArea/TextArea";
import { Button } from "../../../../../../components/button/Button";
import { Title } from "../../../../../../components/Title/Title";
import { PopUp } from "../../../../../../components/modal/templates/PopUp";
import { SubTitle } from "../../../../../../components/SubTitle/SubTitle";

export function ComomQuestions() {
    const { setModalContent, clearModal } = useContext(ModalContext);
    const formContext = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control: formContext.control,
        name: `questions`
    });

    const handleAddNewAsk = () => {

        function addAskCommom(e: FormEvent<HTMLFormElement>) {
            e.preventDefault();
            const form = e.target as unknown as HTMLFormElement;
            const askInput = form.querySelector("input");
            const answerInput = form.querySelector("textarea");
            let errorMessage = null;

            if (!askInput?.value) errorMessage = "Digite a pergunta frequente do usuário"
            if (!answerInput?.value) errorMessage = "Digite a resposta frequente do usuário"
            if (errorMessage !== null) {
                setModalContent({
                    componentName: "modal_error_question",
                    components: <PopOver
                        componentName="modal_error_question"
                        message={errorMessage}
                        type="WARNING"
                    />
                });
                return;
            }

            append({ ask: askInput?.value, answer: answerInput?.value });
            clearModal("modal_add_new_ask");
        }

        setModalContent({
            componentName: "modal_add_new_ask",
            components: <PopUp>
                <Title 
                >Adicione uma nova pergunta frequente</Title>
                <form 
                    onSubmit={addAskCommom}
                    className="p-4 flex flex-col gap-6 items-center"
                >
                    <Input
                        name="ask"
                        title="Digite a pergunta frequente do usuário"
                    />
                    <TextArea
                        name="answer"
                        title="Digite a resposta frequente do usuário"
                    />
                    <Button><MdAdd /> Adicionar</Button>
                </form>
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
                            <div className="w-full flex gap-2 items-center">
                                <div
                                    onClick={openAskAnswer}
                                    className="w-full"
                                >
                                    <div
                                        id="container-ask"
                                        className="w-full p-1 flex items-center cursor-pointer relative justify-center bg-primary-100 dark:bg-primary-300 border border-dark rounded-md"
                                    >
                                        <Title
                                            className="md:text-base"
                                        >{field.ask}</Title>

                                        <MdArrowDropDown
                                            className="absolute right-2 size-6 fill-primary-200 dark:fill-primary-100"
                                        />
                                    </div>
                                    <div
                                        id="container-answer"
                                        className="w-full p-2 bg-primary-300/50 hidden relative -translate-y-10 transition-transform duration-500"
                                    >
                                        <SubTitle>{field.answer}</SubTitle>
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