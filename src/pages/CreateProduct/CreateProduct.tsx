import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Root } from "../../components/Form/FormRoot";
import { StepBasicProductInfo } from "./components/StepBasicProductInfo/StepBasicProductInfo"
import { setThemePage } from "../../functions/setThemePage";
import { productSchema, ProductSchema } from "../../schema/zod/productSchema";
import { StepProductPaymentMethodAndConditions } from "./components/StepPaymentMethodAndConditions/StepPaymentMethodAndConditions";
import { StepAdvancedProductInfo } from "./components/StepAdvancedProductInfo/StepAdvancedProductInfo";
import { StepAboutProductWarranty } from "./components/StepAboutProductWarranty/StepAboutProductWarranty";
import { loading } from "../../functions/loading";
import { ModalContext } from "../../context/ModalContext";
import { PopOver } from "../../components/modal/templates/PopOver";
import { createNewProduct } from "../../api/product.api";
import { getPlanManagementById } from "../../api/planManagement";

export function CreateProduct() {
    const { setModalContent } = useContext(ModalContext);
    const [client_id, setClientId] = useState<string>();
    const { category_name, plan_management_id } = useParams();
    const containerCreateProductRef: RefObject<HTMLDivElement> = useRef(null);
    const createDatabaseForm = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
    });
    const { handleSubmit } = createDatabaseForm

    useEffect(() => {
        (async () => {
            const response = await getPlanManagementById(plan_management_id);
            response && setClientId(response.client_id)

            // define o thema da página de login
            setThemePage();
        })()
    }, [])

    const handleCreateProduct = async (data: ProductSchema) => {
        if (!category_name || !plan_management_id) {
            console.error("Category name ou plan_management_id is missing!");
            return;
        }

        // Busca o botão para ser adicionado o loading...
        const button = containerCreateProductRef.current?.querySelector("button");
        // Adiciona o loading no botão...
        loading(button, true);

        // Cria o novo produto...
        const response = await createNewProduct({
            ...data,
            plan_management_id,
            category: { name: category_name },
        });

        // Verifica se o produto foi criado...
        if (!response) {
            setModalContent({
                componentName: "modal_failed_create_product",
                components:
                    <PopOver
                        componentName="modal_failed_create_product"
                        message="Falha ao tentar criar o produto, tente entrar em contato com o suporte."
                        type="WARNING"
                    />
            })
            return;
        }

        // Desativa o loading...
        loading(button, false)
        // Envia uma mensagem que a fonte de dados foi criada com sucesso...
        setModalContent({
            componentName: "modal_created_product",
            components:
                <PopOver
                    componentName="modal_created_product"
                    message="Produto criado com sucesso!"
                    functionAfterComplete={() => window.location.href = "/panel?tab=products"}
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
                    onSubmit={handleSubmit(handleCreateProduct)}
                    form={createDatabaseForm}
                >
                    <Root.Step
                        index={0}
                        stepTitle="Informações básicas"
                    >
                        <StepBasicProductInfo
                            client_id={client_id}
                        />
                    </Root.Step>

                    <Root.Step index={1}
                        stepTitle="Métodos de pagamentos e condições"
                    >
                        <StepProductPaymentMethodAndConditions />
                    </Root.Step>

                    <Root.Step
                        index={2}
                        stepTitle="Garantia do produto"
                    >
                        <StepAboutProductWarranty />
                    </Root.Step>

                    <Root.Step
                        index={3}
                        stepTitle="Informações avançadas"
                    >
                        <StepAdvancedProductInfo />
                    </Root.Step>
                </Root.Form>
            </div>
        </div >
    )
};




