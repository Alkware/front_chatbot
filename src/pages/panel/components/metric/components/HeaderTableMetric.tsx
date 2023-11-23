import { Dispatch, SetStateAction, useEffect } from "react"
import { Columns } from "../../../../../@types/Column.types";

interface ModalColumnOrganizationTypes {
    setColumns: Dispatch<SetStateAction<any>>
    columns: any
}

export function HeaderTableMetric({ setColumns, columns }: ModalColumnOrganizationTypes) {

    useEffect(() => {
        const columnsHeaderMetric = JSON.parse(localStorage.getItem("metricColumnActive") || "[]");

        if (!!columnsHeaderMetric.length) setColumns(columnsHeaderMetric)
        else {
            const defaultColumns: Columns[] = [
                { key: "IS_ONLINE", columnName: "status", status: true },
                { key: "NAME", columnName: "Nome do chat", status: true },
                { key: "CAT", columnName: "Chats abertos (total)", status: true },
                { key: "CAU", columnName: "Chats abertos (unico)", status: true },
                { key: "TOKEN_INPUT", columnName: "Tokens de entrada", status: true },
                { key: "TOKEN_OUTPUT", columnName: "Tokens de saída", status: true },
                { key: "TOKEN_TOTAL", columnName: "Tokens Total", status: true },
                { key: "USED_REAL", columnName: "Valor gasto", status: true },
            ]
            localStorage.setItem("metricColumnActive", JSON.stringify(defaultColumns))
        }
    }, [])

    return (
        columns &&
        <div className="flex items-center overflow-auto bg-zinc-800 rounded-t-xl">
            {
                columns.map((column: Columns) =>
                    column.status &&
                    <h2 key={column.columnName} className="w-[200px] text-center border-[1px] border-transparent border-r-black/20 p-2">
                        {column.columnName}
                    </h2>
                )
            }
        </div>
    )
};