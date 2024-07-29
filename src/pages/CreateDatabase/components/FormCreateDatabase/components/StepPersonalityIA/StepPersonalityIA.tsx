import { useFormContext } from "react-hook-form";
import { Root } from "../../../../../../components/Form/FormRoot";
import { useEffect } from "react";
import { DATABASE_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../../../variables/variables";

export function StepPersonalityIA() {
    const { watch } = useFormContext();
    const ia_name = watch("step_4.ia_name");
    const restrictions = watch("step_4.restrictions");
    const client_describe = watch("step_4.client_describe");

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
        <Root.Step index={1} stepTitle="Personalidade da IA">

            <Root.Optional
                name="step_4.ia_name"
                text="Deseja dar um nome a sua inteligência artificial?"
            >
                <Root.Input
                    name="step_4.ia_name"
                    title="Como quer que nossa IA se apresente?"
                />
            </Root.Optional>

            <Root.Optional
                text="Deseja adicionar restrições de palavras ou frase?"
                name="step_4.restrictions"
            >
                <Root.Input
                    name="step_4.restrictions"
                    title="Faça uma lista de restrições para que a IA evite utiliza-la em uma conversa"
                />
            </Root.Optional>

            <Root.TextArea
                title="Faça uma breve descrição de quem é seu público (cliente)"
                name="step_4.client_describe"
            />


        </Root.Step>

    )
};