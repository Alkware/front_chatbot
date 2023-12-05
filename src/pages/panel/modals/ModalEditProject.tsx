import { Dispatch, SetStateAction, useContext, useRef } from "react"
import { useForm } from "react-hook-form"
import { ModalContext } from "../../../context/ModalContext";
import { updateProject } from "../../../api/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListMenuModalChat } from "../components/Lists/ListMenuModalChat";
import { GeneralInformation } from "../components/TabContentForm/GeneralInformation";
import { ProductDescribe } from "../components/TabContentForm/ProductDescribe";
import { ChatSettings } from "../components/TabContentForm/ChatSettings";
import { Tracking } from "../components/TabContentForm/Tracking";
import { ProjectSchema, z } from "../../../@types/projectZodSchema";
import { ButtonsModal } from "../components/TabContentForm/ButtonsModal";
import { PopOver } from "../../../components/modal/templates/PopOver";
import { ErrorModal } from "./ErrorModal";
import { ProjectTypes } from "../../../@types/projectTypes";

type ModalEditProjectType = z.infer<typeof ProjectSchema>

interface ModalEditProject {
    project: ProjectTypes,
    setNewProject: Dispatch<SetStateAction<any>>
}

export function ModalEditProject({ project, setNewProject }: ModalEditProject) {
    const { setModalContent } = useContext(ModalContext)
    const formRef = useRef(null);

    const { handleSubmit, register, control, formState: { errors }, getValues } = useForm<ModalEditProjectType>({
        resolver: zodResolver(ProjectSchema),
        defaultValues: {
            project_name: project?.project_name,
            slug: project?.slug?.split("-")[1],
            logo: project?.logo,
            bio: project?.bio,
            call_to_action: {
                button_text: project.call_to_action[0].button_text,
                link: project.call_to_action[0].link
            },
            prompt: project?.prompt,
            describe_client: project.describe_client,
            pixel_facebook: project.pixel_facebook,
            chat_input_message: project.chat_input_message
        },
    })

    const handleUpdateProject = async (data: any) => {
        if (data && project.slug) {
            const projectUpdate = await updateProject(data, project.slug)
            console.log(projectUpdate)
            if (projectUpdate && projectUpdate.status === 200) {
                setNewProject((projects: any) => [...projects.filter((v: any) => v.id !== project.id), projectUpdate.data])
                setModalContent({
                    isOpenModal: true,
                    components: <PopOver message="Chat atualizado com sucesso" />
                })
            }
        }
    }



    return (
        <div className="w-3/4 bg-zinc-800 animate-smooth_display_left flex">


            <ListMenuModalChat ref={formRef} />


            <div className="w-full flex flex-col">


                <form
                    ref={formRef}
                    onSubmit={handleSubmit(handleUpdateProject)}
                    className="w-full h-full flex flex-col items-center px-8 relative"
                >
                    <ButtonsModal
                        project={project}
                        setNewProject={setNewProject}
                        isModalCreate={false}
                    />

                    <ErrorModal errors={errors} />

                    <GeneralInformation
                        register={register}
                        control={control}
                    />

                    <ProductDescribe
                        register={register}
                    />

                    <Tracking
                        register={register}
                    />

                    <ChatSettings
                        register={register}
                        getValues={getValues}
                        project={project}
                    />


                </form>
            </div>
        </div>
    )
};

