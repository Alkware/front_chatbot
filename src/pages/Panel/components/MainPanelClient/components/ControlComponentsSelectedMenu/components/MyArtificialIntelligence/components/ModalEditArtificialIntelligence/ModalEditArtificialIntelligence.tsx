import { Dispatch, SetStateAction, useContext } from "react";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../../../components/modal/templates/PopOver";
import { daleteArtificialIntelligence, updateArtificialIntelligence } from "../../../../../../../../../../api/artificialIntelligence.api";
import { Root } from "../../../../../../../../../../components/Form/FormRoot";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { artificialIntelligenceSchema, ArtificialIntelligenceSchema } from "../../../../../../../../../../schema/zod/artificialIntelligenceSchema";
// import { transformSchemaInText } from "../../../../../../../../../../schema/PromptIA/transformSchemaInText";
import { FaCircleInfo } from "react-icons/fa6";
import { FaBrain, FaBuilding } from "react-icons/fa";
import { ClientContext } from "../../../../../../../../../../context/ClientContext";
import { Artificial_Intelligence, Info_Artificial_Intelligence } from "../../../../../../../../../../@types/artificialInteligence.types";
import { StepAddProducts } from "../../../../../../../../../CreateArtificialIntelligence/components/FormCreateDatabase/components/StepAddProducts/StepAddProducts";
import { StepAboutCompany } from "../../../../../../../../../CreateArtificialIntelligence/components/FormCreateDatabase/components/StepAboutCompany/StepAboutCompany";
import { StepPersonalityIA } from "../../../../../../../../../CreateArtificialIntelligence/components/FormCreateDatabase/components/StepPersonalityIA/StepPersonalityIA";

interface ModalEditArtificialIntelligence {
    plan_management_id: string;
    intelligence: Artificial_Intelligence,
    setIntelligence: Dispatch<SetStateAction<Artificial_Intelligence[]>>,
}

export function ModalEditArtificialIntelligence({ plan_management_id, intelligence, setIntelligence }: ModalEditArtificialIntelligence) {
    const { setModalContent, clearModal } = useContext(ModalContext);
    const { client, setClient } = useContext(ClientContext);
    const updateAiForm = useForm<ArtificialIntelligenceSchema>({
        resolver: zodResolver(artificialIntelligenceSchema),
        defaultValues: {
            products_id: intelligence.ai_products_Services.map(ai => ai.product_id),
            services_id: intelligence.ai_products_Services.map(ai => ai.service_id),
            client_describe: intelligence.client_describe || "",
            artificial_name: intelligence.artificial_name || "",
            restrictions: intelligence.restrictions || "",
        }
    });

    /**
     * Função responsável por atualizar as informações da inteligência artificial...
     * @param {Info_Artificial_Intelligence} data Objeto com as informações que serão atualizadas...
     */
    const handleUpdateArtificialIntelligence = async (data: Info_Artificial_Intelligence) => {

        const ai: Info_Artificial_Intelligence = {
            products_id: data.products_id,
            services_id: data.services_id,
            identification: data.identification,
            artificial_name: data.artificial_name,
            restrictions: data.restrictions,
            client_describe: data.client_describe,
            plan_management_id: intelligence.plan_management_id,
            client_company_id: data.client_company_id
        };

        const aiUpdated = await updateArtificialIntelligence(ai, intelligence.id);

        if (aiUpdated && client && aiUpdated.status === 200) {
            setIntelligence(intelli => [...intelli.filter(i => i.id !== aiUpdated.data.id), aiUpdated.data])
            setModalContent({
                componentName: "modal_updated_ai",
                components:
                    <PopOver
                        message="Inteligência artificial atualizada com sucesso"
                        componentName="modal_updated_ai"
                        functionAfterComplete={() => clearModal(null, { clearAll: true })}
                    />
            })
        }
    }

    /** 
     * Função responsável por deletar uma inteligencia artificial
     */
    async function handleDeleteArtificialIntelligence() {
        if (intelligence.id) {
            const deleted = await daleteArtificialIntelligence(intelligence.id);

            if (deleted?.status === 200) {
                // Remove esse prompt da lista de prompts que está sendo mostrado para o cliente
                setIntelligence((data: any) => data.filter((d: any) => d.id !== deleted.data.id));
                //Busca o index desse prompt na lista de prompts do usuário
                const findIndex = client?.plan_management?.artificial_intelligence.findIndex(p => p.id === intelligence.id)
                // Prompt removido para que seja atualizado de maneira ficticia a quantidade de prompts,
                // assim possibilita a criação de novos prompts mesmo que a lista não seja atualizada

                if (client && typeof findIndex === "number") {
                    client.plan_management?.artificial_intelligence.splice(findIndex, 1)
                    setClient(client)
                }

                setModalContent({
                    componentName: "modal_delete_success",
                    components:
                        <PopOver
                            message="Inteligência artificial excluida com sucesso!"
                            componentName="modal_delete_success"
                            functionAfterComplete={() => clearModal(null, { clearAll: true })}
                        />
                })
            } else if (deleted?.status === 401) {
                setModalContent({
                    componentName: "modal_failed_delete_ai",
                    components:
                        <PopOver
                            message="Você não pode excluir uma inteligência artificial que possui um chat vinculado a ela, tente excluir todos os chats primeiro, antes de excluir essa fonte de dados."
                            type="ERROR"
                            componentName="modal_failed_delete_ai"
                        />
                })
            } else {
                setModalContent({
                    componentName: "modal_failed_delete",
                    components:
                        <PopOver
                            message="Falha ao tentar excluir essa inteligência artificial. Tente reiniciar a página e tentar de novo."
                            type="ERROR"
                            componentName="modal_failed_delete"
                        />
                })
            }
        }
    }


    return (
        <div className="w-screen h-screen px-4 md:px-0 md:min-h-[450px] md:min-w-[700px] flex items-start overflow-hidden">
            <Root.EditForm
                form={updateAiForm}
                onSubmit={handleUpdateArtificialIntelligence}
                onDelete={handleDeleteArtificialIntelligence}
            >

                <Root.EditStep
                    index={0}
                    titleStep="Vincule seus produtos"
                    icon={<FaCircleInfo />}
                >
                    <StepAddProducts
                        plan_management_id={plan_management_id}
                        ai_products_services={intelligence.ai_products_Services}
                    />
                </Root.EditStep>

                <Root.EditStep
                    index={1}
                    titleStep="Sobre sua empresa"
                    icon={<FaBuilding />}
                >
                    <StepAboutCompany
                        companies={client?.plan_management?.client_company}
                    />
                </Root.EditStep>

                <Root.EditStep
                    index={2}
                    titleStep="Personalidade da AI"
                    icon={<FaBrain />}
                >
                    <StepPersonalityIA />
                </Root.EditStep>
            </Root.EditForm>

        </div >
    )
};