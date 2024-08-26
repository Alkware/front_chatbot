import { Root } from "../../../../components/Form/FormRoot";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { ModalContext } from "../../../../context/ModalContext";
import { artificialIntelligenceSchema, ArtificialIntelligenceSchema } from "../../../../schema/zod/artificialIntelligenceSchema";
import { StepAboutCompany } from "./components/StepAboutCompany/StepAboutCompany";
import { StepPersonalityIA } from "./components/StepPersonalityIA/StepPersonalityIA";
import { useForm } from "react-hook-form";
import { DATABASE_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../variables/variables";
import { PopUp } from "../../../../components/modal/templates/PopUp";
import { StepAddProducts } from "./components/StepAddProducts/StepAddProducts";
import { PlanManagement } from "../../../../@types/planManagement";
import { ModalCreateArtificialIntelligence } from "./components/ModalCreateArtificialIntelligence/ModalCreateArtificialIntelligence";

interface FormCreateDatabase { plan_management_id: string, planManagement: PlanManagement }

export function FormCreateDatabase({ plan_management_id, planManagement }: FormCreateDatabase) {
    const { setModalContent } = useContext(ModalContext);
    const localStorageDatabase = JSON.parse(localStorage.getItem(DATABASE_NAME_TO_SAVE_LOCALSTORAGE) || "{}");
    const hasProducts = !!planManagement.products.length || !!planManagement.services.length;

    const createDatabaseForm = useForm<ArtificialIntelligenceSchema>({
        resolver: zodResolver(artificialIntelligenceSchema),
        defaultValues: {
            products_id: localStorageDatabase.products_id || [],
            services_id: localStorageDatabase.services_id || [],
            artificial_name:localStorageDatabase.artificial_name || "",
            client_describe: localStorageDatabase.client_describe || "",
            restrictions: localStorageDatabase.restrictions
        }
    });
    const { handleSubmit } = createDatabaseForm

    const handleCreateDatabase = (data: any) => {
        setModalContent({
            componentName: "modal_create_name",
            components:
                <PopUp>
                    <ModalCreateArtificialIntelligence
                        info={data}
                        plan_management_id={plan_management_id}
                    />
                </PopUp>
        })
    }

    return (
        <Root.Form
            onSubmit={handleSubmit(handleCreateDatabase)}
            form={createDatabaseForm}
        >

            <Root.Step
                index={hasProducts ? 0 : -1}
                hidden={!hasProducts}
                stepTitle="Vincule seus produtos"
            >
                <StepAddProducts
                    plan_management_id={plan_management_id}
                />
            </Root.Step>
            <Root.Step index={hasProducts ? 1 : 0} stepTitle="Sobre a empresa">
                <StepAboutCompany 
                    companies={planManagement.client_company}
                />
            </Root.Step>

            <Root.Step index={hasProducts ? 2 : 1} stepTitle="Personalidade da IA">
                <StepPersonalityIA />
            </Root.Step>

        </Root.Form>
    )
};
