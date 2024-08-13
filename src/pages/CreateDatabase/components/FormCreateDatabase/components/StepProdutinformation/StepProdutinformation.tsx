import { useFormContext } from "react-hook-form";
import { Root } from "../../../../../../components/Form/FormRoot";
import { useEffect } from "react";

export function StepProdutinformation() {
    const { watch } = useFormContext();

    // UseEffect responsável por salvar os dados digitados pelo usuário no localstorage para manter a consistencia de dados até que a fonte de dados seja criada...
    useEffect(() => {
        const text = watch("step_0.observation");
        const database = JSON.parse(localStorage.getItem("database") || "{}");
        localStorage.setItem("database", JSON.stringify({...database, observation: text}));
    }, [watch("step_0.observation")]);

    return (
        <Root.Step index={0} stepTitle="Informações básicas do produto/serviço">
            <h1>removido</h1>
        </Root.Step>
    )
};