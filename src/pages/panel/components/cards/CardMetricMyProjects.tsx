import { ProjectTypes } from "../../../../@types/projectTypes";
import { eventManager } from "../../../../functions/events";

export function CardMetricMyProjects({ project }: { project: ProjectTypes }) {

    return (
        <div className="w-full flex flex-col justify-center">
            <h2>Chats abertos: {eventManager(project).getNumberChat}</h2>
            <h2>Wips usados: {eventManager(project).getTotalWips}</h2>
            <h2>Valor gasto: {eventManager(project).getAmountSpentInReal}</h2>
        </div>
    )
};