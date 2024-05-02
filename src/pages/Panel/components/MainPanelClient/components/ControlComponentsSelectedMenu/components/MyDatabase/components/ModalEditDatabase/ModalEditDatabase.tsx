import { Dispatch, SetStateAction, useContext } from "react";
import { ModalContext } from "../../../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../../../components/modal/templates/PopOver";
import { CreatePrompt, Prompt } from "../../../../../../../../../../@types/prompt.types";
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

interface ModalEditDatabase {
    prompt: Prompt,
    setPrompts: Dispatch<SetStateAction<Prompt[]>>,
}

export function ModalEditDatabase({ prompt, setPrompts }: ModalEditDatabase) {
    const { setModalContent, clearModal } = useContext(ModalContext);
    const { client, setClient } = useContext(ClientContext);
    const promptData: DatabaseSchema = JSON.parse(prompt.prompt_query || "{}")
    const checkPromptIsAvalible = !!Object.keys(promptData).length ? true : false


    const updateDatabaseForm = useForm<DatabaseSchema>({
        resolver: zodResolver(databaseSchema),
        defaultValues: !checkPromptIsAvalible ? undefined : {
            step_0: {
                products: promptData.step_0.products || "",
            },
            step_1: {
                payment_methods: promptData.step_1.payment_methods || "",
                order_tracking: promptData.step_1.order_tracking || "",
                tracking_link: promptData.step_1.tracking_link || ""
            },
            step_2: {
                days_of_warranty: promptData.step_2.days_of_warranty || 0,
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

        const database: CreatePrompt = {
            prompt_name: prompt.prompt_name,
            prompt: promptSchema,
            prompt_query: convertToString,
            client_describe: data.step_4.client_describe,
        };

        if (database) {
            const projectUpdate = await updateDatabase(database, prompt.id);
            if (projectUpdate && projectUpdate.status === 200) {
                setPrompts(prompts => [...prompts.filter(p => p.id !== projectUpdate.data.id), projectUpdate.data])
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
                if (client && findIndex) {
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
            }else {
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
        <div className="w-[80vw] h-[70vh] flex overflow-auto  ">

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
                </Root.EditStep>

                <Root.EditStep
                    index={1}
                    titleStep="Métodos de pagamento"
                    icon={<FaInfo />}
                >

                    <Root.Container className="flex gap-4" title="Quais são os métodos de pagamentos aceitos?">
                        <Root.Select
                            title="Escolha seus métodos de pagamentos"
                            isMultiple={true}
                            name="step_1.payment_methods"
                            options={[
                                { value: "Pix", text: "Pix" },
                                { value: "Boleto", text: "Boleto" },
                                { value: "Cartão de débito", text: "Cartão de débito" },
                                { value: "Cartão de crédito", text: "Cartão de crédito" },
                                { value: "Pagamentos em aplicativo", text: "Pagamentos em aplicativo" },
                            ]}
                        />
                    </Root.Container>

                    <Root.TextArea
                        name="step_1.how_to_buy"
                        title="como comprar seu produto?"
                    />

                    <Root.Optional
                        defaultField={""}
                        name="step_1.order_tracking"
                        text="Você está entregando um produto físico?"
                    >
                        <Root.TextArea
                            name="step_1.order_tracking"
                            title="Como os clientes podem rastrear seu pedido?"
                        />
                        <Root.Optional
                            defaultField={""}
                            name="step_1.tracking_link"
                            text="Você possui link para rastrear pedido?"
                        >
                            <Root.Input
                                title="Digite a url do site:"
                                name="step_1.tracking_link"
                                onChange={({ target }) => {
                                    if (!target.value.toLowerCase().includes("http"))
                                        target.value = `https://${target.value.replace("http", "")}`
                                }}
                            />
                        </Root.Optional>
                    </Root.Optional>

                </Root.EditStep>

                <Root.EditStep
                    index={2}
                    titleStep="Politicas e condições"
                    icon={<FaBook />}
                >
                    <Root.Input
                        type="number"
                        name="step_2.days_of_warranty"
                        title="Quantos dias o cliente tem de garantia?"
                    />

                    <Root.TextArea
                        name="step_2.how_guarantee_work"
                        title="Como funciona a garantia?"
                    />
                    <Root.Optional
                        defaultField={""}
                        name="step_2.how_exchanges_work_and_returns"
                        text="Esse produto/serviço possui troca ou devolução?"
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

                    <Root.Input
                        name="step_3.address"
                        title="Qual o endereço da sua empresa?"
                    />

                    <Root.Container className="flex gap-4" >
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

                    <Root.Input
                        name="step_3.support_hours"
                        title="Qual seu horário para suporte humano?"
                    />

                </Root.EditStep>

                <Root.EditStep
                    index={4}
                    titleStep="Personalidade da IA "
                    icon={<FaFaceGrinBeam />}
                >

                    <Root.Optional
                        defaultField={""}
                        name="step_4.ia_name"
                        text="Deseja dar um nome a sua inteligência artificial?"
                    >
                        <Root.Input
                            name="step_4.ia_name"
                            title="Qual o nome da sua inteligência artificial?"
                        />
                    </Root.Optional>

                    <Root.Optional
                        defaultField={""}
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