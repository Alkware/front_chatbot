import { useState } from "react";
import Button from "../../../../components/button/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewProject } from "../../../../api/project";
import { Form } from "../../../../components/form/Form";
import { Background } from "../../../../components/background/Background";
import { Input } from "../../../../components/input/Input";
import { Textarea } from "../../../../components/textarea/Textarea";

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
            if (project && project.status === 201) {
                alert("projeto criado com sucesso!")
                setNewProject((v: any) => [...v, project.data])
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
                <Background>
                    <div className="w-3/4">
                        <Form onSubmit={handleSubmit(handleCreateProject)}>
                            <Input
                                type="text"
                                placeholder="Nome do projeto"
                                {...register("project_name")}
                            />
                            {errors.project_name?.message}
                            <Input
                                type="text"
                                placeholder="crie um slug"
                                {...register("slug")}
                            />
                            {errors.slug?.message}
                            <Input
                                type="text"
                                placeholder="Imagem do seu projeto"
                                {...register("logo")}
                            />
                            {errors.logo?.message}
                            {/* <select name="" id="">
                                <option value="seller">seller</option>
                                <option value="support">support</option>
                                <option value="form">form</option>
                            </select> */}
                            <Textarea
                                placeholder="Crie seu prompt aqui"
                                {...register("prompt")}
                            />
                            {errors.prompt?.message}
                            <Button>Criar projeto</Button>
                            <span
                                className="underline cursor-pointer"
                                onClick={() => setContainerNewProject(false)}
                            >Descartar</span>
                        </Form>
                    </div>
                </Background>
            }
        </>
    )
}

export default CreateNewProject;