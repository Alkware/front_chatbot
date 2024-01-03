import { useContext, useState } from "react";
import { ClientContext } from "../../../../context/ClientContext";
import CreateNewProject from "./CreateNewProject";
import { CardProject } from "../cards/CardProject";
import { ProjectTypes } from "../../../../@types/projectTypes";
import { Container } from "../../../../components/Container/Container";


function MyProjects() {
    const { client } = useContext(ClientContext)
    const [projects, setProjects] = useState<ProjectTypes[]>(client?.plan_management?.project || [])

    return (
        client &&
        <Container title="Meus chats">

            <div className="w-4/5 flex flex-col gap-8">
                <div className="w-full flex justify-end items-center">
                    <CreateNewProject
                        plan_management_id={client?.plan_management?.id}
                    />
                </div>

                {
                    projects.length ? (
                        <div className="w-full flex flex-col gap-4">

                            <div className="w-full flex items-center gap-4">
                                {
                                    projects.map((project: ProjectTypes) =>
                                        <CardProject 
                                            key={project.id}
                                            project={project}
                                            setNewProject={setProjects}
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
        </Container>
    )
}

export default MyProjects;