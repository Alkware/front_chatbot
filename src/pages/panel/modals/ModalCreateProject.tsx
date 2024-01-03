import { zodResolver } from "@hookform/resolvers/zod";
import { RefObject, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { createNewProject } from "../../../api/project";
import { ModalContext } from "../../../context/ModalContext";
import { ListMenuModalChat } from "../components/Lists/ListMenuModalChat";
import { ProjectSchema, z } from "../../../@types/projectZodSchema";
import { PopOver } from "../../../components/modal/templates/PopOver";
import { ProjectCreateTypes } from "../../../@types/Project";

type createProjectType = z.infer<typeof ProjectSchema>

interface NewProjectTypes {
    plan_management_id: string,
    setNewProject: any
}


export function ModalCreateProject({ plan_management_id, setNewProject }: NewProjectTypes) {
    const { setModalContent } = useContext(ModalContext)
    const formRef: RefObject<HTMLFormElement> = useRef(null);
    const { handleSubmit, register, reset, control, formState: { errors }, getValues } = useForm<createProjectType>({
        resolver: zodResolver(ProjectSchema)
    });

    const handleCreateProject = async (data: any) => {
        try {
            const { project_name, logo, prompt_id, bio, call_to_action, pixel_facebook, chat_input_message }: ProjectCreateTypes = data;

            const project = await createNewProject({
                project_name,
                logo,
                prompt_id,
                plan_management_id,
                bio,
                call_to_action,
                pixel_facebook,
                chat_input_message,
            });

            if (project && project.status === 201) {
                reset();
                setNewProject((v: any) => [...v, project.data])
                setModalContent({
                    isOpenModal: true,
                    components: <PopOver message="Chat criado com sucesso" />
                })
            }
        } catch (error) {
            throw new Error("Erro ao tentar criar o projeto")
        }
    }

    return (
        <div className="w-3/4 bg-zinc-800 flex  animate-smooth_display_left">

            <ListMenuModalChat ref={formRef} />

            <form
                ref={formRef}
                onSubmit={handleSubmit(handleCreateProject)}
                className="w-full h-full flex flex-col items-center relative px-8"
            >
                <ButtonsModal
                    isModalCreate={true}
                />

                <ErrorModal errors={errors} />

                <GeneralInformation
                    register={register}
                    getValues={getValues}
                />

                <ProductDescribe
                    register={register}
                    control={control}
                />

                <Tracking
                    register={register}
                />

                <ChatSettings
                    register={register}
                />

            </form>
        </div>
    )
};