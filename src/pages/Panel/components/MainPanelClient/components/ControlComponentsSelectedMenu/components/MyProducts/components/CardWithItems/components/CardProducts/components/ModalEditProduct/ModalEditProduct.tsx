import { useForm } from "react-hook-form"
import { Product } from "../../../../../../../../../../../../../../@types/products.types"
import { Root } from "../../../../../../../../../../../../../../components/Form/FormRoot";
import { StepBasicProductInfo } from "../../../../../../../../../../../../../CreateProduct/components/StepBasicProductInfo/StepBasicProductInfo";
import { Dispatch, SetStateAction, useContext } from "react";
import { ClientContext } from "../../../../../../../../../../../../../../context/ClientContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema, productSchema } from "../../../../../../../../../../../../../../schema/zod/productSchema";
import { StepAdvancedProductInfo } from "../../../../../../../../../../../../../CreateProduct/components/StepAdvancedProductInfo/StepAdvancedProductInfo";
import { StepAboutProductWarranty } from "../../../../../../../../../../../../../CreateProduct/components/StepAboutProductWarranty/StepAboutProductWarranty";
import { StepProductPaymentMethodAndConditions } from "../../../../../../../../../../../../../CreateProduct/components/StepPaymentMethodAndConditions/StepPaymentMethodAndConditions";
import { deleteProduct, updateProduct } from "../../../../../../../../../../../../../../api/product.api";
import { ModalContext } from "../../../../../../../../../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../../../../../../../../../components/modal/templates/PopOver";

interface ModalEditProduct {
    product: Product;
    setProducts: Dispatch<SetStateAction<Product[]>>
}

export function ModalEditProduct({ product, setProducts }: ModalEditProduct) {
    const { client } = useContext(ClientContext)
    const { setModalContent, clearModal } = useContext(ModalContext);
    if (!client) {
        console.error("client is missing!")
        return;
    }
    const form = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            ...product,
            images: product.images?.map(infoImage => infoImage.id),
        }
    });

    const handleUpdateProduct = async (data: Omit<Product, "images_products_services"> & { images_products_services: string[] }) => {
        if (!product.id) {
            window.location.reload();
            return;
        }

        const response = await updateProduct(product.id, data);
        if (!response) {
            setModalContent({
                componentName: "modal_failed_update_product",
                components:
                    <PopOver
                        componentName="modal_failed_update_product"
                        message="Falha ao tentar atualizar o produto, tente entrar em contato com suporte."
                        type="WARNING"
                        functionAfterComplete={() => clearModal(null, { clearAll: true })}
                    />
            });
            return;
        }

        setProducts(values => {
            if (values) {   
                const removeOldProduct = values.filter(value=> value.id !== product.id);
                return [...removeOldProduct, response];
            } else return values;
        });

        setModalContent({
            componentName: "modal_success_update_product",
            components:
                <PopOver
                    componentName="modal_success_update_product"
                    message="Produto atualizado com sucesso!"
                    functionAfterComplete={() => clearModal(null, { clearAll: true })}
                />
        });

    }

    // FUNÇÃO RESPONSÁVEL POR DELETAR O PRODUTO
    const handleDeleteProduct = async () => {

        if (!product.id) {
            window.location.reload();
            return;
        }

        const response = await deleteProduct(product.id);

        if (!response) {
            setModalContent({
                componentName: "modal_failed_delete_product",
                components:
                    <PopOver
                        componentName="modal_failed_delete_product"
                        message="Falha ao tentar deletar o produto, tente entrar em contato com suporte"
                        type="WARNING"
                    />
            });
            return;
        };

        setProducts(values => values.filter(value => value.id !== product.id))

        setModalContent({
            componentName: "modal_success_delete_product",
            components:
                <PopOver
                    componentName="modal_success_delete_product"
                    message="Produto deletado com sucesso!"
                    functionAfterComplete={() => clearModal(null, { clearAll: true })}
                />
        })
    }

    return (
        <Root.EditForm
            form={form}
            onSubmit={handleUpdateProduct}
            onDelete={handleDeleteProduct}
        >
            <Root.EditStep
                titleStep="Informações basicas"
                index={0}
            >
                <StepBasicProductInfo
                    client_id={client.id}
                    product={product}
                />
            </Root.EditStep>

            <Root.EditStep
                index={1}
                titleStep="Métodos de pagamentos e condições"
            >
                <StepProductPaymentMethodAndConditions />
            </Root.EditStep>
            <Root.EditStep
                index={2}
                titleStep="Garantia do produto"
            >
                <StepAboutProductWarranty />
            </Root.EditStep>
            <Root.EditStep
                index={3}
                titleStep="Informações avançadas"
            >
                <StepAdvancedProductInfo />
            </Root.EditStep>
        </Root.EditForm>
    )
};