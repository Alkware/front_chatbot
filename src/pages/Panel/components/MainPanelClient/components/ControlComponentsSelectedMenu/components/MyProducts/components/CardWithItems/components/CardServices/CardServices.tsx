import { Title } from "../../../../../../../../../../../../components/Title/Title"
import { SubTitle } from "../../../../../../../../../../../../components/SubTitle/SubTitle"
import { MdAdd, MdCopyAll, MdDelete } from "react-icons/md"
import { RefObject, useContext, useRef, useState } from "react"
import { ClientContext } from "../../../../../../../../../../../../context/ClientContext"
import { useNavigate } from "react-router-dom"
import { ModalContext } from "../../../../../../../../../../../../context/ModalContext"
import { PopOver } from "../../../../../../../../../../../../components/modal/templates/PopOver"
import { TipContainer } from "../../../../../../../../../../../../components/TipContainer/TipContainer"
import { Service } from "../../../../../../../../../../../../@types/services.types"
import { createNewService, deleteService } from "../../../../../../../../../../../../api/service.api"
import { PopUp } from "../../../../../../../../../../../../components/modal/templates/PopUp"
import { ModalEditService } from "./ModalEditService/ModalEditService"


interface CardServices {
    items: Service[]
}

export function CardServices({ items }: CardServices) {
    const { setModalContent } = useContext(ModalContext);
    const { client } = useContext(ClientContext);
    const containerProductsRef: RefObject<HTMLDivElement> = useRef(null);
    const [newService, setNewService] = useState(items);
    const navigate = useNavigate();

    // FUNÇÃO RESPONSÁVEL REDIRECIONAR O USUÁRIO PARA O FORMULÁRIO DE CRIAÇÃO DE NOVOS serviçoS...
    const handleAddProducts = () => {
        if (!client) { console.error("Unable to select offer because the client is missing"); return; }
        navigate(`/create-service/${client.plan_management.id}/${items[0].category.name}`)
    }

    // FUNÇÃO RESPONSÁVEL POR DUPLICAR O serviço...
    const handleDuplicateProduct = async (service: Service) => {
        // Transforma o id em um campo opcional para ser deletado...
        const duplicateProduct: Omit<Service, "id"> & { id?: string } = service;

        delete duplicateProduct["id"];
        delete duplicateProduct["created_at"];
        delete duplicateProduct["updated_at"];
        delete duplicateProduct["plan_management"]

        if (!client) {
            console.error("Client id is missing!");
            return;
        }

        // Cria a fonte de dados...
        const response = await createNewService({
            ...duplicateProduct,
            service_name: `${duplicateProduct.service_name.split(" ")[0]} (${newService.length + 1})`,
            plan_management_id: client?.plan_management.id,
            category: { name: duplicateProduct.category.name },
            images_products_services: duplicateProduct.images.map(infoImage => infoImage.id)
        });

        response && setNewService(values => values ? [...values, response] : values);
    }

    // FUNÇÃO RESPONSÁVEL POR DELETAR O serviço
    const handleDeleteService = async (service: Service) => {
        const { id } = service;
        if (!id) {
            window.location.reload();
            return;
        }
        const response = await deleteService(id);

        if (!response) {
            setModalContent({
                componentName: "modal_failed_delete_product",
                components:
                    <PopOver
                        componentName="modal_failed_delete_product"
                        message="Falha ao tentar deletar o serviço, tente entrar em contato com suporte"
                        type="WARNING"
                    />
            });
            return;
        };

        setNewService(values => values.filter(value => value.id !== id));

        setModalContent({
            componentName: "modal_success_delete_product",
            components:
                <PopOver
                    componentName="modal_success_delete_product"
                    message="Serviço deletado com sucesso!"
                />
        })
    }

    const handleEditProduct = (service: Service) => {
        setModalContent({
            componentName: "modal_edit_product",
            components: <PopUp>
                <ModalEditService
                    service={service}
                    setServices={setNewService}
                />
            </PopUp>
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
                {newService.map(service => {
                    return (
                        <div
                            key={service.id}
                            className="group w-20 h-20 flex items-center gap-4 relative hover:scale-105 cursor-pointer transition-transform"
                        >
                            <div className="hidden group-hover:flex gap-1 absolute right-0 top-0 bg-dark/80 p-1 ">
                                <MdCopyAll
                                    className="hover:scale-110 transition-transform fill-white"
                                    onClick={() => handleDuplicateProduct(service)}
                                />
                                <MdDelete
                                    className="hover:scale-110 transition-transform fill-red-400"
                                    onClick={() => handleDeleteService(service)}
                                />
                            </div>
                            <img
                                src={service.images.length ? service.images[0].url : "https://via.placeholder.com/100"}
                                className="w-full h-full object-cover"
                                onClick={() => handleEditProduct(service)}
                            />

                            <div className="w-full absolute bottom-0">
                                <TipContainer
                                    tip={service.service_name.substring(0, 39)}
                                    positionY="BOTTOM"
                                >
                                    <SubTitle
                                        className="w-full bg-dark/80 text-light text-sm overflow-hidden whitespace-nowrap text-ellipsis px-1"
                                    >{service.service_name}</SubTitle>
                                </TipContainer>
                            </div>
                        </div>
                    )
                })}
                {/* BOTÃO PARA ADICIONAR MAIS serviçoS */}
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