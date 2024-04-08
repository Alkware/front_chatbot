import { useContext } from "react";
import { TransactionHistoric } from "./components/TransactionHistoric";
import { CardPlan } from "./components/CardPlan";
import { CardRefund } from "./components/CardRefund/CardRefund";
import { ClientContext } from "../../../../../../../../context/ClientContext";
import { Container } from "../../../../../../../../components/Container/Container";
import { Tutorial } from "../../../../../../../../components/Tutorial/Tutorial";

export function Payments() {
    const { client } = useContext(ClientContext);


    return (
        <Container title="Assinatura" className="flex-col gap-8">
            <div className="w-full p-4 flex gap-6 justify-center">
                <CardPlan client={client} />

                <CardRefund client={client} />

                <Tutorial
                    tutorialId="add_plan"
                />
            </div>

            <TransactionHistoric plan_management={client?.plan_management} />
        </Container>
    )
};