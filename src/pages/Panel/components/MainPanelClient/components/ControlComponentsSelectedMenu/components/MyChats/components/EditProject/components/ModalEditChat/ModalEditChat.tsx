import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { Project } from "../../../../../../../../../../../../@types/Project";
import { Prompt } from "../../../../../../../../../../../../@types/prompt.types";
import { deleteProject, updateProject } from "../../../../../../../../../../../../api/project";
import { PopOver } from "../../../../../../../../../../../../components/modal/templates/PopOver";
import { ModalContext } from "../../../../../../../../../../../../context/ModalContext";
import { useFieldArray, useForm } from "react-hook-form";
import { Root } from "../../../../../../../../../../../../components/Form/FormRoot";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { ChatSchema, chatSchema } from "../../../../../../../../../../../../schema/zod/chatSchema";
import { getPlanManagementById } from "../../../../../../../../../../../../api/planManagement";
import { SimulatorSlugUrl } from "../../../../../../../../../../../../components/Simulators/SimulatorSlugUrl/SimulatorSlugUrl";
import { AxiosResponse } from "axios";
import { MdAdd, MdDelete, MdLink } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { CHAT_ICONS_MODELS, CTA_NAME_URL, ICON_NAME_URL } from "../../../../../../../../../../../../variables/variables";
import { Button } from "../../../../../../../../../../../../components/button/Button";


interface ModalEditChat {
    project: Project,
    prompts: Prompt[],
    setProjects: Dispatch<SetStateAction<Project[]>>
}

