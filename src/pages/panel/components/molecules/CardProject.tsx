import { EditProject } from "./EditProject";

export function CardProject({ project, setNewProject }: any) {

    return (
        <div
            key={project.slug}
            className="w-1/4 bg-blue_main relative flex flex-col items-center gap-2 py-4 cursor-pointer rounded-xl"
        >
            <div className="absolute top-0 right-0 p-1 group bg-white/20 rounded-tr-xl rounded-bl-xl">
                <EditProject 
                    project={project}
                    setNewProject={setNewProject}
                />
            </div>

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
                    href={`https://chat.wipzee.com/${project.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline flex gap-1 items-center"
                >Acessar chat </a>
            </div>

        </div>
    )
};