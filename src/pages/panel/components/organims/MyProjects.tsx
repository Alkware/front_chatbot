import { useContext, useEffect, useState } from "react";
import { ClientContext } from "../../../../context/ClientContext";
import CreateNewProject from "../molecules/CreateNewProject";
import { CardProject } from "../molecules/CardProject";
import { findAllProjectsById } from "../../../../api/project";



function MyProjects() {
    const { client } = useContext(ClientContext)
    const [projects, setProjects] = useState<any>([])

    useEffect(() => {
        (async () => {
            if (client) {
                const response = await findAllProjectsById(client?.id);
                if (response) {
                    const projects: ProjectTypes = response.data
                    console.log(projects)
                    setProjects(projects)
                }
            }
        })();
    }, [])

    return (
        (projects && client) &&
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
                                            <CardProject project={project} />
                                        )
                                    }
                                </div>

                            </div>

                        </div>
                    ) : <h1 className="py-8 font-bold">Você ainda não possui nenhum chat, clique em "Novo chat" para começar seu primeiro projeto.</h1>
                }

            </div>

        </div>
    )
}

export default MyProjects;