import { useContext, useState } from "react";
import { ClientContext } from "../../../../context/ClientContext";
import CreateNewProject from "./CreateNewProject";
import { CardProject } from "../cards/CardProject";
import { ProjectTypes } from "../../../../@types/projectTypes";


function MyProjects() {
    const { client } = useContext(ClientContext)
    const [projects, setProjects] = useState<ProjectTypes[]>(client?.plan_management?.project || [])

    return (
        client &&
        <div className="w-full flex justify-center p-4">

            <div className="w-4/5 flex flex-col gap-8">
                <div className="w-full flex justify-between items-center">
                    <h2 className="text-xl">Meus chats:</h2>
                    <CreateNewProject
                        setNewProject={setProjects}
                        client_id={client.id}
                    />
                </div>

                {
                    projects.length ? (
                        <div className="w-full flex flex-col gap-4">

                            <h2>VENDAS:</h2>
                            <div className="w-full flex items-center gap-4">

                                {
                                    projects.map((project: ProjectTypes) =>
                                        project.chat_type === "seller" &&
                                        <CardProject
                                            setNewProject={setProjects}
                                            key={project.slug}
                                            project={project}
                                        />
                                    )
                                }
                            </div>


                            <div className="w-full">

                                <h2>SUPORTE:</h2>
                                <div className="w-full flex items-center gap-4">
                                    {
                                        projects.map((project: ProjectTypes) =>
                                            project.chat_type === "support" &&
                                            <CardProject key={project.id} project={project} setNewProject={setProjects} />
                                        )
                                    }
                                </div>

                            </div>

                        </div>
                    )
                        :
                        <h2 className="py-8 font-bold">
                            Você ainda não possui nenhum chat, clique em "Novo chat" para começar seu primeiro projeto.
                        </h2>
                }

            </div>

        </div>
    )
}

export default MyProjects;