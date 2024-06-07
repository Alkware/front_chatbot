import { Root } from "../../../../components/Form/FormRoot";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefObject, useContext, useRef } from "react";
import { createNewDatabase } from "../../../../api/Prompt";
import { ModalContext } from "../../../../context/ModalContext";
import { PopOver } from "../../../../components/modal/templates/PopOver";
import { DatabaseSchema, databaseSchema } from "../../../../schema/zod/databaseSchema";
import { StepProdutinformation } from "./components/StepProdutinformation/StepProdutinformation";
import { StepPoliciesAndConditions } from "./components/StepPoliciesAndConditions/StepPoliciesAndConditions";
import { StepAboutCompany } from "./components/StepAboutCompany/StepAboutCompany";
import { StepPersonalityIA } from "./components/StepPersonalityIA/StepPersonalityIA";
import { useForm } from "react-hook-form";
import { transformSchemaInText } from "../../../../schema/PromptIA/transformSchemaInText";
import { DATABASE_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../variables/variables";
import { PopUp } from "../../../../components/modal/templates/PopUp";
import { Button } from "../../../../components/button/Button";
import { StepPaymentMethodAndConditions } from "./components/StepPaymentMethodAndConditions/StepPaymentMethodAndConditions";
import { loading } from "../../../../functions/loading";
import { saveImage } from "../../../../api/images";
import { AxiosResponse } from "axios";
import { Database } from "../../../../@types/Database.types";

export function FormCreateDatabase({ plan_management_id }: { plan_management_id: string }) {
    const { setModalContent } = useContext(ModalContext);
    const containerCreateDatabaseRef: RefObject<HTMLDivElement> = useRef(null);
    const localStorageDatabase = JSON.parse(localStorage.getItem(DATABASE_NAME_TO_SAVE_LOCALSTORAGE) || "{}");

    const createDatabaseForm = useForm<DatabaseSchema>({
        resolver: zodResolver(databaseSchema),
        defaultValues: {
            step_0: {
                products: localStorageDatabase.products || [],
            },
            step_1: {
                payment_methods: localStorageDatabase.payment_methods || [],
                order_tracking: localStorageDatabase.order_tracking || "",
                tracking_link: localStorageDatabase.tracking_link || ""
            },
            step_2: {
                warranty_time: {
                    time: localStorageDatabase.warranty_time?.time || 0,
                    type: localStorageDatabase.warranty_time?.type || "",
                },
                how_exchanges_work_and_returns: localStorageDatabase.how_exchanges_work_and_returns || "",
                how_guarantee_work: localStorageDatabase.how_guarantee_work || ""
            },
            step_3: {
                address: localStorageDatabase.address || "",
                company_name: localStorageDatabase.company_name || "",
                contact_email: localStorageDatabase.contact_email || "",
                contact_phone_number: localStorageDatabase.contact_phone_number || "",
                support_hours: localStorageDatabase.support_hours || "",
            },
            step_4: {
                client_describe: localStorageDatabase.client_describe || "",
                ia_name: localStorageDatabase.ia_name || "",
                restrictions: localStorageDatabase.restrictions
            }
        }
    });
    const { handleSubmit } = createDatabaseForm

    const handleCreateDatabase = (data: DatabaseSchema) => {
        let prompt_name: string | null = null;

        setModalContent({
            componentName: "modal_create_name",
            components:
                <PopUp>
                    <div
                        ref={containerCreateDatabaseRef}
                        className="flex flex-col gap-4 p-4"
                    >
                        <h2>De um nome a essa fonte de dados:</h2>
                        <input
                            type="text"
                            placeholder="Ex: Minha fonte de dados"
                            onChange={(e) => { prompt_name = e.target.value }}
                        />
                        <Button
                            onClick={async () => {
                                if (prompt_name) {
                                    // Busca o botão para ser adicionado o loading...
                                    const button = containerCreateDatabaseRef.current?.querySelector("button");
                                    // Adiciona o loading no botão...
                                    loading(button, true);
                                    // Transforma os dados do cliente em um prompt para ser enviado para IA...
                                    const prompt = transformSchemaInText(data);
                                    // Obtem a descrição do cliente
                                    const client_describe = data.step_4.client_describe;
                                    // Transforma em um json  stringfy para que futuramente possa ser transformado em objeto novamente...
                                    const prompt_query = JSON.stringify(data);

                                    try {
                                        // Cria a fonte de dados...
                                        const response: void | AxiosResponse<Database, any> = await createNewDatabase({ prompt_name, prompt, client_describe, prompt_query, plan_management_id });

                                        if (response?.status === 201) {

                                            // Salva as imagens dos produtos no banco de dados...
                                            data.step_0.products.forEach(async (product) => {
                                                await saveImage({
                                                    client_id: response.data.plan_management.client_id,
                                                    prompt_id: response.data.id,
                                                    url: product.image.url,
                                                    description: product.image.description
                                                });
                                            })
                                            // Remove os dados salvos no localstorage...
                                            localStorage.removeItem(DATABASE_NAME_TO_SAVE_LOCALSTORAGE)
                                            // Desativa o loading...
                                            loading(button, false)
                                            // Envia uma mensagem que a fonte de dados foi criada com sucesso...
                                            setModalContent({
                                                componentName: "modal_created_database",
                                                components:
                                                    <PopOver
                                                        componentName="modal_created_database"
                                                        message="Fonte de dados criada com sucesso!"
                                                        type="INFORMATION"
                                                        functionAfterComplete={() => window.location.href = "/panel?tab=my_chats"}
                                                    />
                                            })
                                        }
                                    } catch (error) {
                                        console.error(error)
                                    }
                                }
                            }}
                        >Salvar</Button>
                    </div>
                </PopUp>
        })
    }

    return (
        <Root.Form
            onSubmit={handleSubmit(handleCreateDatabase)}
            form={createDatabaseForm}
        >
            <StepProdutinformation />

            <Root.Step index={1} stepTitle="Métodos de pagamentos e condições">
                <StepPaymentMethodAndConditions />
            </Root.Step>

            <StepPoliciesAndConditions />

            <StepAboutCompany />

            <StepPersonalityIA />

        </Root.Form>
    )
};
