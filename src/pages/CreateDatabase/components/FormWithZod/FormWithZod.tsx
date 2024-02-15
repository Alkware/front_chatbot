import { Root } from "../../../../components/Form/FormRoot";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
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



export function FormWithZod({ plan_management_id }: { plan_management_id: string }) {
    const { setModalContent } = useContext(ModalContext);
    const navigate = useNavigate();
    const createDatabaseForm = useForm<DatabaseSchema>({ resolver: zodResolver(databaseSchema) });
    const { handleSubmit } = createDatabaseForm

    const handleCreateDatabase = async (data: DatabaseSchema) => {
        const prompt = encapsulatedSchema(data);
        const client_describe = data.step_7.client_describe;
        const prompt_query = JSON.stringify(data)

        try {
            const response = await createNewDatabase({ prompt, client_describe, prompt_query, plan_management_id })
            if (response?.status === 201) {
                setModalContent({
                    componentName: "modal_created_database",
                    components:
                        <PopOver
                            componentName="modal_created_database"
                            message="Fonte de dados criada com sucesso!"
                            type="INFORMATION"
                            functionAfterComplete={() => navigate("/panel?tab=2")}
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
