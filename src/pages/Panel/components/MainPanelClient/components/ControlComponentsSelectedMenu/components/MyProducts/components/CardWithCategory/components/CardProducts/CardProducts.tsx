import { Title } from "../../../../../../../../../../../../components/Title/Title"
import { SubTitle } from "../../../../../../../../../../../../components/SubTitle/SubTitle"
import { Product } from "../../../../../../../../../../../../@types/products.types"
import { MdAdd, MdCopyAll, MdDelete } from "react-icons/md"
import { RefObject, useContext, useRef, useState } from "react"
import { ClientContext } from "../../../../../../../../../../../../context/ClientContext"
import { useNavigate } from "react-router-dom"
import { createNewProduct, deleteProduct } from "../../../../../../../../../../../../api/product.api"
import { ModalContext } from "../../../../../../../../../../../../context/ModalContext"
import { PopOver } from "../../../../../../../../../../../../components/modal/templates/PopOver"


interface CardProducts {
    items: Product[]
}

export function CardProducts({ items }: CardProducts) {
    const { setModalContent } = useContext(ModalContext)
    const { client } = useContext(ClientContext);
    const containerProductsRef: RefObject<HTMLDivElement> = useRef(null);
    const [newItems, setNewItems] = useState(items);
    const navigate = useNavigate();

    // FUNÇÃO RESPONSÁVEL REDIRECIONAR O USUÁRIO PARA O FORMULÁRIO DE CRIAÇÃO DE NOVOS PRODUTOS...
    const handleAddProducts = () => {
        if (!client) { console.error("Unable to select offer because the client is missing"); return; }
        navigate(`/create-product/${client.plan_management.id}/${items[0].category.name}`)
    }
    // FUNÇÃO RESPONSÁVEL POR DUPLICAR O PRODUTO...
    const handleDuplicateProduct = async (product: Product) => {
        delete product["id"];
        delete product["created_at"];
        delete product["updated_at"];
        delete product["plan_management"]

        if (!client) {
            console.error("Client id is missing!");
            return;
        }

        // Cria a fonte de dados...
        const response = await createNewProduct({
            ...product,
            product_name: `${product.product_name.split(" ")[0]} ${newItems.length + 1}`,
            plan_management_id: client?.plan_management.id,
            category: { name: product.category.name },
            images: product.images.map(img => img.id)
        });

        setNewItems(values => response ? [...values, response] : values);
    }
    // FUNÇÃO RESPONSÁVEL POR DELETAR O PRODUTO
    const handleDeleteProduct = async (product: Product) => {
        const { id } = product;
        if (!id) return;
        const response = await deleteProduct(id);

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

        setNewItems(values => values.filter(value => value.id !== id));

        setModalContent({
            componentName: "modal_success_delete_product",
            components:
                <PopOver
                    componentName="modal_success_delete_product"
                    message="Produto deletado com sucesso!"
                />
        })
    }

    return (
        <div className="flex flex-col">
            <div
                data-display={!!items[0].category?.name}
                className="w-full flex justify-between items-center bg-primary-100 dark:bg-primary-200 px-4"
            >
                <Title
                    className="font-bold text-light"
                >{items[0].category.name}</Title>
            </div>
            <div
                ref={containerProductsRef}
                className="w-full flex gap-4 justify-start flex-wrap items-center bg-primary-50 dark:bg-primary-300 p-4"
            >
                {newItems.map(product => {
                    return (
                        <div
                            key={product.id}
                            className="group w-20 h-20 flex items-center gap-4 relative hover:scale-105 cursor-pointer transition-transform"
                        >
                            <div className="hidden group-hover:flex gap-1 absolute right-0 top-0 bg-dark/80 p-1 ">
                                <MdCopyAll
                                    className="hover:scale-110 transition-transform fill-white"
                                    onClick={() => handleDuplicateProduct(product)}
                                />
                                <MdDelete
                                    className="hover:scale-110 transition-transform fill-red-400"
                                    onClick={() => handleDeleteProduct(product)}
                                />
                            </div>
                            <img
                                src={product.images[0]?.url || "https://via.placeholder.com/100"}
                                className="w-full h-full object-cover"
                            />
                            <SubTitle
                                className="absolute bottom-0 w-full bg-dark/80 text-light text-sm overflow-hidden whitespace-nowrap text-ellipsis px-1"
                            >{product.product_name}</SubTitle>
                        </div>
                    )
                })}
                {/* BOTÃO PARA ADICIONAR MAIS PRODUTOS */}
                <div
                    className="w-20 h-20 cursor-pointer border border-white rounded-md grid place-content-center opacity-70 hover:opacity-100 bg-primary-100 dark:bg-primary-200"
                    onClick={handleAddProducts}
                >
                    <MdAdd className="size-8 fill-light" />
                </div>
            </div>
        </div>
    )
};