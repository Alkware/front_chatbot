import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackHome } from "./components/BackHome";
import { getPlanManagementById } from "../../api/planManagement";
import { Steps } from "./components/Steps";
import { Form } from "../../components/Forms/Form";
import { AxiosResponse } from "axios";
import { Prompt } from "../../@types/prompt.types";

export function CreateChat() {
    const { plan_management_id } = useParams();
    const [prompt, setPrompt] = useState<Prompt[]>([])
    const navigate = useNavigate();
    const tabIndex = ["general_information", "product_describe"]

    useEffect(() => {
        (async () => {
            const planManagement = await getPlanManagementById(plan_management_id) as AxiosResponse<{ status: string, prompt: Prompt[] }>
            if (!planManagement) navigate("/panel")
            setPrompt(planManagement.data.prompt)
        })()
    }, [])


    return (
        plan_management_id &&
        <div className="w-screen h-screen bg-gradient-to-br from-primary-100 to-light dark:via-primary-300 via-15% dark:to-dark to-30% text-light flex flex-col  justify-center items-center overflow-hidden">
            <div className="w-4/5 p-8 min-w-[900px] rounded-2xl flex flex-col gap-8 justify-center items-center bg-primary-100 dark:bg-dark border border-primary-300">

                <BackHome />

                <Steps
                    numberSteps={tabIndex.length}
                />

                <Form.Container
                    activeSimulator={true}
                    plan_management_id={plan_management_id}
                >

                    <Form.Step index={0}>
                        <Form.Input
                            field_name="project_name"
                            title="Escreva o nome do seu chat"
                        />
                        <Form.File
                            field_name="logo"
                        />
                    </Form.Step>

                    <Form.Step index={1}>
                        <Form.Select
                            field_name="prompt_id"
                            options={prompt}
                        />

                        <Form.TextArea
                            field_name="chat_input_message"
                            title="Digite a primeira mensagem do seu chat"
                            height={100}
                        />

                        <Form.Multiple optional={{ active: true, text: "Deseja adicionar uma CTA?" }}>
                            <Form.Input
                                field_name="button_text"
                                title="Digite o texto do botão da sua CTA"
                            />
                            <Form.Input
                                field_name="button_link"
                                title="Digite o texto do botão da sua CTA"
                            />
                        </Form.Multiple>
                    </Form.Step>
                </Form.Container>
            </div>
        </div >
    )
};