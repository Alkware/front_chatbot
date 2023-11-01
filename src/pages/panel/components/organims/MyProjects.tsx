import { useContext, useState } from "react";
import { ClientContext } from "../../../../context/ClientContext";
import { LinkSimple } from "@phosphor-icons/react";
import CreateNewProject from "../molecules/CreateNewProject";

function MyProjects() {
    const { client } = useContext(ClientContext)
    const [projects, setProjects] = useState(client?.project || [])

    return (
        (client) &&
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
                    client.project.length ? (
                        <div className="w-full">

                            <h2>VENDAS:</h2>

                            <div className="w-full flex items-center gap-4">
                                {
                                    projects.map(project =>
                                        project.chat_type === "seller" &&
                                        <div
                                            key={project.slug}
                                            className="w-1/4 bg-blue_main flex flex-col items-center gap-2 py-4 cursor-pointer rounded-xl"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className={`w-[8px] h-[8px] rounded-lg ${project.is_online ? "bg-green-500" : "bg-red-500"}`}></div>
                                                <span>{project.is_online ? "Ativa" : "desativada"}</span>
                                            </div>
                                            <div className="w-[150px] h-[110px] rounded-xl overflow-hidden">
                                                <img
                                                    src={project.logo || "https://via.placeholder.com/100"}
                                                    alt="imagem do projeto"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <h2 className="text-center font-bold text-lg">{project.project_name}</h2>
                                            <div className="w-3/4 flex flex-col items-start">
                                                <h2 className="text-center">Chats abertos: 18</h2>
                                                <h2>Conversão: {Number(3 * 100 / 18).toFixed(1)}%</h2>
                                                <h2 className="text-center">Vendas: 3</h2>
                                                <a
                                                    href={`https://chat.wipzee.com/${client.user}/${project.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="underline flex gap-1 items-center"
                                                ><LinkSimple size={16} />Acessar chat </a>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                            <div className="w-full">

                                <h2>SUPORTE:</h2>
                                <div className="w-full flex items-center gap-4">
                                    {
                                        projects.map(project =>
                                            project.chat_type === "support" &&
                                            <div
                                                key={project.slug}
                                                className="w-1/4 bg-blue_main flex flex-col items-center gap-2 py-4 cursor-pointer rounded-xl"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-[8px] h-[8px] rounded-lg ${project.is_online ? "bg-green-500" : "bg-red-500"}`}></div>
                                                    <span>{project.is_online ? "Ativa" : "desativada"}</span>
                                                </div>
                                                <div className="w-[150px] h-[110px] rounded-xl overflow-hidden">
                                                    <img
                                                        src={project.logo || "https://via.placeholder.com/100"}
                                                        alt="imagem do projeto"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <h2 className="text-center font-bold text-lg">{project.project_name}</h2>
                                                <div className="w-3/4 flex flex-col items-start">
                                                    <h2 className="text-center">Chats abertos: 18</h2>
                                                    <h2>Conversão: {Number(3 * 100 / 18).toFixed(1)}%</h2>
                                                    <h2 className="text-center">Vendas: 3</h2>
                                                    <a
                                                        href={`https://chat.wipzee.com/${client.user}/${project.slug}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="underline flex gap-1 items-center"
                                                    ><LinkSimple size={16} />Acessar chat </a>
                                                </div>
                                            </div>
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