import { zodResolver } from "@hookform/resolvers/zod";
import { RefObject, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { createNewProject } from "../../../api/project";
import { ModalContext } from "../../../context/ModalContext";
import Button from "../../../components/button/Button";
import { ListMenuModalChat } from "../components/Lists/ListMenuModalChat";
import { GeneralInformation } from "../components/TabContentForm/GeneralInformation";
import { ProductDescribe } from "../components/TabContentForm/ProductDescribe";
import { Tracking } from "../components/TabContentForm/Tracking";
import { ChatSettings } from "../components/TabContentForm/ChatSettings";
import { ProjectSchema, z } from "../../../@types/projectZodSchema";

type createProjectType = z.infer<typeof ProjectSchema>

interface NewProjectTypes {
    client_id: string,
    setNewProject: any
}


export function ModalCreateProject({ client_id, setNewProject }: NewProjectTypes) {
    const { setModalContent } = useContext(ModalContext)
    const formRef: RefObject<HTMLFormElement> = useRef(null);
    const { handleSubmit, register, reset, formState: { errors } } = useForm<createProjectType>({
        resolver: zodResolver(ProjectSchema)
    })

    const handleCreateProject = async (data: any) => {
        console.log(data)
        try {
            const { project_name, logo, prompt, bio, describe_client, call_to_action, pixel_facebook }: ProjectTypes = data;

            const project = await createNewProject({
                project_name,
                logo,
                prompt,
                client_id,
                bio,
                describe_client,
                call_to_action,
                pixel_facebook
            });
            if (project && project.status === 201) {
                reset();
                setNewProject((v: any) => [...v, project.data])
                alert("projeto criado com sucesso!")
                setModalContent({
                    isOpenModal: false,
                })
            }
        } catch (error) {
            throw new Error("Erro ao tentar criar o projeto")
        }

    }

    return (
        <div className="w-3/4 bg-zinc-800 flex  animate-smooth_display_left">

            <div className="w-1/4 max-w-[250px] min-w-[150px] h-full border-r-[1px] border-r-zinc-500 flex flex-col justify-between">
                <ListMenuModalChat ref={formRef} />

            </div>


            <form
                ref={formRef}
                onSubmit={handleSubmit(handleCreateProject)}
                className="w-full h-full flex flex-col items-center relative px-8"
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
                />

                <div className="w-full bg-zinc-500 flex flex-col justify-around absolute bottom-0">
                    <Button customClass="rounded-none">Criar chat</Button>
                    <span
                        className="underline cursor-pointer w-full text-center hover:bg-zinc-400 py-2"
                        onClick={() => setModalContent({ isOpenModal: false })}
                    >Descartar</span>
                </div>
            </form>
        </div>
    )
};