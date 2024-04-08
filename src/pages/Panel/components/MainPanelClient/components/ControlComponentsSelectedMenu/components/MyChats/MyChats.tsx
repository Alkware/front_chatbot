import { useContext, useState } from "react";
import { ButtonCreateChat } from "./components/CreateNewProject/CreateNewProject";
import { ClientContext } from "../../../../../../../../context/ClientContext";
import { Project } from "../../../../../../../../@types/Project";
import { Container } from "../../../../../../../../components/Container/Container";
import { CardChat } from "./components/CardChat/CardChat";
import { Tutorial } from "../../../../../../../../components/Tutorial/Tutorial";

function MyChats() {
    const { client } = useContext(ClientContext)
    const [projects, setProjects] = useState<Project[]>(client?.plan_management ? client.plan_management.project : [])

    return (
        client &&
        <>
            <Container title="Meus chats">
                <div className="w-4/5 px-8 pb-6 flex flex-col gap-8 z-50">
                    <div className="w-full flex justify-end items-center">
                        <ButtonCreateChat
                            plan_management_id={client?.plan_management?.id}
                        />
                    </div>

                    {
                        projects.length ? (
                            <div className="w-full flex flex-col gap-4">

                                <div className="w-full flex items-center gap-4">
                                    {
                                        projects.map((project: Project) =>
                                            <CardChat
                                                key={project.id}
                                                project={project}
                                                setNewProject={setProjects}
                                                prompts={client.plan_management?.prompt}
                                            />
                                        )
                                    }
                                </div>

                            </div>
                        )
                            :
                            <h2 className="py-8 font-bold">
                                Você ainda não possui nenhum chat, clique em "Novo chat" para começar seu primeiro projeto.
                            </h2>
                    }

                </div>

                <Tutorial
                    tutorialId="create_chat"
                />
            </Container>
        </>
    )
}

export default MyChats;