import { Root } from "../../../../../../components/Form/FormRoot";
import { AddProducts } from "./components/AddProducts/AddProducts";
import { ComomQuestions } from "./components/ComomQuestions/ComomQuestions";

export function StepProdutinformation() {

    return (
        <Root.Step index={0} stepTitle="Informações básicas do produto">

          <AddProducts />

          <ComomQuestions />

        </Root.Step>
    )
};