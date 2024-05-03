import { Root } from "../../../../../../components/Form/FormRoot";
import { AddProduct } from "./components/AddProduct/AddProduct";

export function StepProdutinformation() {
    return (
        <Root.Step index={0} stepTitle="Informações básicas do produto">
                <AddProduct />
        </Root.Step>
    )
};