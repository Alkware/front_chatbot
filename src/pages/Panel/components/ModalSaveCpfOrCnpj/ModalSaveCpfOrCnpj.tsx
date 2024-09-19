import { RefObject, useContext, useRef } from "react";
import { Button } from "../../../../components/button/Button";
import { ModalContext } from "../../../../context/ModalContext";
import { Input } from "../../../../components/Form/components/Fields/Input/Input";
import { addMaskCpfOrCnpjToInput } from "../../../../functions/addMaskToInput";
import { updateClient } from "../../../../api/client";
import { ClientContext } from "../../../../context/ClientContext";
import { AxiosResponse } from "axios";
import { Client } from "../../../../@types/Client.types";
import { PopOver } from "../../../../components/modal/templates/PopOver";
import { loading } from "../../../../functions/loading";

interface ModalSaveCpfOrCnpj {
    modalName: `modal_${string}`
}

export function ModalSaveCpfOrCnpj({ modalName }: ModalSaveCpfOrCnpj) {
    const { clearModal, setModalContent } = useContext(ModalContext);
    const { client } = useContext(ClientContext);
    const containerFormRef: RefObject<HTMLDivElement> = useRef(null);

    // Função responsável por fechar o modal...
    const handleCloseModal = () => {
        clearModal(modalName);
    }

    // Função responsável por salvar o cpf ou cnpj...
    const saveTheCpfOrCnpj = async () => {
        const cpf_cnpj = containerFormRef.current?.querySelector("input")?.value;
        const buttonElement = containerFormRef.current?.querySelector("button");
        loading(buttonElement, true);

        if (!client) return;

        if (cpf_cnpj && (cpf_cnpj.length === 11 || cpf_cnpj.length === 14 || cpf_cnpj.length === 18)) {
            const newCpfOrCnpj = cpf_cnpj.replaceAll(".", "").replaceAll("/", "").replaceAll("-", "");
            const response: void | AxiosResponse<Client> = await updateClient({ client_id: client.id, cpf_cnpj: newCpfOrCnpj });
            if (response) {
                setModalContent({
                    componentName: "modal_success_save_cpf_cnpj",
                    components: <PopOver componentName="modal_success_save_cpf_cnpj" message="Dado salvo com sucesso!" />
                })

                clearModal(modalName);
            }
        } else {
            setModalContent({
                componentName: "modal_failed_save_cpf_cnpj",
                components: <PopOver componentName="modal_failed_save_cpf_cnpj" message="Cpf ou cnpj inválido! Tente novamente" type="WARNING" />
            })

        }

        loading(buttonElement, false);
    }

    return (
        <div className="bg-light dark:bg-dark rounded-md p-4 flex flex-col items-center">
            <h2 className="font-bold text-2xl text-orange-500">AVISO</h2>
            <p className="text-medium text-lg text-orange-700">Você ainda não registrou seu cpf ou cnpj...</p>
            <p className="text-center opacity-80 text-orange-700/90">Para manter a segurança da sua conta,<br /> é necessário que você salve em nosso sistema seu cpf ou cnpj.</p>

            <div
                className="w-full mt-8"
                ref={containerFormRef}
            >
                <Input
                    name="cpf_cnpj"
                    title="Digite seu cpf ou cnpj"
                    mask={addMaskCpfOrCnpjToInput}
                />
                <div className="w-full flex mt-8 justify-evenly items-center">
                    <span
                        className="underline opacity-80 cursor-pointer"
                        onClick={handleCloseModal}
                    >Deixar para depois</span>
                    <Button onClick={saveTheCpfOrCnpj}>Salvar</Button>
                </div>
            </div>

        </div>
    )
};