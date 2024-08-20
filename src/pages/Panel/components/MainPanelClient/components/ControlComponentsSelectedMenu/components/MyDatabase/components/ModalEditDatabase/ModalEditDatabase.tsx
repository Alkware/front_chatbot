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
import { FaBook, FaInfo } from "react-icons/fa";
import { ClientContext } from "../../../../../../../../../../context/ClientContext";
import { Artificial_Intelligence } from "../../../../../../../../../../@types/artificialInteligence.types";
import { StepAddProducts } from "../../../../../../../../../CreateDatabase/components/FormCreateDatabase/components/StepAddProducts/StepAddProducts";
import { StepAboutCompany } from "../../../../../../../../../CreateDatabase/components/FormCreateDatabase/components/StepAboutCompany/StepAboutCompany";
import { StepPersonalityIA } from "../../../../../../../../../CreateDatabase/components/FormCreateDatabase/components/StepPersonalityIA/StepPersonalityIA";

interface ModalEditDatabase {
    plan_management_id: string;
    intelligence: Artificial_Intelligence,
    setIntelligence: Dispatch<SetStateAction<Artificial_Intelligence[]>>,
}

export function ModalEditArtificialIntelligence({ plan_management_id, intelligence, setIntelligence }: ModalEditDatabase) {
    const { setModalContent, clearModal } = useContext(ModalContext);
    const { client, setClient } = useContext(ClientContext);

    const updateDatabaseForm = useForm<ArtificialIntelligenceSchema>({
        resolver: zodResolver(artificialIntelligenceSchema),
        defaultValues: {
            client_company_id: intelligence.client_company_id,
            client_describe: intelligence.client_describe || "",
            artificial_name: intelligence.artificial_name || "",
            restrictions: intelligence.restrictions || ""
        }
    });

    const handleUpdateArtificialIntelligence = async (data: ArtificialIntelligenceSchema) => {

        const ai = {
            artificial_name: data.artificial_name,
            restrictions: data.restrictions,
            client_describe: data.client_describe,
            plan_management_id: intelligence.plan_management_id,
            client_company_id: data.client_company_id
        };

        const databaseUpdated = await updateArtificialIntelligence(ai, intelligence.id);

        if (databaseUpdated && client && databaseUpdated.status === 200) {
            setIntelligence(intelli => [...intelli.filter(i => i.id !== databaseUpdated.data.id), databaseUpdated.data])
            setModalContent({
                componentName: "modal_updated_database",
                components:
                    <PopOver
                        message="Database atualizado com sucesso"
                        componentName="modal_updated_database"
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
            // aqui pode ser tanto deleteProject quanto deleteDatabase. Esse é o problema!
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
                            message="Fonte de dados excluido com sucesso!"
                            componentName="modal_delete_success"
                            functionAfterComplete={() => clearModal(null, { clearAll: true })}
                        />
                })
            } else if (deleted?.status === 500) {
                setModalContent({
                    componentName: "modal_failed_delete_database",
                    components:
                        <PopOver
                            message="Você não pode excluir uma fonte de dados que possui um chat vinculado a ela, tente excluir todos os chats primeiro, antes de excluir essa fonte de dados."
                            type="ERROR"
                            componentName="modal_failed_delete_database"
                        />
                })
            } else {
                setModalContent({
                    componentName: "modal_failed_delete",
                    components:
                        <PopOver
                            message="Falha ao tentar excluir essa fonte de dados. Tente reiniciar a página e tentar de novo."
                            type="ERROR"
                            componentName="modal_failed_delete"
                        />
                })
            }
        }
    }


    return (
        <div className="w-screen h-screen px-4 md:px-0 md:w-[90vw] md:h-[80vh] md:min-h-[450px] md:min-w-[700px] flex items-start overflow-hidden">
            <Root.EditForm
                form={updateDatabaseForm}
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
                    />
                </Root.EditStep>

                <Root.EditStep
                    index={1}
                    titleStep="Métodos de pagamento"
                    icon={<FaInfo />}
                >
                    <StepAboutCompany
                        companies={client?.plan_management?.client_company}
                    />
                </Root.EditStep>

                <Root.EditStep
                    index={2}
                    titleStep="Politicas e condições"
                    icon={<FaBook />}
                >
                    <StepPersonalityIA />
                </Root.EditStep>
            </Root.EditForm>

        </div >
    )
};