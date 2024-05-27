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
import { FORM_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../variables/variables";
import { PopUp } from "../../../../components/modal/templates/PopUp";
import { Button } from "../../../../components/button/Button";
import { StepPaymentMethodAndConditions } from "./components/StepPaymentMethodAndConditions/StepPaymentMethodAndConditions";
import { loading } from "../../../../functions/loading";

export function FormCreateDatabase({ plan_management_id }: { plan_management_id: string }) {
    const { setModalContent } = useContext(ModalContext);
    const containerCreateDatabaseRef: RefObject<HTMLDivElement> = useRef(null);
    const localStorageDatabase = JSON.parse(localStorage.getItem(FORM_NAME_TO_SAVE_LOCALSTORAGE) || "{}");
    const createDatabaseForm = useForm<DatabaseSchema>({
        resolver: zodResolver(databaseSchema),
        defaultValues: {
            step_0: {
                products: localStorageDatabase.products || "",
            },
            step_1: {
                payment_methods: localStorageDatabase.payment_methods || "",
                order_tracking: localStorageDatabase.order_tracking || "",
                tracking_link: localStorageDatabase.tracking_link || ""
            },
            step_2: {
                warranty_time: localStorageDatabase.days_of_warranty || 0,
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
                                    const button = containerCreateDatabaseRef.current?.querySelector("button");
                                    loading(button, true)
                                    const prompt = transformSchemaInText(data);
                                    const client_describe = data.step_4.client_describe;
                                    const prompt_query = JSON.stringify(data);

                                    try {
                                        const response = await createNewDatabase({ prompt_name, prompt, client_describe, prompt_query, plan_management_id })
                                        if (response?.status === 201) {
                                            localStorage.removeItem(FORM_NAME_TO_SAVE_LOCALSTORAGE)
                                            loading(button, false)
                                            setModalContent({
                                                componentName: "modal_created_database",
                                                components:
                                                    <PopOver
                                                        componentName="modal_created_database"
                                                        message="Fonte de dados criada com sucesso!"
                                                        type="INFORMATION"
                                                        functionAfterComplete={() => window.location.href = "/panel?tab=0"}
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

            <StepPaymentMethodAndConditions />

            <StepPoliciesAndConditions />

            <StepAboutCompany />

            <StepPersonalityIA />

        </Root.Form>
    )
};
