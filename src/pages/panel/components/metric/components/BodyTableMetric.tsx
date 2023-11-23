import { useContext, useEffect, useState } from "react"
import { ClientContext } from "../../../../../context/ClientContext"
import { Columns } from "../../../../../@types/Column.types"
import { ProjectTypes } from "../../../../../@types/projectTypes"
import { formatLongNumber } from "../../../../../functions/formatLongNumber"
import { getDollar } from "../../../../../functions/convertDollarToReal"

export function BodyTableMetric({ columns }: { columns: Columns[] }) {
    const { client } = useContext(ClientContext)
    const projects = client?.project as ProjectTypes[]
    const [dollar, setDollar] = useState();

    useEffect(() => {
        (async () => {
            let dollar = await getDollar();
            setDollar(dollar)
        })()
    }, [])

    const getValueColumn = (project: ProjectTypes, column: Columns) => {

        const output = project.metric?.chat_event.
            reduce((total, chat) => total + chat.used_tokens.
                reduce((total, tokens) => total + tokens.output, 0), 0) || 0;

        const input = project.metric?.chat_event.
            reduce((total, chat) => total + chat.used_tokens.
                reduce((total, tokens) => total + tokens.input, 0), 0) || 0;

        switch (column.key) {
            case "CAT": {
                return project.metric?.chat_event.reduce((total, chats) => total + chats.open_chat.length, 0)
            }
            case "CAU": {
                const removeDuplicateGuest = project.metric?.chat_event.filter((obj, index, self) =>
                    index === self.findIndex((el) => el["guest_id"] === obj['guest_id'])
                ) || [];
                return removeDuplicateGuest.length
            }
            case "TOKEN_INPUT": {
                return formatLongNumber(input)
            }
            case "TOKEN_OUTPUT": {

                return formatLongNumber(output)
            }
            case "TOKEN_TOTAL": {
                return formatLongNumber(output + input)
            }
            case "USED_REAL": {
                const usedDollarToken = (input * (0.03 / 1000)) + (output * (0.06 / 1000));
                var valueInReal = usedDollarToken;
                return dollar ? "R$" + (dollar * valueInReal).toFixed(2).replace(".", ",") : 0
            }
            default:
                return 0
        }
    }


    return (
        projects &&
        <div className="overflow-auto border-4 border-zinc-800">
            {
                projects.map((project: any) =>
                    <div key={project.id} className="w-full border-[1px] border-transparent border-b-zinc-800 flex hover:bg-zinc-900 transition-colors duration-100">
                        {
                            columns.map((column: Columns, index: number) =>
                                column.status &&
                                <h2 key={column.columnName} className="w-[200px] flex gap-2 justify-center items-center text-center border-[1px] border-transparent border-r-black/20 p-2">
                                    {
                                        index === 0 ?
                                            <>
                                                <div className={`w-[8px] h-[8px] ${project.is_online ? "bg-green-700" : "bg-red-700"} rounded-full`}></div>
                                                <span>{project.is_online ? "Ativo" : "Desativado"}</span>
                                            </>
                                            : index === 1 ?
                                                project.project_name
                                                :
                                                getValueColumn(project, column)
                                    }
                                </h2>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
};