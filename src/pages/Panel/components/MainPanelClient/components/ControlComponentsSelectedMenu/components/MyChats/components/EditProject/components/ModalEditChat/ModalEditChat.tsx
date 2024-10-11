import { Dispatch, SetStateAction, useContext } from "react"
import { Project } from "../../../../../../../../../../../../@types/Project";
import { checkSlugIsAvailable, deleteProject, updateProject } from "../../../../../../../../../../../../api/project";
import { PopOver } from "../../../../../../../../../../../../components/modal/templates/PopOver";
import { ModalContext } from "../../../../../../../../../../../../context/ModalContext";
import { useForm } from "react-hook-form";
import { Root } from "../../../../../../../../../../../../components/Form/FormRoot";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { ChatSchema, chatSchema } from "../../../../../../../../../../../../schema/chatSchema";
import { ClientContext } from "../../../../../../../../../../../../context/ClientContext";
import { PopUp } from "../../../../../../../../../../../../components/modal/templates/PopUp";
import { Confirm } from "../../../../../../../../../../../../components/modal/templates/Confirm";
import { Artificial_Intelligence } from "../../../../../../../../../../../../@types/artificialInteligence.types";
import { StepBasicInfoChat } from "../../../../../../../../../../../CreateChat/components/StepBasicInfoChat/StepBasicInfoChat";
import { StepLinksChat } from "../../../../../../../../../../../CreateChat/components/StepLinksChat/StepLinksChat";
import { StepTrackingChat } from "../../../../../../../../../../../CreateChat/components/StepTrackingChat/StepTrackingChat";
import { StepCustomChat } from "../../../../../../../../../../../CreateChat/components/StepCustomChat/StepCustomChat";
import { StepAdvancedInfoChat } from "../../../../../../../../../../../CreateChat/components/StepAdvancedInfoChat/StepAdvancedInfoChat";
import { Chat_appearance } from "../../../../../../../../../../../../@types/chatAppearence.types";


interface ModalEditChat {
    project: Project,
    ai: Artificial_Intelligence[],
    setProjects: Dispatch<SetStateAction<Project[]>>
}

export function ModalEditChat({ project, setProjects, ai }: ModalEditChat) {
    const { setModalContent, clearModal } = useContext(ModalContext);
    const { setClient, client } = useContext(ClientContext);
    const editChatForm = useForm<ChatSchema>({
        resolver: zodResolver(chatSchema),
        defaultValues: {
            project_name: project.project_name,
            chat_input_message: project.chat_input_message,
            logo_id: project?.logo?.id || "",
            artificial_intelligence_id: project?.artificial_intelligence_id || "",
            bio: project.bio,
            links: project.links,
            facebook_pixel: project.pixel_facebook,
            chat_appearance: {
                chat_icon: project.chat_appearance?.chat_icon,
                icon_text: project.chat_appearance?.icon_text,
                primary_color: project.chat_appearance?.primary_color,
                second_color: project.chat_appearance?.second_color,
                background: project.chat_appearance?.background,
            },
            slug: project.slug,
        }
    });

    /**
     * Função responsável por atualizar o projeto...
     * @param data 
     * @returns 
     */
    const handleUpdateProject = async (data: Omit<ChatSchema, "chat_appearance"> & { plan_management_id: string, chat_appearance?: Chat_appearance }) => {
        if (!data && !project.slug) return;

        if (data.slug && data.slug !== project.slug && !await checkSlugIsAvailable(data.slug)) {
            setModalContent({
                componentName: "modal_error_slug",
                components:
                    <PopOver
                        componentName="modal_error_slug"
                        message="A slug escolhida não está disponível!"
                        type="WARNING"
                    />
            });
            return;
        };

        data.plan_management_id = project.plan_management_id;
        (data.chat_appearance && project.chat_appearance) && (data.chat_appearance.id = project?.chat_appearance?.id);

        const projectUpdate: Project | void = await updateProject(data, project.slug);
        if (!projectUpdate) {
            setModalContent({
                componentName: "modal_failed_chat_updated",
                components:
                    <PopOver
                        message="Falha ao tentar atualizar o chat, tente entrar em contato com o suporte."
                        componentName="modal_failed_chat_updated"
                        type="WARNING"
                    />
            });
            return;
        };

        setModalContent({
            componentName: "modal_chat_updated",
            components:
                <PopOver
                    message="Chat atualizado com sucesso"
                    componentName="modal_chat_updated"
                    functionAfterComplete={() => {
                        clearModal("modal_edit_project");
                        setProjects(projects => {
                            const newData: any = data;
                            const findIndex = projects.findIndex(p => p.id === project.id)
                            const filterWithoutOutDatedProject = projects.filter(p => p.id !== project.id)
                            // preenchendo alguns dados ficticios até que o usuario recarregue com os dados verdadeiros.
                            newData.is_online = projectUpdate.is_online
                            newData.plan_management_id = projectUpdate.plan_management_id
                            newData.artificial_intelligence_id = projectUpdate.artificial_intelligence_id
                            newData.id = projectUpdate.id
                            newData.chat_appearance = projectUpdate.chat_appearance;
                            newData.logo = projectUpdate.logo;
            
                            // insere o novo dado dentro do array de projeto
                            filterWithoutOutDatedProject.splice(findIndex, 0, newData)
            
                            return filterWithoutOutDatedProject
                        })
                    }}
                />
        });
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
        (!!ai?.length && !!client) &&
        <div className="w-screen h-screen px-4 md:px-0 flex">
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
                        imageDefault={project.logo && [project.logo]}
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
