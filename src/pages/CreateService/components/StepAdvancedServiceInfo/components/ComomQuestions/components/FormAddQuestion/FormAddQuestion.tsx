import { FormEvent, useContext } from "react";
import { Heading } from "../../../../../../../../components/Heading/Heading";
import { ModalContext } from "../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../components/modal/templates/PopOver";
import { FieldValues, UseFieldArrayAppend } from "react-hook-form";
import { Input } from "../../../../../../../../components/Form/components/Fields/Input/Input";
import { TextArea } from "../../../../../../../../components/Form/components/Fields/TextArea/TextArea";
import { Button } from "../../../../../../../../components/button/Button";
import { MdAdd } from "react-icons/md";

interface FormAddQuestion { 
    append: UseFieldArrayAppend<FieldValues, "questions">
}

export function FormAddQuestion({ append }: FormAddQuestion) {
    const { setModalContent, clearModal } = useContext(ModalContext);

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

    return (
        <div className="p-4">
            <Heading.h2
            >Adicione uma nova pergunta frequente</Heading.h2>
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
        </div>
    )
};