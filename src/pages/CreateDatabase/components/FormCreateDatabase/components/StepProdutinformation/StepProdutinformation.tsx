import { Root } from "../../../../../../components/Form/FormRoot";
import { AddProduct } from "./components/AddProduct/AddProduct";

export function StepProdutinformation() {
    return (
        <Root.Step index={0} stepTitle="Informações básicas do produto">
            <AddProduct />
            <Root.Optional
                text="Deseja adicionar alguma observação sobre seus produtos?"
                name="step_0.observation"
                defaultField={""}
            >
                <Root.TextArea
                    name="step_0.observation"
                    title="Deixe uma observação sobre seus produtos"

                />
            </Root.Optional>
        </Root.Step>
    )
};