import { Dispatch, SetStateAction, useRef } from "react"
import { ListMenuModalChat } from "../components/Lists/ListMenuModalChat";
import { Project } from "../../../@types/Project";
import { ChatForm } from "../../../components/Forms/ChatForm";

interface ModalEditProject {
    project: Project,
    setNewProject: Dispatch<SetStateAction<any>>
}

export function ModalEditProject({ project, setNewProject }: ModalEditProject) {
    const containerFormRef = useRef(null);

    return (
        <div className="w-[90vw] h-[70vh] min-h-[450px] min-w-[700px] flex">

            <ListMenuModalChat
                ref={containerFormRef}
                project={project}
                setNewProject={setNewProject}
            />

            <ChatForm 
                isCreateChat={false}
                project={project}
            />

        </div>
    )
};

