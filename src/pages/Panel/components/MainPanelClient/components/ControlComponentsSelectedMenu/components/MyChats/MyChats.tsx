import { useContext, useState } from "react";
import { ButtonCreateChat } from "./components/CreateNewProject/CreateNewProject";
import { ClientContext } from "../../../../../../../../context/ClientContext";
import { Project } from "../../../../../../../../@types/Project";
import { Container } from "../../../../../../../../components/Container/Container";
import { CardChat } from "./components/CardChat/CardChat";
import { MAX_CONTAINER_TO_CREATE_CHAT } from "../../../../../../../../variables/variables";
import { FaLock } from "react-icons/fa";
import { ModalContext } from "../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../components/modal/templates/PopOver";

function MyChats() {
    const { client } = useContext(ClientContext)
    const { setModalContent } = useContext(ModalContext)
    const [projects, setProjects] = useState<Project[]>(client?.plan_management ? client.plan_management.project : [])
    const limitChats = Array(MAX_CONTAINER_TO_CREATE_CHAT).fill(0)

    const handleLockChat = () => [
        setModalContent({
            componentName: "modal_locked_chat",
            components: <PopOver
                componentName="modal_locked_chat"
                message="Esse slot não está disponível, crie seu chat em um slot disponível ou contrate um plano com mais slot disponível."
                type="WARNING"
            />
        })
    ]

    return (
        client &&
        <Container title="Meus chats">
            <div className="w-full flex-wrap flex justify-center p-4 gap-8">
                {
                    limitChats.map((_, index) =>
                        //Verifica quantos slots o usuário tem disponivel e o resto que não está disponivel ficará com um cadeado.
                        (client.plan_management?.plan && index < Number(client.plan_management.plan.max_projects.default)) ?
                            (
                                <div
                                    key={index}
                                    className="w-[90%] xs:w-1/2 md:w-1/3 lg:w-1/4 md:max-w-[300px]"
                                >
                                    {projects[index]?.id ?
                                        <CardChat
                                            key={projects[index].id}
                                            project={projects[index]}
                                            setNewProject={setProjects}
                                            ai={client.plan_management?.artificial_intelligence}
                                        />
                                        :

                                        <ButtonCreateChat
                                            plan_management_id={client?.plan_management?.id}
                                            projects={projects}
                                            index={index}
                                        />
                                    }
                                </div>
                            )
                            :
                            (
                                <div
                                    key={index}
                                    className="w-[90%] xs:w-1/2 md:w-1/3 lg:w-1/4 min-h-[200px] md:max-w-[300px] flex opacity-30 cursor-not-allowed justify-center items-center rounded-xl border border-primary-100 bg-primary-300 hover:bg-primary-200 text-xl"
                                    onClick={handleLockChat}
                                >
                                    <FaLock
                                        className="py-3 text-5xl teste"
                                    />
                                </div>
                            )
                    )
                }
            </div >
        </Container>
    )
}

export default MyChats;