export function ModalEditChat({ project, setProjects }: ModalEditChat) {
    const [prompt, setPrompt] = useState<[]>();
    const { setModalContent, clearModal } = useContext(ModalContext);
    const [params, setParams] = useSearchParams();
    const currentCTA = Number(params.get(CTA_NAME_URL));
    const currentIcon = Number(params.get(ICON_NAME_URL)) || 0
    const editChatForm = useForm<ChatSchema>({
        resolver: zodResolver(chatSchema),
        defaultValues: {
            step_0: {
                project_name: project.project_name,
                logo: project.logo,
                bio: project.bio
            },
            step_1: {
                prompt_id: project.prompt.id,
                chat_input_message: project.chat_input_message,
                call_to_action: project.call_to_action,
            },
            step_2: {
                facebook_pixel: project.pixel_facebook
            },
            step_3: {
                chat_appearence: {
                    chat_icon: project.chat_appearence.chat_icon,
                    icon_text: project.chat_appearence.icon_text,
                    primary_color: project.chat_appearence.primary_color,
                    second_color: project.chat_appearence.second_color,
                    background: project.chat_appearence.background,
                }
            },
            step_4: {
                slug: project.slug?.split("-").filter((_, index) => index !== 0).join(""),
            }
        }
    });

    const { fields, append, remove, update } = useFieldArray({
        control: editChatForm.control,
        name: "step_1.call_to_action"
    })

    useEffect(() => {
        (async () => {
            // Limpa CTA_NAME_URL caso ela ainda esteja disponivel na url, caso ela estiver irá dar conflito nos link cta;
            params.set(CTA_NAME_URL, (project.call_to_action.length - 1).toString());
            setParams(params)

            // Busca todos os prompts disponiveis
            const response = await getPlanManagementById(project.plan_management_id);
            if (response?.status === 200) {
                setPrompt(response.data.prompt)
            }
        })()
    }, [])


    const handleUpdateProject = async (data: ChatSchema) => {
        let newData: any = {};

        Object.keys(data).forEach((keyStep) => {
            const dataStep = (data as any)[keyStep];

            Object.keys(dataStep).forEach((key: string) => {
                newData[key] = (data as any)[keyStep][key]
            })
        })

        if (newData && project.slug) {
            const projectUpdate: AxiosResponse<Project, Project> | void = await updateProject(newData, project.slug)
            if (projectUpdate && projectUpdate.status === 200) {
                setProjects(projects => {
                    const findIndex = projects.findIndex(p => p.id === project.id)
                    const filterWithoutOutDatedProject = projects.filter(p => p.id !== project.id)
                    // preenchendo alguns dados ficticios até que o usuario recarregue com os dados verdadeiros.
                    newData.is_online = projectUpdate.data.is_online
                    newData.plan_management_id = projectUpdate.data.plan_management_id
                    newData.id = projectUpdate.data.id
                    newData.prompt = {}
                    newData.prompt.id = projectUpdate.data.prompt_id

                    // insere o novo dado dentro do array de projeto
                    filterWithoutOutDatedProject.splice(findIndex, 0, newData)

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

    async function handleDeleteProject() {
        if (project.id) {
            // aqui pode ser tanto deleteProject quanto deleteDatabase. Esse é o problema!
            const deleted = await deleteProject(project.id);
            if (deleted && deleted.status === 200) {
                setProjects((data: any) => data.filter((d: any) => d.id !== project.id))

                setModalContent({
                    componentName: "modal_delete_success",
                    components:
                        <PopOver
                            message="Chat excluido com sucesso!"
                            componentName="modal_delete_success"
                            functionAfterComplete={() => clearModal(null, { clearAll: true })}
                        />
                })
            }
        }
    }

    const handleClickButtonLink = (index: number) => {
        const lastField = editChatForm.watch(`step_1.call_to_action.${currentCTA}`);
        const hasLastField = fields.find(field => field.button_text === lastField.button_text && field.button_link === lastField.button_link)

        if (!hasLastField) {
            if (!fields[currentCTA].button_text) {
                update(currentCTA, {
                    button_text: lastField.button_text,
                    button_link: lastField.button_link,
                    button_describe: lastField.button_describe
                })
            }
            else remove(fields.length - 1)

        }

        // Define o botão clicado como atual CTA
        params.set(CTA_NAME_URL, index.toString());
        setParams(params)
    }

    const handleAddCTA = () => {
        if (!!fields[fields.length - 1]?.button_text) {
            if (fields.length < 3) {
                append({ button_describe: "", button_link: "", button_text: "" })
                const newCurrentCTA = currentCTA + 1;
                params.set(CTA_NAME_URL, newCurrentCTA.toString())
                setParams(params)
            } else setModalContent({
                componentName: "modal_limit_cta",
                components:
                    <PopOver
                        message="Você pode ter no maximo 3 CTA por chat."
                        componentName="modal_limit_cta"
                        type="WARNING"
                    />
            })
        } else setModalContent({
            componentName: "modal_empty_cta",
            components:
                <PopOver
                    message="Você precisa preencher o ultimo link, antes de adicionar mais"
                    componentName="modal_empty_cta"
                />
        })

    }

    const handleSelectIcon = (id: number) => {
        params.set(ICON_NAME_URL, id.toString())
        setParams(params)
        editChatForm.unregister("step_3.chat_appearence.chat_icon");
        editChatForm.register("step_3.chat_appearence.chat_icon", { value: id })
    }

    return (
        prompt &&
        <div className="w-[90vw] h-[70vh] min-h-[450px] min-w-[700px] flex">
            <Root.EditForm
                form={editChatForm}
                onDelete={handleDeleteProject}
                onSubmit={handleUpdateProject}
                activeSimulator={true}
            >
                <Root.EditStep
                    index={0}
                    titleStep="Informações do chat"
                >
                    <Root.Input
                        name="step_0.project_name"
                        title="Escreva o nome do seu chat"
                    />
                    <Root.TextArea
                        name="step_0.bio"
                        title="Escreva uma descrição para seu chat"
                        height={100}
                    />
                    <Root.File
                        name="step_0.logo"
                    />
                </Root.EditStep>

                <Root.EditStep
                    index={1}
                    titleStep="Configurações do chat"
                >
                    <Root.Select
                        name="step_1.prompt_id"
                        options={prompt.map((prompt: Prompt) => Object({ value: prompt.id, text: prompt.prompt_name }))}
                        title="Selecione sua fonte de dados"
                    />
                    <Root.TextArea
                        name="step_1.chat_input_message.0"
                        title="Digite a primeira mensagem do seu chat"
                        height={100}
                    />

                    <div className="flex flex-col ">
                        <div className="flex justify-end">
                            <Button
                                type="button"
                                customClass="bg-primary-200"
                                onClick={handleAddCTA}
                            >
                                <MdAdd />  Adicionar link
                            </Button>
                        </div>
                        <div className="flex justify-center gap-4 border-b border-primary-100/50">
                            {
                                fields.map((field, index) =>
                                    (index !== currentCTA && !!field.button_text) &&
                                    <div className="flex gap-4 " key={field.id}>
                                        <div className="w-full flex gap-4 py-4">
                                            <div
                                                className="flex items-center gap-2 cursor-pointer bg-primary-100 px-3 rounded-lg"
                                                onClick={() => handleClickButtonLink(index)}
                                            >
                                                {field.button_text}
                                                <MdLink className="text-xl" />
                                            </div>
                                        </div>
                                    </div>

                                )
                            }
                        </div>

                        <div className="flex justify-center p-4">
                            {
                                fields.map((field, index) =>
                                    (index === currentCTA) &&
                                    <Root.Flex flexDirection="row" key={field.id}>
                                        <Root.Flex flexDirection="column">
                                            <Root.Flex flexDirection="row">
                                                <Root.Input
                                                    name={`step_1.call_to_action.${index}.button_text`}
                                                    title={`Digite o texto do link`}
                                                />
                                                <Root.Input
                                                    name={`step_1.call_to_action.${index}.button_link`}
                                                    title={`Digite a url do link`}
                                                />
                                            </Root.Flex>

                                            <Root.TextArea
                                                name={`step_1.call_to_action.${index}.button_describe`}
                                                title="Digite a descrição do link"
                                            />
                                        </Root.Flex>
                                        <MdDelete
                                            className="text-2xl fill-red-500 bg-red-900/50 rounded-full mt-4 cursor-pointer"
                                            onClick={() => {
                                                remove(index);
                                                params.set(CTA_NAME_URL, (index - 1).toString());
                                                setParams(params)
                                            }}
                                        />
                                    </Root.Flex>
                                )
                            }
                        </div>



                    </div>
                </Root.EditStep>

                <Root.EditStep
                    index={2}
                    titleStep="Eventos e rastreamentos"
                >
                    <Root.Input
                        name="step_2.facebook_pixel"
                        title="Adicione o pixel do seu facebook"
                    />
                </Root.EditStep>

                <Root.EditStep
                    index={3}
                    titleStep="Aparência do chat"
                >
                    <Root.Flex flexDirection="column" >

                        <div className="flex flex-col justify-center gap-4">
                            <h2 className="text-center text-xl">Escolha um icone para seu chat</h2>
                            <div className="flex gap-8 text-5xl">
                                {
                                    CHAT_ICONS_MODELS.map(({ Icon, id }, index: number) =>
                                        <Icon
                                            key={id}
                                            data-iscurrent={currentIcon === index}
                                            className="hover:bg-primary-100 data-[iscurrent=true]:bg-primary-100 cursor-pointer rounded-full p-2"
                                            onClick={() => handleSelectIcon(id)}
                                        />
                                    )
                                }
                            </div>
                        </div>

                        <Root.Input
                            name="step_3.chat_appearence.icon_text"
                            title="Digite o texto que será exibido ao lado do icon"
                        />


                        <Root.Flex flexDirection="row">
                            <Root.Color
                                name="step_3.chat_appearence.primary_color"
                                title="Escolha a cor primária do seu chat"
                            />

                            <Root.Color
                                name="step_3.chat_appearence.second_color"
                                title="Escolha a cor secundária do seu chat"
                            />
                        </Root.Flex>

                        <Root.Color
                            name="step_3.chat_appearence.background"
                            title="Escolha a cor do background do seu chat"
                        />
                    </Root.Flex>
                </Root.EditStep>

                <Root.EditStep
                    index={4}
                    titleStep="Configuração avançadas"
                >
                    <Root.Flex flexDirection="column" >
                        <Root.Input
                            name="step_3.slug"
                            title="Altere a slug do seu chat"
                        />

                        <SimulatorSlugUrl previousSlug={project?.slug || ""} />
                    </Root.Flex>
                </Root.EditStep>
            </Root.EditForm>

        </div>
    )
};

