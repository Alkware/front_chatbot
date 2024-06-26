import { useFormContext } from "react-hook-form";
import { Root } from "../../../../../../components/Form/FormRoot";
import { AddProduct } from "./components/AddProduct/AddProduct";
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
            <AddProduct />
            <Root.Optional
                text="Deseja adicionar alguma observação sobre seus produtos?"
                name="step_0.observation"
            >
                <Root.TextArea
                    name="step_0.observation"
                    title="Deixe uma observação sobre seus produtos"
                />
            </Root.Optional>
        </Root.Step>
    )
};