import { Dispatch, RefObject, SetStateAction, useContext, useRef } from "react"
import { useForm } from "react-hook-form"
import Button from "../../../../components/button/Button";
import { ModalContext } from "../../../../context/ModalContext";
import { deleteProject, updateProject } from "../../../../api/project";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ModalEditProjectSchema = z.object({
    project_name: z.string().min(1, "O nome do projeto não pode ser vazio").refine(value => /^[a-zA-Z0-9\s]*$/.test(value), {
        message: 'Não são permitidos caracteres especiais.',
    }),
    slug: z.string().min(1, "The slug não pode estar vazia").refine(value => /^[a-zA-Z0-9\s]*$/.test(value), {
        message: 'Não são permitidos caracteres especiais.',
    }),
    bio: z.string().min(1, "Bio não pode estar vazia"),
    logo: z.string().min(1, "Logo não pode estar vazio"),
    prompt: z.string().min(1, "Logo não pode estar vazio"),
})

type ModalEditProjectType = z.infer<typeof ModalEditProjectSchema>

interface ModalEditProjectTypes {
    project: ProjectTypes,
    setNewProject: Dispatch<SetStateAction<any>>
}

export function ModalEditProject({ project, setNewProject }: ModalEditProjectTypes) {
    const { setModalContent } = useContext(ModalContext)
    const spanSlugRef: RefObject<HTMLSpanElement> = useRef(null);
    const { handleSubmit, register, formState: { errors }, getValues } = useForm<ModalEditProjectType>({
        resolver: zodResolver(ModalEditProjectSchema),
        defaultValues: {
            project_name: project?.project_name,
            slug: project?.slug?.split("-")[1],
            logo: project?.logo,
            bio: project?.bio,
            prompt: project?.prompt
        },
    })


    const handleUpdateProject = async (data: any) => {
        if (data && project.slug) {
            const projectUpdate = await updateProject(data, project.slug)
            if (projectUpdate && projectUpdate.status === 200) {
                setNewProject((projects: any) => [...projects.filter((v: any) => v.id !== project.id), projectUpdate.data])
                alert("Dados atualizados com sucesso")
                setModalContent({ isOpenModal: false })
            }
        }
    }

    const handleDeleteProject = async () => {
        const confirmDelete = confirm("Você tem certeza que deseja excluir esse chat?")
        if (confirmDelete && project && project.id) {
            const deleted = await deleteProject(project.id);
            if (deleted && deleted.status === 200) {
                setNewProject((projects: any) => projects.filter((v: any) => v.id !== project.id))
                alert("Chat deletado com sucesso")
                setModalContent({ isOpenModal: false })
            }
        }
    }

    const handleUpdateSlugValue = (e: any) => {
        e.preventDefault();
        if (spanSlugRef.current) {
            const value = getValues("slug")
            value && (spanSlugRef.current.textContent = value)
        }
    }

    return (
        <div className="w-3/4 px-12 bg-black animate-smooth_display_left flex flex-col justify-center gap-8">
            <h2 className="text-center text-2xl">Edite e salve suas novas alterações</h2>
            <form
                onSubmit={handleSubmit(handleUpdateProject)}
                className="w-full flex flex-col items-center justify-center gap-4 "
            >
                <input
                    type="text"
                    placeholder="Nome do projeto"
                    data-type="project_name"
                    {...register("project_name")}
                />
                {errors.project_name?.message}
                <div className="w-full flex gap-4">
                    <div className="flex flex-col">
                        <input
                            type="text"
                            placeholder="crie um slug"
                            data-type="slug"
                            onKeyDown={(e) => e.code === "Enter" && handleUpdateSlugValue(e)}
                            {...register("slug")}
                        />
                        {errors.slug?.message}
                    </div>
                    <div className="flex flex-col">
                        <p>sua slug ficará assim: </p>
                        <p className="text-zinc-300/80">https://chat.wipzee.com/{project?.slug?.split("-")[0]}- <span ref={spanSlugRef}>{getValues("slug")}</span> </p>
                    </div>
                </div>

                <input
                    type="text"
                    placeholder="Imagem do seu projeto"
                    data-type="logo"
                    {...register("logo")}
                />
                {errors.logo?.message}

                <input
                    type="text"
                    placeholder="Digite a bío do seu negocio"
                    data-type="bio"
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
                    data-type="prompt"
                    {...register("prompt")}
                />
                {errors.prompt?.message}

                <Button>Salvar</Button>
                <span
                    className="underline cursor-pointer"
                    onClick={() => setModalContent({ isOpenModal: false })}
                >Descartar</span>
                <span
                    className="cursor-pointer text-red-600/50 hover:text-red-600 transition-colors duration-200"
                    onClick={handleDeleteProject}
                >Excluir chat</span>
            </form>
        </div>
    )
};