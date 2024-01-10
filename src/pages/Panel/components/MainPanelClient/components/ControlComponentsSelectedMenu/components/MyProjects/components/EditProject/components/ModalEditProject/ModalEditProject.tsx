import { useContext, useEffect, useState } from "react"
import { Project } from "../../../../../../../../../../../../@types/Project";
import { Form } from "../../../../../../../../../../../../components/Forms/Form";
import { Prompt } from "../../../../../../../../../../../../@types/prompt.types";
import { updateProject } from "../../../../../../../../../../../../api/project";
import { PopOver } from "../../../../../../../../../../../../components/modal/templates/PopOver";
import { ModalContext } from "../../../../../../../../../../../../context/ModalContext";
import { FcInfo, FcMindMap, FcNews, FcSettings } from "react-icons/fc";


interface ModalEditProject {
    project: Project,
    prompts: Prompt[],
}

const listName = [
    {
        text: "Informações gerais",
        icon: <FcInfo />,
        index:0,
    },
    {
        text: "Descrição do produto",
        index:1,
        icon: <FcNews />
    },
    {
        text: "Rastreamento/Eventos",
        index:2,
        icon: <FcMindMap />
    },
    {
        text: "Configurações do chat",
        index:3,
        icon: <FcSettings />
    },
]

export function ModalEditProject({ project, prompts }: ModalEditProject) {
    const [defaultValues, setDefaultValues] = useState<{}>();
    const { setModalContent } = useContext(ModalContext)

   


    useEffect(() => {
        setDefaultValues({
            project_name: project.project_name,
            bio: project.bio,
            logo: project.logo,
            prompt_id: project.prompt.id,
            chat_input_message: project.chat_input_message,
            call_to_action: [{
                button_text: project.call_to_action[0].button_text,
                button_link: project.call_to_action[0].link,
            }],
            pixel_facebook: project.pixel_facebook
        })
    }, [])


    const handleUpdateProject = async (data: any) => {
        if (data && project.slug) {
            const projectUpdate = await updateProject(data, project.slug)
            if (projectUpdate && projectUpdate.status === 200) {
                localStorage.removeItem("chat")
                setModalContent({
                    isOpenModal: true,
                    components: <PopOver message="Chat atualizado com sucesso" />
                })
            }
        }
    }

    return (
        defaultValues &&
        <div className="w-[90vw] h-[70vh] min-h-[450px] min-w-[700px] flex">

            <Form.ContainerEdit
                activeSimulator={true}
                eventSubmit={handleUpdateProject}
                defaultValues={defaultValues}
                project={project}
                listName={listName}
            >
                <Form.Step index={0}>
                    <Form.Input
                        fieldName="project_name"
                        title="Escreva o nome do seu chat"
                    />
                    <Form.TextArea
                        fieldName="bio"
                        title="Escreva uma descrição para seu chat"
                        height={100}
                    />
                    <Form.File
                        fieldName="logo"
                    />
                </Form.Step>

                <Form.Step index={1}>
                    <Form.Select
                        fieldName="prompt_id"
                        options={prompts}

                    />

                    <Form.TextArea
                        fieldName="chat_input_message.0"
                        title="Digite a primeira mensagem do seu chat"
                        height={100}
                    />

                    <Form.Multiple optional={{ active: true, text: "Deseja adicionar uma CTA?" }}>
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

                <Form.Step index={2}>
                    <Form.Input
                        fieldName="pixel_facebook"
                        title="Adicione o pixel do seu facebook"

                    />
                </Form.Step>
            </Form.ContainerEdit>
        </div>
    )
};

