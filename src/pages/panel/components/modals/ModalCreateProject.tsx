import { zodResolver } from "@hookform/resolvers/zod";
import { RefObject, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createNewProject } from "../../../../api/project";
import { ModalContext } from "../../../../context/ModalContext";
import Button from "../../../../components/button/Button";

const createProjectSchema = z.object({
    project_name: z.string().min(1, "O nome do projeto não pode ser vazio").refine(value => /^[a-zA-Z0-9\s]*$/.test(value), {
        message: 'Não são permitidos caracteres especiais.',
      }),
    bio: z.string().min(1, "Bio não pode estar vazia"),
    logo: z.string().min(1, "Logo não pode estar vazio"),
    prompt: z.string().min(1, "Logo não pode estar vazio"),
})

type createProjectType = z.infer<typeof createProjectSchema>

interface NewProjectTypes {
    client_id: string,
    setNewProject: any
}


export function ModalCreateProject({ client_id, setNewProject }: NewProjectTypes) {
    const { setModalContent } = useContext(ModalContext)
    const formRef: RefObject<HTMLFormElement> = useRef(null);
    const { handleSubmit, register, reset, formState: { errors } } = useForm<createProjectType>({
        resolver: zodResolver(createProjectSchema)
    })

    const handleCreateProject = async (data: any) => {
        try {
            const { project_name, logo, prompt, bio }: ProjectTypes = data;

            const project = await createNewProject({ project_name, logo, prompt, client_id, bio });
            if (project && project.status === 201) {
                reset();
                setNewProject((v: any) => [...v, project.data])
                alert("projeto criado com sucesso!")
                setModalContent({
                    isOpenModal: false,
                })
            }
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao tentar criar o projeto")
        }

    }

    return (
        <div className="w-3/4">
            <form
                ref={formRef}
                onSubmit={handleSubmit(handleCreateProject)}
                className="w-full h-full px-12 bg-black flex flex-col items-center justify-center gap-4 animate-smooth_display_left"
            >
                <input
                    type="text"
                    placeholder="Nome do projeto"
                    {...register("project_name")}
                />
                {errors.project_name?.message}
                <input
                    type="text"
                    placeholder="Imagem do seu projeto"
                    {...register("logo")}
                />
                {errors.logo?.message}
                <input
                    type="text"
                    placeholder="Digite uma bio para seu perfil"
                    {...register("bio")}
                />
                {errors.bio?.message}
                {/* <select name="" id="">
                                <option value="seller">seller</option>
                                <option value="support">support</option>
                                <option value="form">form</option>
                            </select> */}
                <textarea
                    placeholder="Crie seu prompt aqui"
                    {...register("prompt")}
                />
                {errors.prompt?.message}
                <Button>Criar projeto</Button>
                <span
                    className="underline cursor-pointer"
                    onClick={() => setModalContent({ isOpenModal: false })}
                >Descartar</span>
            </form>
        </div>
    )
};