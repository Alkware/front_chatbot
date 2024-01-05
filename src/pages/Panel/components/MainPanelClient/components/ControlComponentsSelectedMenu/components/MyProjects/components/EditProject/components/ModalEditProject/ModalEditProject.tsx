import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Project } from "../../../../../../../../../../../../@types/Project";
import { Form } from "../../../../../../../../../../../../components/Forms/Form";
import { Prompt } from "../../../../../../../../../../../../@types/prompt.types";
import { ListMenuModalChat } from "../ListMenuModalChat/ListMenuModalChat";


interface ModalEditProject {
    project: Project,
    prompts: Prompt[],
    setNewProject: Dispatch<SetStateAction<any>>
}

export function ModalEditProject({ project, setNewProject, prompts }: ModalEditProject) {
    const [access, setAccess] = useState<boolean>();

    useEffect(() => {
        const chat = {
            project_name: project.project_name,
            bio: project.bio,
            logo: project.logo,
            prompt_id: project.prompt.id,
            chat_input_message: project.chat_input_message,
            call_to_action: project.call_to_action,
            pixel_facebook: project.pixel_facebook,
            slug: project.slug
        }

        localStorage.setItem("chat", JSON.stringify(chat))
        setAccess(true)
    }, [])

    return (
        access &&
        <div className="w-[90vw] h-[70vh] min-h-[450px] min-w-[700px] flex">

            <ListMenuModalChat
                project={project}
                setNewProject={setNewProject}
            />

            <Form.Container
                activeSimulator={true}
                plan_management_id={project.plan_management_id}
            >

                <Form.Step index={0}>
                    <Form.Input
                        field_name="project_name"
                        title="Escreva o nome do seu chat"
                    />
                    <Form.TextArea
                        field_name="bio"
                        title="Escreva uma descrição para seu chat"
                        height={100}
                    />
                    <Form.File
                        field_name="logo"
                    />
                </Form.Step>

                <Form.Step index={1}>
                    <Form.Select
                        field_name="prompt_id"
                        options={prompts}

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

                <Form.Step index={2}>
                    <Form.Input
                        field_name="pixel_facebook"
                        title="Adicione o pixel do seu facebook"

                    />
                </Form.Step>
            </Form.Container>
        </div>
    )
};

