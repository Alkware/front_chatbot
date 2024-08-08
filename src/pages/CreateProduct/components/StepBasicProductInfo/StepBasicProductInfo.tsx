import { useFormContext } from "react-hook-form";
import { Root } from "../../../../components/Form/FormRoot";
import { useEffect } from "react";
import { UploadFile } from "./components/UploadFile/UploadFile";

interface StepBasicProductInfo {
    client_id: string | undefined;
}

export function StepBasicProductInfo({ client_id }: StepBasicProductInfo) {
    const { watch } = useFormContext();

    // UseEffect responsável por salvar os dados digitados pelo usuário no localstorage para manter a consistencia de dados até que a fonte de dados seja criada...
    useEffect(() => {
        const text = watch("step_0.observation");
        const database = JSON.parse(localStorage.getItem("database") || "{}");
        localStorage.setItem("database", JSON.stringify({ ...database, observation: text }));
    }, [watch("step_0.observation")]);

    return (
        <Root.Step
            index={0}
            stepTitle="Informações básicas"
        >
            <UploadFile
                client_id={client_id}
                limitSelect={5}
            />

        </Root.Step>
    )
};