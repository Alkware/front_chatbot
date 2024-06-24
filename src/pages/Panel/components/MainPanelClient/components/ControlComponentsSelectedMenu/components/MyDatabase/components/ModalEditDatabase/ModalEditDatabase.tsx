import { Dispatch, SetStateAction, useContext } from "react";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../../../components/modal/templates/PopOver";
import { CreateDatabase, Database } from "../../../../../../../../../../@types/Database.types";
import { daleteDatabase, updateDatabase } from "../../../../../../../../../../api/Prompt";
import { Root } from "../../../../../../../../../../components/Form/FormRoot";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { DatabaseSchema, databaseSchema } from "../../../../../../../../../../schema/zod/databaseSchema";
import { transformSchemaInText } from "../../../../../../../../../../schema/PromptIA/transformSchemaInText";
import { FaCircleInfo, FaFaceGrinBeam } from "react-icons/fa6";
import { FaBook, FaInfo, FaSuitcase } from "react-icons/fa";
import { ClientContext } from "../../../../../../../../../../context/ClientContext";
import { AddProduct } from "../../../../../../../../../CreateDatabase/components/FormCreateDatabase/components/StepProdutinformation/components/AddProduct/AddProduct";
import { OpeningHours } from "../../../../../../../../../CreateDatabase/components/FormCreateDatabase/components/StepAboutCompany/components/OpeningHours/OpeningHours";
import { saveImage } from "../../../../../../../../../../api/images";
import { StepPaymentMethodAndConditions } from "../../../../../../../../../CreateDatabase/components/FormCreateDatabase/components/StepPaymentMethodAndConditions/StepPaymentMethodAndConditions";

interface ModalEditDatabase {
    prompt: Database,
    setPrompts: Dispatch<SetStateAction<Database[]>>,
}

