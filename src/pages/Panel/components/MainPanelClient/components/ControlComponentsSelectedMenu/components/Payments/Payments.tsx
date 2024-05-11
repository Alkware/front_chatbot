import { useContext } from "react";
import { TransactionHistoric } from "./components/TransactionHistoric/TransactionHistoric";
import { CardPlan } from "./components/CardPlan";
import { CardRefund } from "./components/CardRefund/CardRefund";
import { ClientContext } from "../../../../../../../../context/ClientContext";
import { Container } from "../../../../../../../../components/Container/Container";

export function Payments() {
    const { client } = useContext(ClientContext);


    return (
        <Container title="Assinatura" className="flex-col">
            <div className="w-full flex justify-center">
                <CardPlan client={client} />

                <CardRefund client={client} />
            </div>

            <TransactionHistoric plan_management={client?.plan_management} />
        </Container>
    )
};