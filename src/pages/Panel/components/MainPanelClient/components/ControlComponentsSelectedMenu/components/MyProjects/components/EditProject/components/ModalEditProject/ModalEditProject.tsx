import { Dispatch, SetStateAction, useContext } from "react"
import { Project } from "../../../../../../../../../../../../@types/Project";
import { Form } from "../../../../../../../../../../../../components/Forms/Form";
import { Prompt } from "../../../../../../../../../../../../@types/prompt.types";
import { updateProject } from "../../../../../../../../../../../../api/project";
import { PopOver } from "../../../../../../../../../../../../components/modal/templates/PopOver";
import { ModalContext } from "../../../../../../../../../../../../context/ModalContext";
import { FcInfo, FcMindMap, FcNews, FcSettings } from "react-icons/fc";
import { DATABASE_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../../../../../../../../../variables/variables";


interface ModalEditProject {
    project: Project,
    prompts: Prompt[],
    setProjects: Dispatch<SetStateAction<Project[]>>
}

const listName = [
    {
        text: "Informações gerais",
        icon: <FcInfo />,
        index: 0,
    },
    {
        text: "Descrição do produto",
        index: 1,
        icon: <FcNews />
    },
    {
        text: "Rastreamento/Eventos",
        index: 2,
        icon: <FcMindMap />
    },
    {
        text: "Configurações do chat",
        index: 3,
        icon: <FcSettings />
    },
]

export function ModalEditProject({ project, prompts, setProjects }: ModalEditProject) {
    const { setModalContent, clearModal } = useContext(ModalContext)


    const handleUpdateProject = async () => {
        const data = JSON.parse(localStorage.getItem(DATABASE_NAME_TO_SAVE_LOCALSTORAGE) || "{}")

        Object.keys(data).forEach(keyStep => {
            Object.keys(data[keyStep]).forEach((key) => {
                data[key] = data[keyStep][key]
            })

            delete data[keyStep]
        })

        if (data && project.slug) {
            const projectUpdate = await updateProject(data, project.slug)
            if (projectUpdate && projectUpdate.status === 200) {
                localStorage.removeItem(DATABASE_NAME_TO_SAVE_LOCALSTORAGE)
                setProjects(projects => {
                    const filterWithoutOutDatedProject = projects.filter(p => p.id !== project.id)
                    // preenchendo alguns dados ficticios até que o usuario recarregue com os dados verdadeiros.
                    data.is_online = project.is_online
                    data.id = project.id
                    data.prompt = {}
                    data.prompt.id = data.prompt_id

                    // insere o novo dado dentro do array de projeto
                    filterWithoutOutDatedProject.push(data)

                    return filterWithoutOutDatedProject
                })
                setModalContent({
                    componentName: "modal_chat_updated",
                    components:
                        <PopOver
                            message="Chat atualizado com sucesso"
                            componentName="modal_chat_updated"
                            functionAfterComplete={() => clearModal("modal_edit_project")}
                        />
                })
            }
        }
    }

    return (
        <div className="w-[90vw] h-[70vh] min-h-[450px] min-w-[700px] flex">

            <Form.Container
                formName={DATABASE_NAME_TO_SAVE_LOCALSTORAGE}
                eventSubmit={handleUpdateProject}
                listName={listName}
                project={project}
                setProjects={setProjects}
            >
                <Form.Step index={0}>
                    <Form.Input
                        fieldName="project_name"
                        title="Escreva o nome do seu chat"
                        defaultValue={project.project_name}
                    />
                    <Form.TextArea
                        fieldName="bio"
                        title="Escreva uma descrição para seu chat"
                        defaultValue={project.bio}
                        height={100}
                    />
                    <Form.File
                        fieldName="logo"
                        defaultValue={project.logo}
                    />
                </Form.Step>

                <Form.Step index={1}>
                    <Form.Select
                        fieldName="prompt_id"
                        options={prompts}
                        defaultValue={project.prompt.id}

                    />
                    <Form.TextArea
                        fieldName="chat_input_message.0"
                        title="Digite a primeira mensagem do seu chat"
                        height={100}
                        defaultValue={project.chat_input_message[0]}
                    />

                    <Form.Multiple
                        optional={
                            {
                                optional: true,
                                active: (project.call_to_action.length ? true : false),
                                text: "Deseja adicionar uma CTA?"
                            }
                        }
                        fieldName="call_to_action"
                    >
                        <Form.Input
                            fieldName="call_to_action.0.button_text"
                            title="Digite o texto do botão da sua CTA"
                            defaultValue={project.call_to_action.length ? (project.call_to_action[0].button_text) : ""}
                        />
                        <Form.Input
                            fieldName="call_to_action.0.button_link"
                            title="Digite o texto do botão da sua CTA"
                            defaultValue={project.call_to_action.length ? (project.call_to_action[0].button_link) : ""}

                        />
                    </Form.Multiple>
                </Form.Step>

                <Form.Step index={2}>
                    <Form.Input
                        fieldName="pixel_facebook"
                        title="Adicione o pixel do seu facebook"
                        defaultValue={project.pixel_facebook}
                    />
                </Form.Step>

                <Form.Step index={3}>
                    <Form.Slug
                        fieldName="slug"
                        title="Altere a slug do seu chat"
                        defaultValue={project.slug}
                    />
                </Form.Step>
            </Form.Container>
        </div>
    )
};

