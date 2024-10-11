import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlanManagementById } from "../../api/planManagement";
import { PopOver } from "../../components/modal/templates/PopOver";
import { ModalContext } from "../../context/ModalContext";
import { createNewProject } from "../../api/project";
import { Root } from "../../components/Form/FormRoot";
import { useForm } from "react-hook-form";
import { chatSchema, ChatSchema } from "../../schema/chatSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CHAT_NAME_TO_SAVE_LOCALSTORAGE } from "../../variables/variables";
import { loading } from "../../functions/loading";
import { createLog } from "../../api/log";
import { Artificial_Intelligence } from "../../@types/artificialInteligence.types";
import { StepBasicInfoChat } from "./components/StepBasicInfoChat/StepBasicInfoChat";
import { StepLinksChat } from "./components/StepLinksChat/StepLinksChat";

export function CreateChat() {
    const [artificialInteligence, setArtificialIntelligence] = useState<Artificial_Intelligence[]>();
    const { plan_management_id } = useParams();
    const { setModalContent } = useContext(ModalContext)
    const navigate = useNavigate();
    const containerFormRef: RefObject<HTMLDivElement> = useRef(null);
    const localStorageDatabase = JSON.parse(localStorage.getItem(CHAT_NAME_TO_SAVE_LOCALSTORAGE) || "{}");
    const createChatForm = useForm<ChatSchema>({
        resolver: zodResolver(chatSchema),
        defaultValues: {
            project_name: localStorageDatabase?.project_name,
            chat_input_message: [localStorageDatabase?.chat_input_message],
            logo_id: localStorageDatabase?.logo_id,
            artificial_intelligence_id: localStorageDatabase?.prompt_id,
            links: localStorageDatabase?.links,
        }
    }
    );

    useEffect(() => {
        (async () => {
            // define o thema da página de login
            const isDark = localStorage.theme === "dark"
            document.documentElement.classList.toggle("dark", !!isDark)

            // Busca os dados do artificial intelligence no gerenciamento do plano do usuário, caso não houver, ele será redirecionado para o panel.
            const planManagement = await getPlanManagementById(plan_management_id);
            if (!planManagement) {
                navigate("/panel");
                return;
            }
            setArtificialIntelligence(planManagement.artificial_intelligence)
        })()
    }, []);

    const handleCreateProject = async (data: ChatSchema) => {
        loading(containerFormRef.current?.querySelector("button[data-loading]"), true)
        try {
            if (!plan_management_id) throw new Error("plan management id is missing!");

            // Extrai as informções para criar o chat...
            const {
                project_name,
                chat_input_message,
                logo_id,
                artificial_intelligence_id,
                links
            } = data

            // Cria o chat no banco de dados...
            const project = await createNewProject({
                project_name,
                logo_id,
                artificial_intelligence_id,
                plan_management_id,
                links: links || [],
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
            await createLog({
                level: "danger",
                log: "O usuário não conseguiu criar o chat",
                path: "src/pages/CreateChat/CreateChat.tsx Ln: 108",
                sector: "Plataforma"
            })
            throw new Error(error)
        } finally {
            loading(containerFormRef.current?.querySelector("button[data-loading]"), false)
        }
    };

    return (
        (plan_management_id && artificialInteligence) &&
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
                        <StepBasicInfoChat
                            client_id={artificialInteligence[0].plan_management.client_id}
                        />
                    </Root.Step>

                    <Root.Step index={1}>
                        <StepLinksChat
                            artificialInteligence={artificialInteligence}
                            createChatForm={createChatForm}
                        />
                    </Root.Step>
                </Root.Form>
            </div>
        </div >
    )
};