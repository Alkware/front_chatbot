import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { Project } from "../../../../../../../../../../../../@types/Project";
import { Database } from "../../../../../../../../../../../../@types/Database.types";
import { checkSlugIsAvailable, deleteProject, updateProject } from "../../../../../../../../../../../../api/project";
import { PopOver } from "../../../../../../../../../../../../components/modal/templates/PopOver";
import { ModalContext } from "../../../../../../../../../../../../context/ModalContext";
import { useForm } from "react-hook-form";
import { Root } from "../../../../../../../../../../../../components/Form/FormRoot";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { ChatSchema, chatSchema } from "../../../../../../../../../../../../schema/zod/chatSchema";
import { getPlanManagementById } from "../../../../../../../../../../../../api/planManagement";
import { SimulatorSlugUrl } from "../../../../../../../../../../../../components/Simulators/SimulatorSlugUrl/SimulatorSlugUrl";
import { AxiosResponse } from "axios";
import { useSearchParams } from "react-router-dom";
import { CHAT_ICONS_MODELS, CTA_NAME_URL, ICON_NAME_URL } from "../../../../../../../../../../../../variables/variables";
import { SocialProof } from "./components/SocialProof/SocialProof";
import { ClientContext } from "../../../../../../../../../../../../context/ClientContext";
import { CallToActionFormChat } from "../../../../../../../../../../../CreateChat/components/FormCallToAction/FormCallToAction";
import { PopUp } from "../../../../../../../../../../../../components/modal/templates/PopUp";
import { Confirm } from "../../../../../../../../../../../../components/modal/templates/Confirm";


interface ModalEditChat {
    project: Project,
    prompts: Database[],
    setProjects: Dispatch<SetStateAction<Project[]>>
}

