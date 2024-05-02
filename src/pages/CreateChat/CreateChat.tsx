import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { FORM_NAME_TO_SAVE_LOCALSTORAGE } from "../../variables/variables";
import { CallToActionFormChat } from "./components/FormCallToAction/FormCallToAction";

export function CreateChat() {
    const [prompt, setPrompt] = useState<Prompt[]>()
    const { plan_management_id } = useParams();
    const { setModalContent } = useContext(ModalContext)
    const navigate = useNavigate();
    const localStorageDatabase = JSON.parse(localStorage.getItem(FORM_NAME_TO_SAVE_LOCALSTORAGE) || "{}");
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
            const planManagement = await getPlanManagementById(plan_management_id) as AxiosResponse<{ status: string, prompt: Prompt[] }>
            if (!planManagement.data) navigate("/panel")
            setPrompt(planManagement.data.prompt)
        })()
    }, []);

    const handleCreateProject = async (data: ChatSchema) => {
        try {
            if (!plan_management_id) throw new Error("plan management id is missing!")


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


            const project = await createNewProject({
                project_name,
                logo,
                prompt_id,
                plan_management_id,
                call_to_action: call_to_action || [],
                chat_input_message: chat_input_message,
            });

            if (project?.status === 201) {
                localStorage.removeItem(FORM_NAME_TO_SAVE_LOCALSTORAGE)

                setModalContent({
                    componentName: "modal_created_chat",
                    components: <PopOver message="Chat criado com sucesso" componentName="modal_created_chat" />
                })

                const timeout = setTimeout(() => {
                    window.location.href = "/panel"
                    clearTimeout(timeout)
                }, 2000);

            }
        } catch (error: any) {
            throw new Error(error)
        }
    };

    return (
        (plan_management_id && prompt) &&
        <div className="w-screen min-h-screen bg-gradient-to-br from-primary-100 to-light dark:via-primary-300 via-15% dark:to-dark to-30% text-light flex flex-col justify-center items-center">
            <div className="w-4/5 p-4 rounded-2xl flex justify-center items-start bg-primary-100 dark:bg-dark border border-primary-300">
                <Root.Form
                    onSubmit={handleCreateProject}
                    form={createChatForm}
                    activeSimulator={true}
                >

                    <Root.Step index={0}>
                        <Root.File
                            name="step_0.logo"
                            sizeContainer="120px"
                        />
                        <Root.Input
                            name="step_0.project_name"
                            title="Escreva o nome do seu chat"
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
                            defaultField={[]}
                            text="Deseja adicionar links ao seu chat?"
                            functionOffToggle={() => fields.forEach((_, index) => remove(index))}
                        >
                            <CallToActionFormChat />
                        </Root.Optional>
                    </Root.Step>

                </Root.Form>
            </div>
        </div >
    )
};