export function ModalEditDatabase({ prompt, setPrompts }: ModalEditDatabase) {
    const { setModalContent, clearModal } = useContext(ModalContext);
    const { client, setClient } = useContext(ClientContext);
    const promptData: DatabaseSchema = JSON.parse(prompt.prompt_query || "{}")
    const checkPromptIsAvalible = !!Object.keys(promptData).length ? true : false;
    const updateDatabaseForm = useForm<DatabaseSchema>({
        resolver: zodResolver(databaseSchema),
        defaultValues: !checkPromptIsAvalible ? undefined : {
            step_0: {
                products: promptData.step_0.products || "",
                observation: promptData.step_0.observation,
            },
            step_1: {
                payment_methods: promptData.step_1.payment_methods || [],
                credit_card_installments: promptData.step_1.credit_card_installments || "",
                order_tracking: promptData.step_1.order_tracking || "",
                tracking_link: promptData.step_1.tracking_link || ""
            },
            step_2: {
                warranty_time: promptData.step_2.warranty_time || { time: 0, type: "" },
                how_exchanges_work_and_returns: promptData.step_2.how_exchanges_work_and_returns || "",
                how_guarantee_work: promptData.step_2.how_guarantee_work || ""
            },
            step_3: {
                address: promptData.step_3.address || "",
                company_name: promptData.step_3.company_name || "",
                contact_email: promptData.step_3.contact_email || "",
                contact_phone_number: promptData.step_3.contact_phone_number || "",
                support_hours: promptData.step_3.support_hours || "",
            },
            step_4: {
                client_describe: promptData.step_4.client_describe || "",
                ia_name: promptData.step_4.ia_name || "",
                restrictions: promptData.step_4.restrictions
            }
        }
    });

    const handleUpdateDatabase = async (data: DatabaseSchema) => {
        const convertToString = JSON.stringify(data);
        const promptSchema = transformSchemaInText(data);

        const database: CreateDatabase = {
            prompt_name: prompt.prompt_name,
            prompt: promptSchema,
            prompt_query: convertToString,
            client_describe: data.step_4.client_describe,
        };

        if (database) {
            const databaseUpdated = await updateDatabase(database, prompt.id);
            if (databaseUpdated && client && databaseUpdated.status === 200) {
                // Salva as imagens dos produtos no banco de dados...
                data.step_0.products.forEach(async (product) => {
                    await saveImage({
                        client_id: client.id,
                        prompt_id: prompt.id,
                        url: product.image.url,
                        description: product.image.description
                    });
                })
                setPrompts(prompts => [...prompts.filter(p => p.id !== databaseUpdated.data.id), databaseUpdated.data])
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
    }

    async function handleDeleteDatabase() {
        if (prompt.id) {
            // aqui pode ser tanto deleteProject quanto deleteDatabase. Esse é o problema!
            const deleted = await daleteDatabase(prompt.id);

            if (deleted?.status === 200) {
                // Remove esse prompt da lista de prompts que está sendo mostrado para o cliente
                setPrompts((data: any) => data.filter((d: any) => d.id !== deleted.data.id));
                //Busca o index desse prompt na lista de prompts do usuário
                const findIndex = client?.plan_management.prompt.findIndex(p => p.id === prompt.id)
                // Prompt removido para que seja atualizado de maneira ficticia a quantidade de prompts,
                // assim possibilita a criação de novos prompts mesmo que a lista não seja atualizada

                if (client && typeof findIndex === "number") {
                    client.plan_management.prompt.splice(findIndex, 1)
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
                onDelete={handleDeleteDatabase}
                onSubmit={handleUpdateDatabase}
            >

                <Root.EditStep
                    index={0}
                    titleStep="Informações do produto"
                    icon={<FaCircleInfo />}
                >
                    <AddProduct />

                    <Root.Optional
                        text="Deseja adicionar alguma observação sobre seus produtos?"
                        name="step_0.observation"
                    >
                        <Root.TextArea
                            name="step_0.observation"
                            title="Deixe uma observação sobre seus produtos"

                        />
                    </Root.Optional>
                </Root.EditStep>

                <Root.EditStep
                    index={1}
                    titleStep="Métodos de pagamento"
                    icon={<FaInfo />}
                >
                   <StepPaymentMethodAndConditions />
                </Root.EditStep>

                <Root.EditStep
                    index={2}
                    titleStep="Politicas e condições"
                    icon={<FaBook />}
                >
                    <Root.Container className="flex gap-4" >
                        <Root.Select
                            name="step_2.warranty_time.type"
                            title="Tipo de data"
                            options={[
                                { text: "Dia(s)", value: "dia" },
                                { text: "Mês(s)", value: "mes" },
                                { text: "Ano(s)", value: "ano" },
                            ]}
                        />

                        <Root.Input
                            type="number"
                            name="step_2.warranty_time.time"
                            title="Tempo de garantia?"
                        />

                    </Root.Container>

                    <Root.TextArea
                        name="step_2.how_guarantee_work"
                        title="Como funciona a garantia?"
                    />

                    <Root.Optional
                        name="step_2.how_exchanges_work_and_returns"
                        text="Esse produto/serviço possui trocas e devoluções?"
                    >
                        <Root.TextArea
                            name="step_2.how_exchanges_work_and_returns"
                            title="Como funciona as trocas e devoluções?"
                        />
                    </Root.Optional>
                </Root.EditStep>

                <Root.EditStep
                    index={3}
                    titleStep="Sobre a empresa"
                    icon={<FaSuitcase />}
                >
                    <Root.Container className="flex gap-4" >
                        <Root.Input
                            name="step_3.company_name"
                            title="Qual o nome da empresa?"
                        />
                    </Root.Container>

                    <Root.Container className="flex flex-col md:flex-row gap-4" >
                        <Root.Input
                            name="step_3.contact_email"
                            title="Digite um e-mail para contato"
                        />

                        <Root.Input
                            title="Digite um telefone para contato"
                            name="step_3.contact_phone_number"
                            onChange={({ target }) => {
                                const numeric = target.value.replace(/[^\d]/g, '');
                                if (numeric.length < 11) {
                                    let cellPhone;
                                    if (numeric.length === 11) {
                                        cellPhone = numeric.replace(
                                            /^(\d{2})(\d{1})(\d{4})(\d{4})$/,
                                            '($1) $2 $3-$4'
                                        );
                                    } else {
                                        cellPhone = numeric.replace(
                                            /^(\d{2})(\d{4})(\d{4})$/,
                                            '($1) $2-$3'
                                        );
                                    }

                                    target.value = cellPhone
                                } else target.value = target.value.substring(0, 15)
                            }
                            }
                        />
                    </Root.Container>

                    <OpeningHours />

                    <Root.Optional
                        name="step_3.address"
                        text="Sua empresa possui um endereço físico?"
                    >
                        <Root.Input
                            name="step_3.address"
                            title="Qual o endereço da sua empresa?"
                        />
                    </Root.Optional>
                </Root.EditStep>

                <Root.EditStep
                    index={4}
                    titleStep="Personalidade da IA "
                    icon={<FaFaceGrinBeam />}
                >

                    <Root.Optional
                        name="step_4.ia_name"
                        text="Deseja dar um nome a sua inteligência artificial?"
                    >
                        <Root.Input
                            name="step_4.ia_name"
                            title="Qual o nome da sua inteligência artificial?"
                        />
                    </Root.Optional>

                    <Root.Optional
                        text="Deseja adicionar restrições de palavras ou frase?"
                        name="step_4.restrictions"
                    >
                        <Root.Input
                            name="step_4.restrictions"
                            title="Faça uma lista de restrições para que a IA evite utiliza-la em uma conversa"
                        />
                    </Root.Optional>

                    <Root.TextArea
                        title="Faça uma breve descrição de quem é seu público (cliente)"
                        name="step_4.client_describe"
                    />

                </Root.EditStep>



            </Root.EditForm>

        </div >
    )
};