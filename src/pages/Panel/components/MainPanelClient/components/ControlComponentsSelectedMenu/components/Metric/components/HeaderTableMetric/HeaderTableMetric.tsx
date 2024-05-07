import { Dispatch, SetStateAction, useEffect } from "react"
import { Columns } from "../../../../../../../../../../@types/Column.types"

interface ModalColumnOrganizationTypes {
    setColumns: Dispatch<SetStateAction<any>>
    columns: any
}

const defaultColumns: Columns[] = [
    { key: "IS_ONLINE", columnName: "Status", status: true, dataType: "boolean", size: 80 },
    { key: "NAME", columnName: "Nome do chat", status: true, dataType: "string", size: 170 },
    { key: "CAT", columnName: "Chats abertos (total)", status: true, dataType: "number", size: 200 },
    { key: "CAU", columnName: "Chats abertos (unico)", status: false, dataType: "number", size: 200 },
    { key: "MESSAGE_INPUT", columnName: "Mensagens de entrada", status: false, dataType: "number", size: 180 },
    { key: "MESSAGE_OUTPUT", columnName: "Mensagens de saída", status: false, dataType: "number", size: 170 },
    { key: "MESSAGES_TOTAL", columnName: "Mensagens total", status: true, dataType: "number", size: 170 },
    { key: "MEDIA_MESSAGES_CHAT", columnName: "Mensagens por chat", status: false, dataType: "number", size: 220 },
    { key: "USAGE_TIME", columnName: "Tempo de uso", status: false, dataType: "string", size: 170 },
    { key: "MEDIA_USAGE_TIME", columnName: "Tempo de uso por chat", status: true, dataType: "string", size: 230 },
    { key: "LINK_CLICKS", columnName: "Cliques no link", status: true, dataType: "number", size: 150 },
    { key: "LEADS_COLLECTED", columnName: "Leads coletados", status: true, dataType: "number", size: 140 },
    { key: "SERVICE_NOTE", columnName: "Nota de atendimento", status: true, dataType: "number", size: 170 },
    { key: "RESOLUTION_RATE", columnName: "Taxa de resolução", status: true, dataType: "number", size: 180 },
    { key: "CREATED_AT", columnName: "Criado em", status: true, dataType: "string", size: 150 },
]


export function HeaderTableMetric({ setColumns, columns }: ModalColumnOrganizationTypes) {

    useEffect(() => {
        const columnsHeaderMetric = JSON.parse(localStorage.getItem("metricColumnActive") || "[]");

        if (columnsHeaderMetric.length > 0) {
            if(!columnsHeaderMetric.status) localStorage.setItem("metricColumnActive", JSON.stringify(defaultColumns))
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
                        style={{ width: `${column.size}px` }}
                        className="flex-none p-3 overflow-hidden whitespace-nowrap text-ellipsis text-sm font-bold uppercase text-center bg-primary-100 dark:bg-primary-300 text-light dark:text-primary-100 border-r border-r-light dark:border-r-primary-100"
                    >
                        {column.columnName}
                    </span>
                )
            }
        </div>
    )
};