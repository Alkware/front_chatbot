import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlanManagementById } from "../../api/planManagement";
import { AxiosResponse } from "axios";
import { Database } from "../../@types/Database.types";
import { PopOver } from "../../components/modal/templates/PopOver";
import { ModalContext } from "../../context/ModalContext";
import { createNewProject } from "../../api/project";
import { Root } from "../../components/Form/FormRoot";
import { useFieldArray, useForm } from "react-hook-form";
import { chatSchema, ChatSchema } from "../../schema/zod/chatSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CHAT_NAME_TO_SAVE_LOCALSTORAGE } from "../../variables/variables";
import { CallToActionFormChat } from "./components/FormCallToAction/FormCallToAction";
import { loading } from "../../functions/loading";

export function CreateChat() {
    const [prompt, setPrompt] = useState<Database[]>()
    const { plan_management_id } = useParams();
    const { setModalContent } = useContext(ModalContext)
    const navigate = useNavigate();
    const containerFormRef: RefObject<HTMLDivElement> = useRef(null);
    const localStorageDatabase = JSON.parse(localStorage.getItem(CHAT_NAME_TO_SAVE_LOCALSTORAGE) || "{}");
    const createChatForm = useForm<ChatSchema>({
        resolver: zodResolver(chatSchema),
        defaultValues: {
            step_0: {
                project_name: localStorageDatabase?.project_name,
                chat_input_message: [localStorageDatabase?.chat_input_message],
                logo: localStorageDatabase?.logo,
            },
            step_1: {
                prompt_id: localStorageDatabase?.prompt_id,
                call_to_action: localStorageDatabase?.call_to_action,
            }
        }
    });

    const { remove, fields } = useFieldArray({
        control: createChatForm.control,
        name: "step_1.call_to_action"
    })

    useEffect(() => {
        (async () => {
            // define o thema da página de login
            const isDark = localStorage.theme === "dark"
            document.documentElement.classList.toggle("dark", !!isDark)

            // Busca os dados do prompt no gerenciamento do plano do usuário, caso não houver, ele será redirecionado para o panel.
            const planManagement = await getPlanManagementById(plan_management_id) as AxiosResponse<{ status: string, prompt: Database[] }>
            if (!planManagement.data) navigate("/panel")
            setPrompt(planManagement.data.prompt)
        })()
    }, []);

    const handleCreateProject = async (data: ChatSchema) => {
        loading(containerFormRef.current?.querySelector("button[data-loading]"), true)
        try {
            if (!plan_management_id) throw new Error("plan management id is missing!")

            // Extrai as informções para criar o chat...
            const {
                step_0: {
                    project_name,
                    chat_input_message,
                    logo
                },
                step_1: {
                    prompt_id,
                    call_to_action
                }
            } = data

            // Cria o chat no banco de dados...
            const project = await createNewProject({
                project_name,
                logo,
                prompt_id,
                plan_management_id,
                call_to_action: call_to_action || [],
                chat_input_message: chat_input_message,
            });

            // Verifica se o chat foi criado no banco de dados...
            if (project?.status === 201) {
                // Remove a consistencia de dados...
                localStorage.removeItem(CHAT_NAME_TO_SAVE_LOCALSTORAGE)

                // Informa o usuário que o chat foi criado....
                setModalContent({
                    componentName: "modal_created_chat",
                    components:
                        <PopOver
                            message="Chat criado com sucesso"
                            componentName="modal_created_chat"
                            functionAfterComplete={() => {
                                window.location.href = "/panel"
                            }}
                        />
                })
            }
        } catch (error: any) {
            throw new Error(error)
        } finally {
            loading(containerFormRef.current?.querySelector("button[data-loading]"), false)
        }
    };

    return (
        (plan_management_id && prompt) &&
        <div className="w-screen min-h-screen bg-gradient-to-br from-primary-50 to-light dark:via-primary-300 via-15% dark:to-dark to-30% text-light flex flex-col justify-center items-center">
            <div
                ref={containerFormRef}
                className="w-full md:w-4/5 p-4 md:rounded-2xl flex justify-center items-start bg-primary-50 dark:bg-dark dark:border border-primary-300"
            >
                <Root.Form
                    onSubmit={handleCreateProject}
                    form={createChatForm}
                    activeSimulator={true}
                    titleButtonSend="Criar chat"
                >

                    <Root.Step index={0}>
                        <Root.File
                            name="step_0.logo"
                            sizeContainer="120px"
                        />
                        <Root.Input
                            name="step_0.project_name"
                            title="Escreva o nome do seu chat"
                            widthContainer="w-full"
                        />
                        <Root.TextArea
                            name="step_0.chat_input_message.0"
                            title="Digite a primeira mensagem do seu chat"
                            limitText={100}
                        />
                    </Root.Step>

                    <Root.Step index={1}>
                        <Root.Select
                            title="Selecione sua fonte de dados"
                            name="step_1.prompt_id"
                            options={prompt.map(p => Object({ value: p.id, text: p.prompt_name }))}
                        />
                        <Root.Optional
                            name="step_1.call_to_action"
                            text="Deseja adicionar links ao seu chat?"
                            functionOffToggle={() => fields.forEach((_, index) => remove(index))}
                        >
                            <CallToActionFormChat prompts={prompt} />
                        </Root.Optional>
                    </Root.Step>
                </Root.Form>
            </div>
        </div >
    )
};