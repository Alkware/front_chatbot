import { Root } from "../../../../components/Form/FormRoot";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { createNewDatabase } from "../../../../api/Prompt";
import { ModalContext } from "../../../../context/ModalContext";
import { PopOver } from "../../../../components/modal/templates/PopOver";
import { DatabaseSchema, databaseSchema } from "../../../../schema/zod/databaseSchema";
import { StepBasicInformation } from "./components/StepBasicInformation/StepBasicInformation";
import { StepAdvancedInformation } from "./components/StepAdvancedInformation/StepAdvancedInformation";
import { StepDeliveryProduct } from "./components/StepDeliveryProduct/StepDeliveryProduct";
import { StepPoliciesAndConditions } from "./components/StepPoliciesAndConditions/StepPoliciesAndConditions";
import { StepPaymentsMethods } from "./components/StepPaymentsMethods/StepPaymentsMethods";
import { StepAboutCompany } from "./components/StepAboutCompany/StepAboutCompany";
import { StepPersonalityIA } from "./components/StepPersonalityIA/StepPersonalityIA";
import { useForm } from "react-hook-form";
import { encapsulatedSchema } from "../../../../schema/PromptIA/encapsulated";
import { StepCommonQuestions } from "./components/StepCommonQuestions/StepCommonQuestions";
import { FORM_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../variables/variables";



export function FormWithZod({ plan_management_id }: { plan_management_id: string }) {
    const { setModalContent } = useContext(ModalContext);
    const localStorageDatabase = JSON.parse(localStorage.getItem(FORM_NAME_TO_SAVE_LOCALSTORAGE) || "{}");
    const createDatabaseForm = useForm<DatabaseSchema>({
        resolver: zodResolver(databaseSchema),
        defaultValues: {
            step_0: {
                who_created: localStorageDatabase.who_created || "",
                andvisa_record: localStorageDatabase.andvisa_record || "",
                how_works: localStorageDatabase.how_works || "",
                what_is: localStorageDatabase.what_is || "",
            },
            step_1: {
                benefits: localStorageDatabase.benefits || "",
                contraindications: localStorageDatabase.contraindications || "",
                ingredients: localStorageDatabase.ingredients || "",
                side_effects: localStorageDatabase.side_effects || "",
            },
            step_2: {
                average_delivery_time: {
                    end: localStorageDatabase.end || 0,
                    start: localStorageDatabase.start || 0
                },
                order_tracking: localStorageDatabase.order_tracking || "",
                tracking_link: localStorageDatabase.tracking_link || ""
            },
            step_3: {
                days_of_warranty: localStorageDatabase.days_of_warranty || 0,
                disclaimer: localStorageDatabase.disclaimer || "",
                how_exchanges_work_and_returns: localStorageDatabase.how_exchanges_work_and_returns || "",
                how_guarantee_work: localStorageDatabase.how_guarantee_work || ""
            },
            step_4: {
                how_to_buy: localStorageDatabase.how_to_buy || "",
                payment_methods: localStorageDatabase.payment_methods || "",
                products: localStorageDatabase.products || "",
            },
            step_5: {
                address: localStorageDatabase.address || "",
                CNPJ: localStorageDatabase.CNPJ || "",
                company_name: localStorageDatabase.company_name || "",
                contact_email: localStorageDatabase.contact_email || "",
                contact_phone_number: localStorageDatabase.contact_phone_number || "",
                support_hours: localStorageDatabase.support_hours || "",
            },
            step_6: {
                questions: localStorageDatabase.questions || "",
            },
            step_7: {
                client_describe: localStorageDatabase.client_describe || "",
                ia_name: localStorageDatabase.ia_name || "",
                restrictions: localStorageDatabase.restrictions
            }
        }
    });
    const { handleSubmit } = createDatabaseForm

    const handleCreateDatabase = async (data: DatabaseSchema) => {
        const prompt = encapsulatedSchema(data);
        const client_describe = data.step_7.client_describe;
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
                            functionAfterComplete={() => window.location.href = "/panel?tab=2"}
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
            <StepBasicInformation />

            <StepAdvancedInformation />

            <StepDeliveryProduct />

            <StepPoliciesAndConditions />

            <StepPaymentsMethods />

            <StepAboutCompany />

            <StepCommonQuestions />

            <StepPersonalityIA />

        </Root.Form>
    )
};
