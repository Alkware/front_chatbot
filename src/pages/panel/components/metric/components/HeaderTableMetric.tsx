import { Dispatch, SetStateAction, useEffect } from "react"
import { Columns } from "../../../../../@types/Column.types";

interface ModalColumnOrganizationTypes {
    setColumns: Dispatch<SetStateAction<any>>
    columns: any
}

const defaultColumns: Columns[] = [
    { key: "IS_ONLINE", columnName: "status", status: true, dataType: "boolean" },
    { key: "NAME", columnName: "Nome do chat", status: true, dataType: "string" },
    { key: "CAT", columnName: "Chats abertos (total)", status: true, dataType: "number" },
    { key: "CAU", columnName: "Chats abertos (unico)", status: false, dataType: "number" },
    { key: "MESSAGE_INPUT", columnName: "Mensagens de entrada", status: false, dataType: "number" },
    { key: "MESSAGE_OUTPUT", columnName: "Mensagens de saída", status: false, dataType: "number" },
    { key: "MESSAGES_TOTAL", columnName: "Mensagens total", status: true, dataType: "number" },
    { key: "MEDIA_MESSAGES_CHAT", columnName: "Mensagens por chat", status: false, dataType: "number" },
    { key: "USAGE_TIME", columnName: "Tempo de uso", status: false, dataType: "string" },
    { key: "MEDIA_USAGE_TIME", columnName: "Tempo de uso por chat", status: true, dataType: "string" },
    { key: "LINK_CLICKS", columnName: "Cliques no link", status: true, dataType: "number" },
    { key: "LEADS_COLLECTED", columnName: "Leads coletados", status: true, dataType: "number" },
    { key: "SERVICE_NOTE", columnName: "Nota de atendimento", status: true, dataType: "number" },
    { key: "RESOLUTION_RATE", columnName: "Taxa de resolução", status: true, dataType: "number" },
    { key: "CREATED_AT", columnName: "Criado em", status: true, dataType: "string" },
]


export function HeaderTableMetric({ setColumns, columns }: ModalColumnOrganizationTypes) {

    useEffect(() => {
        const columnsHeaderMetric = JSON.parse(localStorage.getItem("metricColumnActive") || "[]");

        if (columnsHeaderMetric.length > 0) {
            if (columnsHeaderMetric.length !== defaultColumns.length) localStorage.setItem("metricColumnActive", JSON.stringify(defaultColumns))
            else setColumns(columnsHeaderMetric)
        } else {
            localStorage.setItem("metricColumnActive", JSON.stringify(defaultColumns))
        }
    }, [])

    return (
        columns &&
        <div 
            className="w-1/2 flex"
        >
            {
                columns.map((column: Columns) =>
                    column.status &&
                    <span
                        key={column.columnName}
                        className="w-48 flex-none p-3 text-center bg-primary-300 border-r border-r-primary-100"
                    >
                        {column.columnName}
                    </span>
                )
            }
        </div>
    )
};