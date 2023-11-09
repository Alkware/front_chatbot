import { Dispatch, SetStateAction, useContext, useRef } from "react"
import { useForm } from "react-hook-form"
import Button from "../../../components/button/Button";
import { ModalContext } from "../../../context/ModalContext";
import { deleteProject, updateProject } from "../../../api/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListMenuModalChat } from "../components/Lists/ListMenuModalChat";
import { GeneralInformation } from "../components/TabContentForm/GeneralInformation";
import { ProductDescribe } from "../components/TabContentForm/ProductDescribe";
import { ChatSettings } from "../components/TabContentForm/ChatSettings";
import { Tracking } from "../components/TabContentForm/Tracking";
import { ProjectSchema, z } from "../../../@types/projectZodSchema";

type ModalEditProjectType = z.infer<typeof ProjectSchema>

interface ModalEditProjectTypes {
    project: ProjectTypes,
    setNewProject: Dispatch<SetStateAction<any>>
}

export function ModalEditProject({ project, setNewProject }: ModalEditProjectTypes) {
    const { setModalContent } = useContext(ModalContext)
    const formRef = useRef(null);

    const { handleSubmit, register, formState: { errors }, getValues } = useForm<ModalEditProjectType>({
        resolver: zodResolver(ProjectSchema),
        defaultValues: {
            project_name: project?.project_name,
            slug: project?.slug?.split("-")[1],
            logo: project?.logo,
            bio: project?.bio,
            call_to_action: {
                button_name: project.call_to_action[0].button_name,
                link: project.call_to_action[0].link
            },
            prompt: project?.prompt,
            describe_client: project.describe_client,
            pixel_facebook: project.pixel_facebook
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

    return (
        <div className="w-3/4 bg-zinc-800 animate-smooth_display_left flex">


            <div className="w-1/4 max-w-[250px] min-w-[150px] h-full border-r-[1px] border-r-zinc-500 flex flex-col justify-between">
                <ListMenuModalChat ref={formRef} />

            </div>


            <div className="w-full flex flex-col">

                <form
                    ref={formRef}
                    onSubmit={handleSubmit(handleUpdateProject)}
                    className="w-full h-full flex flex-col items-center px-8 relative"
                >

                    <GeneralInformation
                        register={register}
                        errors={errors}
                    />

                    <ProductDescribe
                        register={register}
                        errors={errors}
                    />

                    <Tracking
                        register={register}
                        errors={errors}
                    />

                    <ChatSettings
                        register={register}
                        errors={errors}
                        getValues={getValues}
                        project={project}
                    />

                    <div className="w-full bg-zinc-500 pb-8 mt-12 flex flex-col justify-around absolute bottom-0">
                        <Button customClass="rounded-none">Salvar</Button>
                        <span
                            className="underline cursor-pointer w-full text-center hover:bg-zinc-400 py-2"
                            onClick={() => setModalContent({ isOpenModal: false })}
                        >Descartar</span>
                        <span
                            className="cursor-pointer text-red-600/50 hover:bg-red-100 py-2 transition-colors duration-200 w-full text-center"
                            onClick={handleDeleteProject}
                        >Excluir chat</span>
                    </div>
                </form>
            </div>
        </div>
    )
};