export function ModalEditChat({ project, setProjects }: ModalEditChat) {
    const { setModalContent, clearModal } = useContext(ModalContext);
    const { setClient, client } = useContext(ClientContext)
    const [prompt, setPrompt] = useState<[]>();
    const [params, setParams] = useSearchParams();
    const currentIcon = Number(params.get(ICON_NAME_URL)) || 0
    const editChatForm = useForm<ChatSchema>({
        resolver: zodResolver(chatSchema),
        defaultValues: {
            step_0: {
                project_name: project.project_name,
                chat_input_message: project.chat_input_message,
                logo: project.logo,
                social_proof: project.social_proof,
            },
            step_1: {
                prompt_id: project.prompt.id,
                bio: project.bio,
                call_to_action: project.call_to_action,
            },
            step_2: {
                facebook_pixel: project.pixel_facebook
            },
            step_3: {
                chat_appearance: {
                    chat_icon: project.chat_appearance?.chat_icon,
                    icon_text: project.chat_appearance?.icon_text,
                    primary_color: project.chat_appearance?.primary_color,
                    second_color: project.chat_appearance?.second_color,
                    background: project.chat_appearance?.background,
                }
            },
            step_4: {
                slug: project.slug,
            }
        }
    });


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

            if (data.step_4?.slug && data.step_4?.slug !== project.slug && !await checkSlugIsAvailable(data.step_4.slug)) {
                setModalContent({
                    componentName: "modal_error_slug",
                    components:
                        <PopOver
                            componentName="modal_error_slug"
                            message="A slug escolhida não está disponível!"
                            type="WARNING"
                        />
                })
                return;
            }

            newData.chat_appearance.id = project.chat_appearance?.id
            const projectUpdate: AxiosResponse<Project, Project> | void = await updateProject(newData, project.slug)
            if (projectUpdate && projectUpdate.status === 200) {
                setProjects(projects => {
                    const findIndex = projects.findIndex(p => p.id === project.id)
                    const filterWithoutOutDatedProject = projects.filter(p => p.id !== project.id)
                    // preenchendo alguns dados ficticios até que o usuario recarregue com os dados verdadeiros.
                    newData.is_online = projectUpdate.data.is_online
                    newData.plan_management_id = projectUpdate.data.plan_management_id
                    newData.id = projectUpdate.data.id
                    newData.prompt = projectUpdate.data.prompt;
                    newData.chat_appearance = projectUpdate.data.chat_appearance;

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
        const handleConfirmDeleteChat = async () => {
            if (project.id) {
                // aqui pode ser tanto deleteProject quanto deleteDatabase. Esse é o problema!
                const deleted = await deleteProject(project.id);
                if (deleted && deleted.status === 200) {
                    // Remove esse project da lista de projects que está sendo mostrado para o cliente
                    setProjects((data: any) => data.filter((d: any) => d.id !== project.id));
                    //Busca o index desse project na lista de projects do usuário
                    const findIndex = client?.plan_management.project.findIndex(p => p.id === project.id)
                    // project removido para que seja atualizado de maneira ficticia a quantidade de projects,
                    // assim possibilita a criação de novos projects mesmo que a lista não seja atualizada.
                    if (client && findIndex) {
                        client.plan_management.project.splice(findIndex, 1)
                        setClient(client)
                    }

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


        setModalContent({
            componentName: "modal_confirm_delete_chat",
            components:
                <PopUp>
                    <Confirm
                        title="Tem certeza que deseja deletar esse chat?"
                        subTitle="Uma vez removido, não pode ser revertido."
                        confirmFunction={handleConfirmDeleteChat}
                        cancelFuntion={() => clearModal("modal_confirm_delete_chat")}
                    />
                </PopUp>
        })
    }


    const handleSelectIcon = (id: number) => {
        params.set(ICON_NAME_URL, id.toString())
        setParams(params)
        editChatForm.unregister("step_3.chat_appearance.chat_icon");
        editChatForm.register("step_3.chat_appearance.chat_icon", { value: id })
    }

    return (
        (!!prompt?.length) &&
        <div className="w-screen px-4 md:px-0 md:w-[90vw] md:h-[80vh] md:min-h-[450px] md:min-w-[700px] flex overflow-hidden">
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
                    <Root.Container className="flex justify-start items-center gap-6">
                        <Root.File
                            name="step_0.logo"
                            sizeContainer="80px"
                        />
                        <Root.Input
                            name="step_0.project_name"
                            title="Escreva o nome do seu chat"
                        />
                    </Root.Container>

                    <Root.TextArea
                        name="step_0.chat_input_message.0"
                        title="Digite a primeira mensagem do seu chat"
                    />

                    <SocialProof />
                </Root.EditStep>

                <Root.EditStep
                    index={1}
                    titleStep="Configurações do chat"
                >
                    <Root.Select
                        name="step_1.prompt_id"
                        options={prompt.map((prompt: Database) => Object({ value: prompt.id, text: prompt.prompt_name }))}
                        title="Selecione sua fonte de dados"
                    />

                    <Root.TextArea
                        name="step_1.bio"
                        title="Escreva uma descrição para seu chat"
                    />

                    <CallToActionFormChat prompts={prompt} />
                </Root.EditStep>

                {/* Será adicionado posteriormente na wipzee */}
                {/* <Root.EditStep
                    index={2}
                    titleStep="Eventos e rastreamentos"
                >
                    <Root.Input
                        name="step_2.facebook_pixel"
                        title="Adicione o pixel do seu facebook"
                    />
                </Root.EditStep> */}

                <Root.EditStep
                    index={2}
                    titleStep="Aparência do chat"
                >
                    <Root.Container className="w-full flex flex-col items-center gap-8" >

                        <div className="flex flex-col justify-center gap-4">
                            <h2 className="text-center text-xl">Escolha um icone para seu chat</h2>
                            <div className="flex justify-center gap-2 md:gap-4 text-5xl">
                                {
                                    CHAT_ICONS_MODELS.map(({ Icon, id }, index: number) =>
                                        <Icon
                                            key={id}
                                            data-iscurrent={(currentIcon - 1) === index}
                                            className="hover:bg-primary-100 data-[iscurrent=true]:bg-primary-100 cursor-pointer rounded-full p-2"
                                            onClick={() => handleSelectIcon(id)}
                                        />
                                    )
                                }
                            </div>
                        </div>

                        <Root.Input
                            name="step_3.chat_appearance.icon_text"
                            title="Digite o texto que será exibido ao lado do icon"
                        />

                        <Root.Container
                            className="w-full flex"
                            title="Defina as cores do seu chat"
                        >
                            <Root.Color
                                name="step_3.chat_appearance.primary_color"
                                title="Escolha a cor primária do seu chat"
                            />

                            <Root.Color
                                name="step_3.chat_appearance.second_color"
                                title="Escolha a cor secundária do seu chat"
                            />

                            <Root.Color
                                name="step_3.chat_appearance.background"
                                title="Escolha a cor do background do seu chat"
                            />

                        </Root.Container>


                    </Root.Container>

                </Root.EditStep>

                <Root.EditStep
                    index={3}
                    titleStep="Configuração avançadas"
                >
                    <Root.Container className="flex flex-col items-center p-2" >
                        <Root.Input
                            name="step_4.slug"
                            title="Altere a slug do seu chat"
                        />

                        <SimulatorSlugUrl />

                        <div className="w-4/5 md:w-auto flex flex-col items-center md:items-start">
                            <span className="font-medium uppercase">Lembre-se</span>
                            <span className="opacity-70 text-center md:text-left">
                                Ao trocar a slug do seu chat, todos seus clientes que possuirem a URL antiga, podem perder acesso ao seu site utilizando a antiga URL.
                            </span>
                        </div>
                    </Root.Container>
                </Root.EditStep>
            </Root.EditForm>

        </div>
    )
};







