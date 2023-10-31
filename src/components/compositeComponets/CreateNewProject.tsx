import { useState } from "react";
import Button from "../basicComponents/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewProject } from "../../api/project";

const createProjectSchema = z.object({
    project_name: z.string().min(1, "O nome do projeto não pode ser vazio"),
    slug: z.string().min(1, "slug não pode estar vazio").refine(data => /^[a-zA-Z0-9-]*$/.test(data), {
        message: `O slug só pode conter letras, números e o caracter " - ". Ex: minha-loja`
    }),
    logo: z.string().min(1, "Logo não pode estar vazio"),
    prompt: z.string().min(1, "Logo não pode estar vazio"),
})


type createProjectType = z.infer<typeof createProjectSchema>
interface NewProjectTypes {
    client_id: string,
    setNewProject: any
}


function CreateNewProject({ client_id, setNewProject }: NewProjectTypes) {
    const [containerNewProject, setContainerNewProject] = useState(false)
    const { handleSubmit, register, formState: { errors } } = useForm<createProjectType>({
        resolver: zodResolver(createProjectSchema)
    })

    const handleCreateProject = async (data: any) => {
        try {
            const { project_name, slug, logo, prompt }: ProjectTypes = data;

            const project = await createNewProject({ project_name, slug, logo, prompt, client_id });
            if(project && project.status === 201){
                alert("projeto criado com sucesso!")
                setNewProject((v:any) => [...v, project.data])
                setContainerNewProject(false)
            }
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao tentar criar o projeto")
        }

    }

    return (
        <>
            <Button onClick={() => setContainerNewProject(true)}>Novo chat</Button>

            {
                containerNewProject &&
                <div
                    className="w-full h-full bg-black/30 absolute top-0 right-0 flex justify-end "
                >
                    <form
                        className="w-3/4 h-full bg-black flex flex-col items-center justify-center gap-4"
                        onSubmit={handleSubmit(handleCreateProject)}
                    >
                        <input
                            type="text"
                            placeholder="Nome do projeto"
                            {...register("project_name")}
                        />
                        {errors.project_name?.message}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="crie um slug"
                                {...register("slug")}
                            />
                        </div>
                        {errors.slug?.message}
                        <input
                            type="text"
                            placeholder="Imagem do seu projeto"
                            {...register("logo")}
                        />
                        {errors.logo?.message}
                        <select name="" id="">
                            <option value="seller">seller</option>
                            <option value="support">support</option>
                            <option value="form">form</option>
                        </select>
                        <textarea
                            cols={30}
                            rows={10}
                            placeholder="Crie seu prompt aqui"
                            {...register("prompt")}
                        ></textarea>
                        {errors.prompt?.message}
                        <Button>Criar projeto</Button>
                        <span
                            className="underline cursor-pointer"
                            onClick={() => setContainerNewProject(false)}
                        >Descartar</span>
                    </form>
                </div>
            }
        </>
    )
}

export default CreateNewProject;