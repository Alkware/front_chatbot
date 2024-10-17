import { useFieldArray, useFormContext } from "react-hook-form";
import { Artificial_Intelligence } from "../../../../@types/artificialInteligence.types";
import { Root } from "../../../../components/Form/FormRoot";
import { Select } from "../../../../components/Select/Select";
import { LinkFormChat } from "./components/LinkFormChat/LinkFormChat";

interface StepLinksChat {
    artificialInteligence: Artificial_Intelligence[]
}

export function StepLinksChat({ artificialInteligence }: StepLinksChat) {
    const form = useFormContext();

    const { remove, fields } = useFieldArray({
        control: form.control,
        name: "links"
    })

    return (
        <>
            <Select
                title="Selecione uma inteligência artificial"
                name="artificial_intelligence_id"
                options={artificialInteligence.map(p => ({ value: p.id, text: p.identification }))}
                formContext={form}
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