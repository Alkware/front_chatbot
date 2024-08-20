import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useSearchParams } from "react-router-dom";
import { Root } from "../../components/Form/FormRoot";
import { setThemePage } from "../../functions/setThemePage";
import { loading } from "../../functions/loading";
import { ModalContext } from "../../context/ModalContext";
import { PopOver } from "../../components/modal/templates/PopOver";
import { getPlanManagementById } from "../../api/planManagement";
import { StepBasicServiceInfo } from "./components/StepBasicServiceInfo/StepBasicServiceInfo";
import { StepServicePaymentMethodAndConditions } from "./components/StepServicePaymentMethodAndConditions/StepServicePaymentMethodAndConditions";
import { StepAdvancedServiceInfo } from "./components/StepAdvancedServiceInfo/StepAdvancedProductInfo";
import { serviceSchema, ServiceSchema } from "../../schema/zod/serviceSchema";
import { createNewService } from "../../api/service.api";

export function CreateService() {
    // VARIÁVEIS...
    const { setModalContent } = useContext(ModalContext);
    const [client_id, setClientId] = useState<string>();
    const { category_name, plan_management_id } = useParams();
    const [params] = useSearchParams();
    const origin = params.get("origin");
    const containerCreateProductRef: RefObject<HTMLDivElement> = useRef(null);
    const createDatabaseForm = useForm<ServiceSchema>({
        resolver: zodResolver(serviceSchema),
    });
    const { handleSubmit } = createDatabaseForm

    /**
     * UseEffect para buscar o gerenciador de plano do usuário e definir o thema padrão da página..
     */
    useEffect(() => {
        (async () => {
            const response = await getPlanManagementById(plan_management_id);
            response && setClientId(response.client_id)

            // define o thema da página de login
            setThemePage();
        })()
    }, [])

    /**
     * Função responsável por criar um novo serviço...
     * @param {ServiceSchema} data Objeto com os dados a serem criados. 
     */
    const handleCreateService = async (data: ServiceSchema) => {
        if (!category_name || !plan_management_id) {
            console.error("Category name ou plan_management_id is missing!");
            return;
        }

        // Busca o botão para ser adicionado o loading...
        const button = containerCreateProductRef.current?.querySelector("button");
        // Adiciona o loading no botão...
        loading(button, true);

        // Cria o novo serviço...
        const response = await createNewService({
            ...data,
            plan_management_id,
            category: { name: category_name },
        });


        // Verifica se o serviço foi criado...
        if (!response) {
            setModalContent({
                componentName: "modal_failed_create_product",
                components:
                    <PopOver
                        componentName="modal_failed_create_product"
                        message="Falha ao tentar criar o serviço, tente entrar em contato com o suporte."
                        type="WARNING"
                    />
            })
            return;
        }

        // Desativa o loading...
        loading(button, false);
        const redirectTo = origin ? `/create-database/${response.plan_management_id}` : "/panel?tab=products"

        // Envia uma mensagem que a fonte de dados foi criada com sucesso...
        setModalContent({
            componentName: "modal_created_service",
            components:
                <PopOver
                    componentName="modal_created_service"
                    message="serviço criado com sucesso!"
                    functionAfterComplete={() => window.location.href = redirectTo}
                />
        })
    };

    return (
        <div className="w-screen min-h-screen bg-gradient-to-br from-primary-100 to-light dark:via-primary-300 via-15% dark:to-dark to-30% text-light flex flex-col justify-start items-center">
            <div
                className="w-[90%] flex flex-col gap-2 justify-start items-center"
                ref={containerCreateProductRef}
            >
                <Root.Form
                    onSubmit={handleSubmit(handleCreateService)}
                    form={createDatabaseForm}
                >
                    <Root.Step
                        index={0}
                        stepTitle="Informações básicas"
                    >
                        <StepBasicServiceInfo
                            client_id={client_id}
                        />
                    </Root.Step>

                    <Root.Step index={1}
                        stepTitle="Métodos de pagamentos e condições"
                    >
                        <StepServicePaymentMethodAndConditions />
                    </Root.Step>

                    <Root.Step
                        index={2}
                        stepTitle="Informações avançadas"
                    >
                        <StepAdvancedServiceInfo />
                    </Root.Step>
                </Root.Form>
            </div>
        </div >
    )
};




