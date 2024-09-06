import { useFormContext } from "react-hook-form";
import { Root } from "../../../../../../components/Form/FormRoot";
import { useEffect } from "react";
import { DATABASE_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../../../variables/variables";
import { Input } from "../../../../../../components/Form/components/Fields/Input/Input";
import { TextArea } from "../../../../../../components/Form/components/Fields/TextArea/TextArea";

export function StepPersonalityIA() {
    const form = useFormContext();
    const ia_name = form.watch("step_4.ia_name");
    const restrictions = form.watch("step_4.restrictions");
    const client_describe = form.watch("step_4.client_describe");

    // UseEffect responsável por salvar os dados digitados pelo usuário no localstorage para manter a consistencia de dados até que a fonte de dados seja criada...
    useEffect(() => {
        const database = JSON.parse(localStorage.getItem(DATABASE_NAME_TO_SAVE_LOCALSTORAGE) || "{}");
        localStorage.setItem(DATABASE_NAME_TO_SAVE_LOCALSTORAGE, JSON.stringify({
            ...database,
            ia_name,
            restrictions,
            client_describe
        }));
    }, [ia_name, restrictions, client_describe]);

    return (
        <>
            <Root.Optional
                name="artificial_name"
                text="Deseja dar um nome a sua inteligência artificial?"
            >
                <Input
                    name="artificial_name"
                    title="Como quer que nossa IA se apresente?"
                />
            </Root.Optional>

            <Root.Optional
                text="Deseja adicionar restrições de palavras ou frase?"
                name="restrictions"
            >
                <Input
                    name="restrictions"
                    title="Faça uma lista de restrições para que a IA evite utiliza-la em uma conversa"
                />
            </Root.Optional>

            <TextArea
                name="client_describe"
                title="Faça uma breve descrição de quem é seu público (cliente)"
                help="Aqui você deve descrever como é seu cliente, quais seus gostos, quais suas necessidades no dia à dia, quais motivos ele precisa comprar com você e etc. "
                formContext={form}
            />
        </>
    )
};