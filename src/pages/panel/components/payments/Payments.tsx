import { useContext } from "react";
import { ClientContext } from "../../../../context/ClientContext";
import { TransactionHistoric } from "./components/TransactionHistoric/TransactionHistoric";
import { CardPlan } from "./components/CardPlan/CardPlan";
import { CardRefund } from "./components/CardRefund/CardRefund";

export function Payments() {
    const { client } = useContext(ClientContext);


    return (
        <div className="w-full">
            <div className="w-full p-4 flex gap-6 justify-center">
                <CardPlan client={client} />

                <CardRefund client={client} />
            </div>

            <TransactionHistoric plan_management={client?.plan_management} />
        </div>
    )
};