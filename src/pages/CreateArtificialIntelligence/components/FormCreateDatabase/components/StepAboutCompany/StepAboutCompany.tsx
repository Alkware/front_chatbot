import { useFormContext } from "react-hook-form";
import { Root } from "../../../../../../components/Form/FormRoot";
import { OpeningHours } from "./components/OpeningHours/OpeningHours";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Input } from "../../../../../../components/Form/components/Fields/Input/Input";
import { Client_Company } from "../../../../../../@types/clientCompany.types";
import { ModalContext } from "../../../../../../context/ModalContext";
import { PopUp } from "../../../../../../components/modal/templates/PopUp";
import { MdBusiness } from "react-icons/md";
import { Button } from "../../../../../../components/button/Button";
import { TextArea } from "../../../../../../components/Form/components/Fields/TextArea/TextArea";
import { COMPANY_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../../../variables/variables";
import { maskToCellPhone } from "../../../../../../functions/addMaskToInput";
import { MyCompanies } from "./components/MyCompanies/MyCompanies";

interface StepAboutCompany {
    companies: Client_Company[] | undefined
}

export function StepAboutCompany({ companies }: StepAboutCompany) {
    const { watch } = useFormContext();
    const company_id = watch("client_company_id");
    const [company, setCompany] = useState<{ current?: Client_Company, companies: Client_Company[] | undefined }>();
    const { setModalContent } = useContext(ModalContext);

    /**
     * useEffect responsável por buscar a atual informação sobre a empresa, setar ela dentro do localStorage.
     * Também será setado dentro do state junto com todas as informações das outras empresas.
     */
    useEffect(() => {
        (async () => {
            if (!companies) return;
            // Busca a atual empresa baseado no id que está salvo dentro do zod...
            const company = companies.find(company => company.id === company_id);
            // Adiciona as informações encontrada em companyInfo,
            // caso não seja encontrado nenhuma informação será buscado o primeiro index do array...
            const companyInfo = company || JSON.parse(localStorage.getItem(COMPANY_NAME_TO_SAVE_LOCALSTORAGE) || "{}") || companies[0];
            if(companyInfo){
                // Define dentro do state a atual informação da empresa, junto com todas as outras informações...
                setCompany({ current: companyInfo, companies })
                // Salva dentro do localStorage a informação atual da empresa...
                localStorage.setItem(COMPANY_NAME_TO_SAVE_LOCALSTORAGE, JSON.stringify(companyInfo))
            }
        })();
    }, []);

    /**
     * Função responsável por exibir o modal com a lista de empresas do usuário...
     */
    const handleDisplayCompanies = () => {
        setModalContent({
            componentName: "modal_show_companies",
            components:
                <PopUp>
                    <MyCompanies
                        companies={company?.companies}
                        setCompany={setCompany}
                    />
                </PopUp>
        })
    }

    /**
     * Função responsável por salvar os valores em tempo real no localStorage.
     * @param {ChangeEvent} e Evento change recebido na alteração do valor do componente
     */
    const handleSaveValuesLocalStorage = (e: ChangeEvent<any>) => {
        // Busca as informações já salvas no localstorage...
        const company_info = JSON.parse(localStorage.getItem(COMPANY_NAME_TO_SAVE_LOCALSTORAGE) || "{}");
        // Desestrutura name e value de dentro do target do evento...
        const { name, value } = e.target;
        // Inicia uma nova variavel para receber as novas informações...
        let newCompany: any = {};
        // Verifica se já existem informações da empresa, se não existir será adicionado novas informações...
        // Caso exista, será adicionado as informações junto com as que já existem....
        if (!company_info) newCompany[name] = value;
        else newCompany = { ...company_info, [name]: value }
        // Salva as novas informações no localStorage...
        localStorage.setItem(COMPANY_NAME_TO_SAVE_LOCALSTORAGE, JSON.stringify(newCompany))
    }

    return (
        <>
            <Root.Container
                data-display={!!companies?.length}
                className="flex w-full justify-end gap-12 data-[display=false]:hidden"
            >
                <Button
                    className="cursor-pointer"
                    type="button"
                    onClick={handleDisplayCompanies}
                ><MdBusiness /> Minhas empresas</Button>
            </Root.Container>
            <Root.Container className="flex gap-4" >
                <Input
                    name="company_name"
                    title="Qual o nome da empresa?"
                    defaultValue={company?.current?.company_name || ""}
                    onChange={handleSaveValuesLocalStorage}
                />
            </Root.Container>

            <Root.Container className="flex gap-4" >
                <TextArea
                    name="company_description"
                    title="Faça uma breve descrição do seu negócio"
                    defaultValue={company?.current?.company_description || ""}
                    onChange={handleSaveValuesLocalStorage}
                />
            </Root.Container>

            <Root.Container className="flex flex-col md:flex-row gap-4" >
                <Input
                    name="contact_email"
                    title="Digite um e-mail para contato"
                    defaultValue={company?.current?.contact_email || ""}
                    onChange={handleSaveValuesLocalStorage}
                />

                <Input
                    title="Digite um telefone para contato"
                    name="contact_phone_number"
                    onChange={(e) => {
                        maskToCellPhone(e);
                        handleSaveValuesLocalStorage(e)
                    }}
                    defaultValue={company?.current?.contact_phone_number || ""}
                />
            </Root.Container>

            <OpeningHours
                name="support_hours"
                company={company}
            />

            <Root.Optional
                name="address"
                text="Sua empresa possui um endereço físico?"
            >
                <Input
                    name="address"
                    title="Qual o endereço da sua empresa?"
                    defaultValue={company?.current?.address || ""}
                    onChange={handleSaveValuesLocalStorage}
                />
            </Root.Optional>
        </>
    )
};