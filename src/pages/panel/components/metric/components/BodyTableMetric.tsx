import { useContext } from "react"
import { ClientContext } from "../../../../../context/ClientContext"
import { Columns } from "../../../../../@types/Column.types"
import { ProjectTypes } from "../../../../../@types/projectTypes"
import { HeaderTableMetric } from "./HeaderTableMetric"
import { eventManager } from "../../../../../functions/events"

export function BodyTableMetric({ columns, setColumns }: { columns: Columns[], setColumns: any}) {
    const { client } = useContext(ClientContext)
    const projects = (client?.plan_management?.project as unknown) as ProjectTypes[]

    
    const getValueColumn = (project: ProjectTypes, column: Columns) => {
        switch (column.key) {
            case "CAT":  return eventManager(project).getNumberChat;
            case "CAU": return eventManager(project).getNumberUniqueChat;
            case "TOKEN_INPUT": return eventManager(project).getInputTokens;
            case "TOKEN_OUTPUT":return eventManager(project).getOutputTokens;
            case "TOKEN_TOTAL": return eventManager(project).getTotalTokens
            case "WIPS_INPUT": return eventManager(project).getInputTokens;
            case "WIPS_OUTPUT": return eventManager(project).getOutputWips;
            case "WIPS_TOTAL": return eventManager(project).getTotalWips;
            case "USED_REAL": return eventManager(project).getAmountSpentInReal;
            default: return 0
        }
    }


    return (
        <div className="overflow-auto border-4 border-zinc-800 rounded-t-2xl mt-8">
            <HeaderTableMetric setColumns={setColumns} columns={columns}/>
            {
                projects ?
                projects.map((project: any) =>
                    <div key={project.id} className="w-full border-[1px] border-transparent border-b-zinc-800 flex hover:bg-zinc-900 transition-colors duration-100">
                        {
                            columns.map((column: Columns, index: number) =>
                                column.status &&
                                <h2 key={column.columnName} className="w-full min-w-[200px] flex gap-2 justify-center items-center text-center border-[1px] border-transparent border-r-black/20 p-2">
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
                :
                <h2 className="text-center p-4">Você ainda não criou nenhum chat, clique em "Meus chats" , depois criar "Novo chat".</h2>
            }
        </div>
    )
};