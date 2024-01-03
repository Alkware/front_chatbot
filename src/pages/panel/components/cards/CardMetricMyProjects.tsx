import { useNavigate } from "react-router-dom";
import { ProjectTypes } from "../../../../@types/projectTypes";
import { eventManager } from "../../../../functions/events";

export function CardMetricMyProjects({ project }: { project: ProjectTypes }) {
    const navigate = useNavigate();

    const handleDisplayMetric = ()=>{
        navigate("/panel?tab=1")
    }

    return (
        <div 
            className="w-full flex flex-col justify-center"
            onClick={handleDisplayMetric}
        >
            <h2>Chats abertos: {eventManager(project).getNumberChat}</h2>
            <h2>mensagens recebidas: {eventManager(project).getInputMessages}</h2>
        </div>
    )
};