import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { Project } from "../../../../../../../../../../../../@types/Project";
import { checkSlugIsAvailable, deleteProject, updateProject } from "../../../../../../../../../../../../api/project";
import { PopOver } from "../../../../../../../../../../../../components/modal/templates/PopOver";
import { ModalContext } from "../../../../../../../../../../../../context/ModalContext";
import { useForm } from "react-hook-form";
import { Root } from "../../../../../../../../../../../../components/Form/FormRoot";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { ChatSchema, chatSchema } from "../../../../../../../../../../../../schema/zod/chatSchema";
import { getPlanManagementById } from "../../../../../../../../../../../../api/planManagement";
import { AxiosResponse } from "axios";
import { useSearchParams } from "react-router-dom";
import { CTA_NAME_URL } from "../../../../../../../../../../../../variables/variables";
import { ClientContext } from "../../../../../../../../../../../../context/ClientContext";
import { PopUp } from "../../../../../../../../../../../../components/modal/templates/PopUp";
import { Confirm } from "../../../../../../../../../../../../components/modal/templates/Confirm";
import { Artificial_Intelligence } from "../../../../../../../../../../../../@types/artificialInteligence.types";
import { StepBasicInfoChat } from "../../../../../../../../../../../CreateChat/components/StepBasicInfoChat/StepBasicInfoChat";
import { StepLinksChat } from "../../../../../../../../../../../CreateChat/components/StepLinksChat/StepLinksChat";
import { StepTrackingChat } from "../../../../../../../../../../../CreateChat/components/StepTrackingChat/StepTrackingChat";
import { StepCustomChat } from "../../../../../../../../../../../CreateChat/components/StepCustomChat/StepCustomChat";
import { StepAdvancedInfoChat } from "../../../../../../../../../../../CreateChat/components/StepAdvancedInfoChat/StepAdvancedInfoChat";


interface ModalEditChat {
    project: Project,
    ai: Artificial_Intelligence[],
    setProjects: Dispatch<SetStateAction<Project[]>>
}

export function ModalEditChat({ project, setProjects, ai }: ModalEditChat) {
    const { setModalContent, clearModal } = useContext(ModalContext);
    const { setClient, client } = useContext(ClientContext)
    const [artificialIntelligence, setArtificialIntelligence] = useState<Artificial_Intelligence[]>();
    const [params, setParams] = useSearchParams();
    const editChatForm = useForm<ChatSchema>({
        resolver: zodResolver(chatSchema),
        defaultValues: {
            step_0: {
                project_name: project.project_name,
                chat_input_message: project.chat_input_message,
                logo_id: project.logo.id,
            },
            step_1: {
                artificial_intelligence_id: project?.artificial_intelligence?.id,
                bio: project.bio,
                links: project.links,
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
            if (response) {
                setArtificialIntelligence(response.artificial_intelligence)
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



    return (
        (!!artificialIntelligence?.length && !!client) &&
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
                    <StepBasicInfoChat
                        client_id={client.id}
                        imageDefault={[{image: project.logo}]}
                    />
                </Root.EditStep>

                <Root.EditStep
                    index={1}
                    titleStep="Configurações do chat"
                >
                    <StepLinksChat
                        artificialInteligence={ai}
                        createChatForm={editChatForm}
                    />
                </Root.EditStep>
                <Root.EditStep
                    index={2}
                    titleStep="Eventos e rastreamentos"
                >
                    <StepTrackingChat />
                </Root.EditStep>

                <Root.EditStep
                    index={3}
                    titleStep="Aparência do chat"
                >
                    <StepCustomChat />
                </Root.EditStep>

                <Root.EditStep
                    index={4}
                    titleStep="Configuração avançadas"
                >
                    <StepAdvancedInfoChat />
                </Root.EditStep>
            </Root.EditForm>

        </div>
    )
};







