import { RefObject, useContext, useEffect, useRef } from "react";
import { Button } from "../../../../../../components/button/Button";
import { loading } from "../../../../../../functions/loading";
import { Artificial_Intelligence, Info_Artificial_Intelligence } from "../../../../../../@types/artificialInteligence.types";
import { AxiosResponse } from "axios";
import { createNewArtificialIntelligence } from "../../../../../../api/artificialIntelligence.api";
import { COMPANY_NAME_TO_SAVE_LOCALSTORAGE, DATABASE_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../../../variables/variables";
import { ModalContext } from "../../../../../../context/ModalContext";
import { PopOver } from "../../../../../../components/modal/templates/PopOver";
import { createClientCompany } from "../../../../../../api/client_company.api";
import { UseFormReturn } from "react-hook-form";

interface ModalCreateArtificialIntelligence {
    info: Info_Artificial_Intelligence;
    plan_management_id: string;
    form: UseFormReturn<Artificial_Intelligence | any>
}

export function ModalCreateArtificialIntelligence({ info, plan_management_id, form }: ModalCreateArtificialIntelligence) {
    const { setModalContent } = useContext(ModalContext);
    const containerCreateDatabaseRef: RefObject<HTMLDivElement> = useRef(null);
    const artificial_name = form.watch("artificial_name");

    useEffect(() => {
        if (artificial_name)  handleCreateAI();
    }, []);


    const handleCreateAI = async () => {
        const identification = artificial_name || containerCreateDatabaseRef.current?.querySelector("input")?.value;
        if (!identification) {
            console.error("Failed to search the prompt name");
            return;
        }
        // Busca o botão para ser adicionado o loading...
        const button = containerCreateDatabaseRef.current?.querySelector("button");
        // Adiciona o loading no botão...
        loading(button, true);

        // Salva as informações da empresa, caso seja necessário...
        const company_info = JSON.parse(localStorage.getItem(COMPANY_NAME_TO_SAVE_LOCALSTORAGE) || "{}")
        company_info.plan_management_id = plan_management_id;
        const clientCompany = await createClientCompany(company_info);
        if (!clientCompany) {
            setModalContent({
                componentName: "modal_failed_create_company",
                components:
                    <PopOver
                        componentName="modal_failed_create_company"
                        message="Falha ao salvar as informações da empresa, reinicie a página e tente novamente."
                        type="ERROR"
                    />
            });
            return;
        }

        // Adicionar o id do gerenciador de plano do cliente...
        info.plan_management_id = plan_management_id;
        info.client_company_id = clientCompany.id;
        info.identification = identification;
        // Cria a fonte de dados...
        const response: void | AxiosResponse<Artificial_Intelligence, any> = await createNewArtificialIntelligence(info);

        if (response?.status === 201) {
            // Remove os dados salvos no localstorage...
            localStorage.removeItem(DATABASE_NAME_TO_SAVE_LOCALSTORAGE)
            // Remove as informações da empresa
            localStorage.removeItem(COMPANY_NAME_TO_SAVE_LOCALSTORAGE)
            // Desativa o loading...
            loading(button, false)
            // Envia uma mensagem que a fonte de dados foi criada com sucesso...
            setModalContent({
                componentName: "modal_created_artificial_intelligence",
                components:
                    <PopOver
                        componentName="modal_created_artificial_intelligence"
                        message="Inteligencia artificial criada com sucesso!"
                        type="INFORMATION"
                        functionAfterComplete={() => window.location.href = "/panel?tab=my_chats"}
                    />
            })
        }

    }

    return (
        !artificial_name &&
        <div
            ref={containerCreateDatabaseRef}
            className="flex flex-col gap-4 p-4"
        >
            <h2>De um nome a essa inteligencia artificial:</h2>
            <input
                type="text"
                placeholder="Ex: Minha primeira IA"
                className="bg-primary-100/30 dark:bg-zinc-800"
            />
            <Button
                onClick={handleCreateAI}
            >Salvar</Button>
        </div>
    )
};