import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { Project } from "../../../../../../../../../../../../@types/Project";
import { ListMenuModalChat } from "../Lists/ListMenuModalChat";
import { GeneralInformation } from "../../../../../../../../../../../../components/Forms/ChatForm/components/GeneralInformation";
import { ProductDescribe } from "../../../../../../../../../../../../components/Forms/ChatForm/components/ProductDescribe";
import { Tracking } from "../../../../../../../../../../../../components/Forms/ChatForm/components/Tracking";
import { ChatSettings } from "../../../../../../../../../../../../components/Forms/ChatForm/components/ChatSettings";
import { SimulatorChat } from "../../../../../../../../../../../../components/SimulatorChat";


interface ModalEditProject {
    project: Project,
    setNewProject: Dispatch<SetStateAction<any>>
}

export function ModalEditProject({ project, setNewProject }: ModalEditProject) {
    const containerFormRef = useRef(null);
    const [access, setAccess] = useState<boolean>();

    useEffect(() => {
        const chat = {
            project_name: project.project_name,
            bio: project.bio,
            logo: project.logo,
            prompt_id: project.prompt.id,
            chat_input_message: project.chat_input_message,
            call_to_action: project.call_to_action,
            pixel_facebook: project.pixel_facebook,
            slug: project.slug
        }

        localStorage.setItem("chat", JSON.stringify(chat))
        setAccess(true)
    }, [])

    return (
        access &&
        <div className="w-[90vw] h-[70vh] min-h-[450px] min-w-[700px] flex">

            <ListMenuModalChat
                ref={containerFormRef}
                project={project}
                setNewProject={setNewProject}
            />

            <div 
                className="w-full flex bg-light dark:bg-dark rounded-xl"
                ref={containerFormRef}
            >
                <div className="w-4/5 p-4 flex flex-col">

                    <GeneralInformation />

                    <ProductDescribe />

                    <Tracking />

                    <ChatSettings
                        project={project}
                    />
                </div>

                <div
                    className="w-1/5 min-w-[320px] flex items-start pt-4 justify-center"
                >
                    <SimulatorChat />
                </div>
            </div>

        </div>
    )
};

