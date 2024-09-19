import { useFieldArray, UseFormReturn } from "react-hook-form";
import { Artificial_Intelligence } from "../../../../@types/artificialInteligence.types";
import { Root } from "../../../../components/Form/FormRoot";
import { Select } from "../../../../components/Select/Select";
import { ChatSchema } from "../../../../schema/zod/chatSchema";
import { LinkFormChat } from "./components/LinkFormChat/LinkFormChat";

interface StepLinksChat {
    createChatForm: UseFormReturn<ChatSchema>
    artificialInteligence: Artificial_Intelligence[]
}

export function StepLinksChat({ artificialInteligence, createChatForm }: StepLinksChat) {

    const { remove, fields } = useFieldArray({
        control: createChatForm.control,
        name: "links"
    })

    return (
        <>
            <Select
                title="Selecione uma inteligência artificial"
                name="artificial_intelligence_id"
                options={artificialInteligence.map(p => ({ value: p.id, text: p.identification }))}
            />
            <Root.Optional
                name="links"
                text="Deseja adicionar links uteís ao seu chat?"
                functionOffToggle={() => fields.forEach((_, index) => remove(index))}
            >
                <LinkFormChat />
            </Root.Optional>
        </>
    )
};