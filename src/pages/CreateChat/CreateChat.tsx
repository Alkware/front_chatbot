import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackHome } from "./components/BackHome";
import { getPlanManagementById } from "../../api/planManagement";
import { AxiosResponse } from "axios";
import { Prompt } from "../../@types/prompt.types";
import { PopOver } from "../../components/modal/templates/PopOver";
import { ModalContext } from "../../context/ModalContext";
import { createNewProject } from "../../api/project";
import { Root } from "../../components/Form/FormRoot";
import { useFieldArray, useForm } from "react-hook-form";
import { chatSchema, ChatSchema } from "../../schema/zod/chatSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/button/Button";
import { MdDelete } from "react-icons/md";

export function CreateChat() {
    const [prompt, setPrompt] = useState<Prompt[]>([])
    const { plan_management_id } = useParams();
    const { setModalContent } = useContext(ModalContext)
    const navigate = useNavigate();
    const createChatForm = useForm<ChatSchema>({ resolver: zodResolver(chatSchema) });

    const { append, remove, fields } = useFieldArray({
        control: createChatForm.control,
        name: "step_1.call_to_action"
    })

    useEffect(() => {
        (async () => {
            // Adiciona um campo ao CTA
            append({ button_text: "", button_link: "", button_describe: "" })
            // define o thema da página de login
            const isDark = localStorage.theme === "dark"
            document.documentElement.classList.toggle("dark", !!isDark)

            const planManagement = await getPlanManagementById(plan_management_id) as AxiosResponse<{ status: string, prompt: Prompt[] }>
            if (!planManagement.data) navigate("/panel")
            setPrompt(planManagement.data.prompt)
        })()
    }, [])


    const handleCreateProject = async (data: ChatSchema) => {
        try {
            if (!plan_management_id) throw new Error("plan management id is missing!")


            const {
                step_0: {
                    project_name,
                    logo
                },
                step_1: {
                    chat_input_message,
                    prompt_id,
                    call_to_action
                }
            } = data


            const project = await createNewProject({
                project_name,
                logo,
                prompt_id,
                plan_management_id,
                call_to_action: call_to_action || [],
                chat_input_message: chat_input_message,
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
        (plan_management_id) &&
        <div className="w-screen h-screen bg-gradient-to-br from-primary-100 to-light dark:via-primary-300 via-15% dark:to-dark to-30% text-light flex flex-col  justify-center items-center overflow-hidden">
            <div className="w-4/5 p-8 min-w-[900px] rounded-2xl flex flex-col gap-8 justify-center items-center bg-primary-100 dark:bg-dark border border-primary-300">

                <BackHome />

                <Root.Form
                    onSubmit={handleCreateProject}
                    form={createChatForm}
                    activeSimulator={true}
                >

                    <Root.Step index={0}>
                        <Root.Input
                            name="step_0.project_name"
                            title="Escreva o nome do seu chat"
                        />
                        <Root.File
                            name="step_0.logo"
                            sizeContainer="120px"
                        />
                    </Root.Step>

                    <Root.Step index={1}>
                        <Root.Select
                            title="Selecione sua fonte de dados"
                            name="step_1.prompt_id"
                            options={prompt.map(p => Object({ value: p.id, text: p.prompt_name }))}
                        />

                        <Root.TextArea
                            name="step_1.chat_input_message.0"
                            title="Digite a primeira mensagem do seu chat"
                            height={100}
                        />

                        <Root.Optional
                            name="step_1.call_to_action"
                            text="Deseja adicionar links ao seu chat?"
                            functionOffToggle={() => fields.forEach((_, index) => remove(index))}
                        >
                            <div className="flex flex-col">
                                <div className="flex justify-start">
                                    <Button
                                        type="button"
                                        onClick={() => append({ button_link: "", button_text: "", button_describe: "" })}
                                    >
                                        Adicionar link
                                    </Button>
                                </div>
                                {
                                    fields.map((field, index) =>
                                        <div
                                            className="flex gap-2 justify-between items-end"
                                            key={field.id}
                                        >
                                            <div
                                                className="flex flex-col gap-8 border-b border-primary-100/50 my-4"
                                            >
                                                <Root.Container className="flex gap-4">
                                                    <Root.Input
                                                        name={`step_1.call_to_action.${index}.button_text`}
                                                        title="Digite o texto do link"
                                                    />
                                                    <Root.Input
                                                        name={`step_1.call_to_action.${index}.button_link`}
                                                        title="Digite a url do link"
                                                    />
                                                </Root.Container>
                                                <Root.TextArea
                                                    name={`step_1.call_to_action.${index}.button_describe`}
                                                    title="Digite uma descrição para esse botão"
                                                    help="Deixe uma descrição clara e objetiva, pois isso ajudará a IA entender o contexto da conversa e enviar o link no momento correto."
                                                />
                                            </div>

                                            <MdDelete
                                                className="text-3xl fill-red-500 bg-red-950/70 cursor-pointer rounded-xl p-1 mb-6"
                                                onClick={() => remove(index)}
                                            />
                                        </div>
                                    )
                                }
                            </div>

                        </Root.Optional>
                    </Root.Step>

                </Root.Form>
            </div>
        </div >
    )
};