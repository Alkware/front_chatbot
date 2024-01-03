import { useContext } from "react";
import { ClientContext } from "../../../../context/ClientContext";
import { TransactionHistoric } from "./components/TransactionHistoric/TransactionHistoric";
import { CardPlan } from "./components/CardPlan/CardPlan";
import { CardRefund } from "./components/CardRefund/CardRefund";
import { Container } from "../../../../components/Container/Container";

export function Payments() {
    const { client } = useContext(ClientContext);


    return (
        <Container title="Pagamentos" className="flex-col gap-8">
            <div className="w-full p-4 flex gap-6 justify-center">
                <CardPlan client={client} />

                <CardRefund client={client} />
            </div>

            <TransactionHistoric plan_management={client?.plan_management} />
        </Container>
    )
};