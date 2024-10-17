import { Dispatch, SetStateAction, useContext } from "react";
import { Service } from "../../../../../../../../../../../../../@types/services.types";
import { ClientContext } from "../../../../../../../../../../../../../context/ClientContext";
import { ModalContext } from "../../../../../../../../../../../../../context/ModalContext";
import { useForm } from "react-hook-form";
import { serviceSchema, ServiceSchema } from "../../../../../../../../../../../../../schema/serviceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteService, updateService } from "../../../../../../../../../../../../../api/service.api";
import { PopOver } from "../../../../../../../../../../../../../components/modal/templates/PopOver";
import { Root } from "../../../../../../../../../../../../../components/Form/FormRoot";
import { StepBasicServiceInfo } from "../../../../../../../../../../../../CreateService/components/StepBasicServiceInfo/StepBasicServiceInfo";
import { StepServicePaymentMethodAndConditions } from "../../../../../../../../../../../../CreateService/components/StepServicePaymentMethodAndConditions/StepServicePaymentMethodAndConditions";
import { StepAdvancedServiceInfo } from "../../../../../../../../../../../../CreateService/components/StepAdvancedServiceInfo/StepAdvancedServiceInfo";


interface ModalEditService {
    service: Service;
    setServices: Dispatch<SetStateAction<Service[]>>
}

export function ModalEditService({ service, setServices }: ModalEditService) {
    const { client } = useContext(ClientContext)
    const { setModalContent, clearModal } = useContext(ModalContext);
    if (!client) {
        console.error("client is missing!")
        return;
    }
    const form = useForm<ServiceSchema>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            ...service,
            images: service.images?.map(img => img.id),
        }
    });

    const handleUpdateService = async (data: Omit<Service, "images"> & { images: string[] }) => {
        if (!service.id) {
            window.location.reload();
            return;
        }

        const response = await updateService(service.id, data);

        if (!response) {
            setModalContent({
                componentName: "modal_failed_update_service",
                components:
                    <PopOver
                        componentName="modal_failed_update_service"
                        message="Falha ao tentar atualizar o serviço, tente entrar em contato com suporte."
                        type="WARNING"
                        functionAfterComplete={() => clearModal(null, { clearAll: true })}
                    />
            });
            return;
        }

        setServices(values => {
            if (values) {
                const removeOldService = values.filter(value => value.id !== service.id);
                return [...removeOldService, response];
            } else return values;
        });

        setModalContent({
            componentName: "modal_success_update_service",
            components:
                <PopOver
                    componentName="modal_success_update_service"
                    message="Serviço atualizado com sucesso!"
                    functionAfterComplete={() => clearModal(null, { clearAll: true })}
                />
        });
    }

    // FUNÇÃO RESPONSÁVEL POR DELETAR O PRODUTO
    const handleDeleteService = async () => {

        if (!service.id) {
            window.location.reload();
            return;
        }

        const response = await deleteService(service.id);

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

        setServices(values => values.filter(value => value.id !== service.id))

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
            onSubmit={handleUpdateService}
            onDelete={handleDeleteService}
        >
            <Root.EditStep
                titleStep="Informações basicas"
                index={0}
            >
                <StepBasicServiceInfo
                    client_id={client.id}
                    service={service}
                />
            </Root.EditStep>

            <Root.EditStep
                index={1}
                titleStep="Métodos de pagamentos e condições"
            >
                <StepServicePaymentMethodAndConditions />
            </Root.EditStep>
            <Root.EditStep
                index={2}
                titleStep="Informações avançadas"
            >
                <StepAdvancedServiceInfo />
            </Root.EditStep>
        </Root.EditForm>
    )
};