import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackHome } from "./components/BackHome";
import { getPlanManagementById } from "../../api/planManagement";
import { AxiosResponse } from "axios";
import { Prompt } from "../../@types/prompt.types";
import { PopOver } from "../../components/modal/templates/PopOver";
import { ModalContext } from "../../context/ModalContext";
import { createNewProject } from "../../api/project";
import { Root } from "../../components/Form-zod/FormRoot";
import { useForm } from "react-hook-form";
import { CreateChatSchema, createChatSchema } from "../../schema/zod/createChatSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadImage } from "../../api/uploadImages";

export function CreateChat() {
    const [prompt, setPrompt] = useState<Prompt[]>([])
    const { plan_management_id } = useParams();
    const { setModalContent } = useContext(ModalContext)
    const navigate = useNavigate();
    const createChatForm = useForm<CreateChatSchema>({ resolver: zodResolver(createChatSchema) });
    const { handleSubmit, formState } = createChatForm

    useEffect(()=>{console.log(formState.errors)},[formState.errors])

    useEffect(() => {
        (async () => {
            // define o thema da página de login
            const isDark = localStorage.theme === "dark"
            document.documentElement.classList.toggle("dark", !!isDark)

            const planManagement = await getPlanManagementById(plan_management_id) as AxiosResponse<{ status: string, prompt: Prompt[] }>
            if (!planManagement) navigate("/panel")
            setPrompt(planManagement.data.prompt)
        })()
    }, [])


    const handleCreateProject = async (data: CreateChatSchema) => {
        const dataImage = await uploadImage(data.step_0.logo)
        try {
            if (!plan_management_id) throw new Error("plan management id is missing!")


            const {
                step_0: {
                    project_name
                },
                step_1: {
                    chat_input_message,
                    prompt_id,
                    call_to_action
                }
            } = data


            const project = await createNewProject({
                project_name,
                logo: dataImage?.data.url,
                prompt_id,
                plan_management_id,
                call_to_action: call_to_action || [],
                chat_input_message: [chat_input_message],
            });

            if (project?.status === 201) {
                setModalContent({
                    componentName: "modal_created_chat",
                    components: <PopOver message="Chat criado com sucesso" componentName="modal_created_chat" />
                })

                const timeout = setTimeout(() => {
                    navigate("/panel")
                    clearTimeout(timeout)
                }, 2000);

            }
        } catch (error: any) {
            throw new Error(error)
        }
    }

    return (
        (plan_management_id && !!prompt.length) &&
        <div className="w-screen h-screen bg-gradient-to-br from-primary-100 to-light dark:via-primary-300 via-15% dark:to-dark to-30% text-light flex flex-col  justify-center items-center overflow-hidden">
            <div className="w-4/5 p-8 min-w-[900px] rounded-2xl flex flex-col gap-8 justify-center items-center bg-primary-100 dark:bg-dark border border-primary-300">

                <BackHome />

                <Root.Form
                    onSubmit={handleSubmit(handleCreateProject)}
                    form={createChatForm}
                >

                    <Root.Step index={0}>
                        <Root.Input
                            name="step_0.project_name"
                            title="Escreva o nome do seu chat"
                        />
                        <Root.File
                            name="step_0.logo"
                        />
                    </Root.Step>

                    <Root.Step index={1}>
                        <Root.Select
                            title="Selecione sua fonte de dados"
                            name="step_1.prompt_id"
                            options={prompt.map(p => Object({ value: p.id, text: p.prompt_name }))}
                        />

                        <Root.TextArea
                            name="step_1.chat_input_message"
                            title="Digite a primeira mensagem do seu chat"
                            height={100}
                        />

                        <Root.Optional
                            name="call_to_action"
                            text="Deseja adicionar alguns links para seu chat?"
                        >
                            <Root.Input
                                name="call_to_action.0.button_text"
                                title="Digite o texto do botão da sua CTA"
                            />
                            <Root.Input
                                name="call_to_action.0.button_link"
                                title="Digite o texto do botão da sua CTA"
                            />
                        </Root.Optional>
                    </Root.Step>

                </Root.Form>
            </div>
        </div >
    )
};