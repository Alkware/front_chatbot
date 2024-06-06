import { useEffect, useState } from "react";
import { PlanManagement } from "../../../../../../../../../../@types/planManagement";
import { Table } from "../../../../../../../../../../components/Table/Table";
import { formatDate } from "../../../../../../../../../../functions/formatDate";


export function TransactionHistoric({ plan_management }: { plan_management?: PlanManagement }) {
    const [rows, setRows] = useState<Array<any[]>>();


    useEffect(()=>{
        const rows = plan_management?.trasaction.map(transaction => [plan_management.plan.plan_name, formatDate(transaction.updated_at).dateFormat_A, `${transaction.amount_paid} reais`, transaction.payment_method, transaction.status]);
        setRows(rows)
    }, [])


    return (
        rows &&
        <div className="w-full flex flex-col items-center">
            <h2 className="text-xl p-2">Historico de transações</h2>


            <div className="w-[95%]">
                <Table
                    titleColumn={["Plano", "Data e hora", "Valor do plano", "Método de pagamento", "Status"]}
                    rows={rows}
                    maxPerPage={5}
                />
            </div>
        </div>
    )
};