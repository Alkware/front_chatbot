import { Dispatch, SetStateAction } from "react"
import { HeaderTableMetric } from "../HeaderTableMetric/HeaderTableMetric"
import { useSearchParams } from "react-router-dom"
import { Columns } from "../../../../../../../../../../@types/Column.types";
import { PlanManagement } from "../../../../../../../../../../@types/planManagement";
import { eventManager } from "../../../../../../../../../../functions/events";

interface BodyTableMetric {
    columns: Columns[],
    setColumns: Dispatch<SetStateAction<Columns[]>>,
    planManagement?: PlanManagement
}

export function TableMetric({ columns, setColumns, planManagement }: BodyTableMetric) {
    const [params] = useSearchParams();
    const filterDays = params.get("filter_time_metric") as unknown as number;


    return (
        <div className="w-[95%] md:w-[70vw] md:h-[40vh] self-center rounded-xl overflow-x-auto">

            <HeaderTableMetric setColumns={setColumns} columns={columns} />

            <div className="flex flex-col">
                {
                    !!planManagement?.project.length ?
                        planManagement.project.map((project: any) =>
                            <div
                                key={project.id}
                                className="flex-none flex"
                            >
                                {
                                    columns.map((column: Columns, index: number) =>
                                        column.status &&
                                        <span
                                            key={column.columnName}
                                            style={{ width: `${column.size}px` }}
                                            className="flex-none text-ellipsis overflow-hidden whitespace-nowrap text-center border border-primary-100/30 p-2"
                                        >
                                            {
                                                index === 0 ?
                                                    <div className="w-full flex justify-center items-center gap-2">
                                                        <div className={`w-[8px] h-[8px] ${project.is_online ? "bg-green-700" : "bg-red-700"} rounded-full`}></div>
                                                        <span>{project.is_online ? "Ativo" : "Desativado"}</span>
                                                    </div>
                                                    : index === 1 ?
                                                        project.project_name
                                                        :
                                                        eventManager(project, filterDays)[column.key]
                                            }
                                        </span>
                                    )
                                }
                            </div>
                        )

                        :
                        <h2 className="text-center p-4 text-xs">Você não tem nenhuma chat criado, clique em "Meus chats" , depois criar "Novo chat".</h2>
                }
            </div>
            < div
                data-hasproject={!!planManagement?.project.length}
                className="flex-none flex data-[hasproject]:hidden"
            >
                {
                    columns.map((column: Columns, index) =>
                        (column.status) &&
                        <div
                            key={column.key}
                            style={{ width: `${column.size}px` }}
                            className="flex-none p-2 flex justify-center items-center gap-2"
                        >
                            {
                                index === 1 ?
                                    <span className="w-full font-bold text-primary-100 text-xl text-center">TOTAL</span>
                                    :
                                    column.dataType === "number" ?
                                        <span className="w-full font-bold text-primary-100 text-xl text-center">{
                                            planManagement?.project.reduce((total, project) =>
                                                total + Number(eventManager(project, filterDays)[column.key]), 0)
                                        }</span>
                                        :
                                        <span className="w-full text-primary-100 text-xl text-center">-</span>

                            }
                        </div>
                    )
                }
            </div>
        </div >
    )
};