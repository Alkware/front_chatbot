import { Dispatch, SetStateAction, useEffect } from "react"
import { Columns } from "../../../../../@types/Column.types";

interface ModalColumnOrganizationTypes {
    setColumns: Dispatch<SetStateAction<any>>
    columns: any
}

const defaultColumns: Columns[] = [
    { key: "IS_ONLINE", columnName: "status", status: true },
    { key: "NAME", columnName: "Nome do chat", status: true },
    { key: "CAT", columnName: "Chats abertos (total)", status: true },
    { key: "CAU", columnName: "Chats abertos (unico)", status: true },
    { key: "TOKEN_INPUT", columnName: "Tokens de entrada", status: false },
    { key: "TOKEN_OUTPUT", columnName: "Tokens de saída", status: false },
    { key: "TOKEN_TOTAL", columnName: "Tokens Total", status: false },
    { key: "WIPS_INPUT", columnName: "Wips de entrada", status: true },
    { key: "WIPS_OUTPUT", columnName: "Wips de saída", status: true },
    { key: "WIPS_TOTAL", columnName: "Wips Total", status: true },
    { key: "USED_REAL", columnName: "Valor gasto", status: true },
]
export function HeaderTableMetric({ setColumns, columns }: ModalColumnOrganizationTypes) {

    useEffect(() => {
        const columnsHeaderMetric = JSON.parse(localStorage.getItem("metricColumnActive") || "[]");

        if (columnsHeaderMetric.length > 0) {
            if (columnsHeaderMetric.length < defaultColumns.length) localStorage.setItem("metricColumnActive", JSON.stringify(defaultColumns))
            else setColumns(columnsHeaderMetric)
        } else {
            localStorage.setItem("metricColumnActive", JSON.stringify(defaultColumns))
        }
    }, [])

    return (
        columns &&
        <div className="w-full flex items-center rounded-t-xl">
            {
                columns.map((column: Columns) =>
                    column.status &&
                    <h2
                        key={column.columnName}
                        className="w-full min-w-[200px] text-center bg-zinc-800 border border-transparent border-r-black/20 p-2"
                    >
                        {column.columnName}
                    </h2>
                )
            }
        </div>
    )
};