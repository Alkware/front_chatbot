import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BackHome } from "./components/BackHome";
import { getPlanManagementById } from "../../api/planManagement";
import { Form } from "../../components/Forms/Form";
import { AxiosResponse } from "axios";
import { Prompt } from "../../@types/prompt.types";
import { ProjectCreateTypes } from "../../@types/Project";
import { PopOver } from "../../components/modal/templates/PopOver";
import { ModalContext } from "../../context/ModalContext";
import { CHAT_NAME_TO_SAVE_LOCALSTORAGE, STEP_NAME_URL } from "../../variables/variables";

export function CreateChat() {
    const [prompt, setPrompt] = useState<Prompt[]>([])
    const { plan_management_id } = useParams();
    const { setModalContent } = useContext(ModalContext)
    const [params, setParams] = useSearchParams();
    const navigate = useNavigate();


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


    const handleCreateProject = async (data: any) => {
        try {
            const currentStep = params.get(STEP_NAME_URL) || "0"

            if (!plan_management_id) throw new Error("plan management id is missing!")

            if (currentStep === "1" && !data.prompt_id) setModalContent({ isOpenModal: true, components: <PopOver message="Você precisa selecionar uma fonte de dados." type="WARNING" /> })
            else if (currentStep === "1" && !data.chat_input_message.length) setModalContent({ isOpenModal: true, components: <PopOver message="Você precisa definir uma primeira mensagem em seu chat." type="WARNING" /> })


            const {
                project_name, logo, prompt_id, call_to_action, chat_input_message, chat_type
            }: ProjectCreateTypes = data;

            console.log(call_to_action, call_to_action.length)

            // const project = await createNewProject({
            //     project_name,
            //     logo,
            //     prompt_id,
            //     plan_management_id,
            //     call_to_action,
            //     chat_input_message,
            //     chat_type,
            // });

            // if (project && project.status === 201) {
            //     setModalContent({
            //         isOpenModal: true,
            //         components: <PopOver message="Chat criado com sucesso" />
            //     })

            //     const timeout = setTimeout(() => {
            //         navigate("/panel")
            //         clearTimeout(timeout)
            //     }, 2000);

            // }
        } catch (error: any) {
            throw new Error(error)
        }
    }

    return (
        plan_management_id &&
        <div className="w-screen h-screen bg-gradient-to-br from-primary-100 to-light dark:via-primary-300 via-15% dark:to-dark to-30% text-light flex flex-col  justify-center items-center overflow-hidden">
            <div className="w-4/5 p-8 min-w-[900px] rounded-2xl flex flex-col gap-8 justify-center items-center bg-primary-100 dark:bg-dark border border-primary-300">

                <BackHome />

                <Form.ContainerCreate
                    activeSimulator={true}
                    plan_management_id={plan_management_id}
                    eventSubmit={handleCreateProject}
                    formName={CHAT_NAME_TO_SAVE_LOCALSTORAGE}
                >

                    <Form.Step index={0}>
                        <Form.Input
                            fieldName="project_name"
                            title="Escreva o nome do seu chat"
                        />
                        <Form.File
                            fieldName="logo"
                        />
                    </Form.Step>

                    <Form.Step index={1}>
                        <Form.Select
                            fieldName="prompt_id"
                            options={prompt}
                        />

                        <Form.TextArea
                            fieldName="chat_input_message.0"
                            title="Digite a primeira mensagem do seu chat"
                            height={100}
                        />

                        <Form.Multiple 
                            optional={{ active: true, text: "Deseja adicionar uma CTA?" }}
                            fieldName="call_to_action"
                        >
                            <Form.Input
                                fieldName="call_to_action.0.button_text"
                                title="Digite o texto do botão da sua CTA"
                            />
                            <Form.Input
                                fieldName="call_to_action.0.button_link"
                                title="Digite o texto do botão da sua CTA"
                            />
                        </Form.Multiple>
                    </Form.Step>

                </Form.ContainerCreate>
            </div>
        </div >
    )
};