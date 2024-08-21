import { Dispatch, SetStateAction, useContext } from "react";
import { MdAdd, MdBusiness, MdClose, MdDelete } from "react-icons/md"
import { ModalContext } from "../../../../../../../../context/ModalContext";
import { Client_Company } from "../../../../../../../../@types/clientCompany.types";
import { COMPANY_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../../../../../variables/variables";
import { Title } from "../../../../../../../../components/Title/Title";
import { PopUp } from "../../../../../../../../components/modal/templates/PopUp";
import { Confirm } from "../../../../../../../../components/modal/templates/Confirm";
import { deleteClientCompany } from "../../../../../../../../api/client_company.api";
import { PopOver } from "../../../../../../../../components/modal/templates/PopOver";
import { FaSadTear } from "react-icons/fa";
import { Button } from "../../../../../../../../components/button/Button";

interface MyCompanies {
    companies: Client_Company[] | undefined;
    setCompany: Dispatch<SetStateAction<{ current?: Client_Company, companies: Client_Company[] | undefined } | undefined>>
}

export function MyCompanies({ companies, setCompany }: MyCompanies) {
    const { setModalContent, clearModal } = useContext(ModalContext);

    // Função responsável por selecionar uma empresa na lista de empresa do usuário...
    function handleSelectCompany(company: Client_Company) {
        setCompany(value => Object({ ...value, current: company }))
        localStorage.setItem(COMPANY_NAME_TO_SAVE_LOCALSTORAGE, JSON.stringify(company))
        clearModal("modal_show_companies")
    }

    /**
     * Função responsável por deletar uma empresa...
     */
    const handleDeleteComapany = (id: string) => {

        async function deleteCompany() {
            const response = await deleteClientCompany(id);
            if (!response) {
                setModalContent({
                    componentName: "modal_failed_delete_company",
                    components: <PopOver
                        componentName="modal_failed_delete_company"
                        message="Falha ao tentar deletar a empresa, tente entrar em contato com o suporte"
                        type="WARNING"
                    />
                });
                return;
            }

            setModalContent({
                componentName: "modal_success_delete_company",
                components: <PopOver
                    componentName="modal_success_delete_company"
                    message="Informações da empresa deletadas com sucesso!"
                />
            });
            setCompany({ companies: companies?.filter(company => company.id !== id) });
            clearModal("modal_confirm_delete")
            clearModal("modal_show_companies")
        }

        setModalContent({
            componentName: "modal_confirm_delete",
            components:
                <PopUp>
                    <Confirm
                        title="Deseja realmente deletar as informações dessa empresa?"
                        subTitle="Se você confirmar, não poderá recuperar novamente!"
                        confirmFunction={deleteCompany}
                        cancelFuntion={() => clearModal("modal_confirm_delete")}
                    />
                </PopUp>
        })
    }

    /**
     * Função responsável por criar novas informações sobre a empresa...
     */
    const handleCreateNewCompany = () => {
        //Remove as informações da empresa atual, para ser inseridas novas
        setCompany({ companies });
        // Remove as informações da empresa do localstorage, para ser criado um novo registro no banco de dados...
        localStorage.removeItem(COMPANY_NAME_TO_SAVE_LOCALSTORAGE);
        clearModal(null, { clearLast: true })
    }


    return (
        <div className="flex min-w-[300px] flex-col py-4 relative p-2">
            <MdClose
                className="absolute top-1 right-1 text-lg cursor-pointer bg-primary-100 rounded-full fill-white"
                onClick={() => clearModal("modal_show_companies")}
            />
            <Title className="font-bold">Minhas empresas:</Title>
            <div className="flex flex-col items-center justify-center gap-4 p-4">
                {!companies?.length ?
                    <div className="flex gap-4 items-center">
                        <span>Você ainda não criou nenhuma empresa</span>
                        <FaSadTear className="fill-white" />
                    </div>
                    :
                    companies?.map(company =>
                        <div className="flex items-center border border-white/50 ">
                            <div
                                className="flex items-center gap-4 cursor-pointer p-2 hover:bg-primary-200"
                                onClick={() => handleSelectCompany(company)}
                            >
                                <MdBusiness />
                                <span className="w-40 whitespace-nowrap overflow-hidden text-ellipsis">{company.company_name}</span>
                                <span className="w-40 whitespace-nowrap overflow-hidden text-ellipsis">{company.company_description}</span>
                                <span className="w-40 whitespace-nowrap overflow-hidden text-ellipsis">{company.contact_email}</span>
                            </div>
                            <MdDelete
                                className="hover:scale-110 transition-transform fill-red-300 size-6 px-1 cursor-pointer"
                                onClick={() => handleDeleteComapany(company.id)}
                            />
                        </div>
                    )}
                <Button
                    customClass="mt-4"
                    onClick={handleCreateNewCompany}
                ><MdAdd /> Criar empresa</Button>
            </div>
        </div>
    )
};