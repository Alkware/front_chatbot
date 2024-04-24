import { Root } from "../../../../components/Form/FormRoot";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { createNewDatabase } from "../../../../api/Prompt";
import { ModalContext } from "../../../../context/ModalContext";
import { PopOver } from "../../../../components/modal/templates/PopOver";
import { DatabaseSchema, databaseSchema } from "../../../../schema/zod/databaseSchema";
import { StepProdutinformation } from "./components/StepProdutinformation/StepProdutinformation";
import { StepPaymentsAndDeliveryProduct } from "./components/StepPaymentsAndDeliveryProduct/StepPaymentsAndDeliveryProduct";
import { StepPoliciesAndConditions } from "./components/StepPoliciesAndConditions/StepPoliciesAndConditions";
import { StepAboutCompany } from "./components/StepAboutCompany/StepAboutCompany";
import { StepPersonalityIA } from "./components/StepPersonalityIA/StepPersonalityIA";
import { useForm } from "react-hook-form";
import { transformSchemaInText } from "../../../../schema/PromptIA/encapsulated";
import { FORM_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../variables/variables";

export function FormCreateDatabase({ plan_management_id }: { plan_management_id: string }) {
    const { setModalContent } = useContext(ModalContext);
    const localStorageDatabase = JSON.parse(localStorage.getItem(FORM_NAME_TO_SAVE_LOCALSTORAGE) || "{}");
    const createDatabaseForm = useForm<DatabaseSchema>({
        resolver: zodResolver(databaseSchema),
        defaultValues: {
            step_0: {
                products: localStorageDatabase.products || "",
                questions: localStorageDatabase.questions,
            },
            step_1: {
                payment_methods: localStorageDatabase.payment_methods || "",
                how_to_buy: localStorageDatabase.how_to_buy || "",
                order_tracking: localStorageDatabase.order_tracking || "",
                tracking_link: localStorageDatabase.tracking_link || ""
            },
            step_2: {
                days_of_warranty: localStorageDatabase.days_of_warranty || 0,
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

    const handleCreateDatabase = async (data: DatabaseSchema) => {
        const prompt = transformSchemaInText(data);
        const client_describe = data.step_4.client_describe;
        const prompt_query = JSON.stringify(data)

        try {
            const response = await createNewDatabase({ prompt, client_describe, prompt_query, plan_management_id })
            if (response?.status === 201) {
                localStorage.removeItem(FORM_NAME_TO_SAVE_LOCALSTORAGE)

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

    return (
        <Root.Form
            onSubmit={handleSubmit(handleCreateDatabase)}
            form={createDatabaseForm}
        >
            <StepProdutinformation />

            <StepPaymentsAndDeliveryProduct />

            <StepPoliciesAndConditions />

            <StepAboutCompany />

            <StepPersonalityIA />

        </Root.Form>
    )
};
