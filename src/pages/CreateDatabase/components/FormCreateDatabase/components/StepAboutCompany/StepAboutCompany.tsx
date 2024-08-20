import { useFormContext } from "react-hook-form";
import { Root } from "../../../../../../components/Form/FormRoot";
import { OpeningHours } from "./components/OpeningHours/OpeningHours";
import { useContext, useEffect, useState } from "react";
import { Input } from "../../../../../../components/Form/components/Fields/Input/Input";
import { Client_Company } from "../../../../../../@types/clientCompany.types";
import { Title } from "../../../../../../components/Title/Title";
import { ModalContext } from "../../../../../../context/ModalContext";
import { PopUp } from "../../../../../../components/modal/templates/PopUp";
import { MdBusiness, MdClose } from "react-icons/md";
import { Button } from "../../../../../../components/button/Button";
import { TextArea } from "../../../../../../components/Form/components/Fields/TextArea/TextArea";
import { COMPANY_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../../../variables/variables";
import { maskToCellPhone } from "../../../../../../functions/addMaskToInput";

interface StepAboutCompany {
    companies: Client_Company[] | undefined
}

export function StepAboutCompany({ companies }: StepAboutCompany) {
    const { watch } = useFormContext();
    const company_id = watch("client_company_id");
    const [company, setCompany] = useState<Client_Company>();
    const { setModalContent, clearModal } = useContext(ModalContext);

    useEffect(() => {
        (async () => {
            if (!companies) return;
            const company = companies.find(company => company.id === company_id);
            company ? setCompany(company) : setCompany(companies[0]);
        })();
    }, []);

    /**
     * Função responsável por exibir o modal com a lista de empresas do usuário...
     */
    const handleDisplayCompanies = () => {

        // Função responsável por selecionar uma empresa na lista de empresa do usuário...
        function handleSelectCompany(company: Client_Company) {
            setCompany(company)
            localStorage.setItem(COMPANY_NAME_TO_SAVE_LOCALSTORAGE, JSON.stringify(company))
            clearModal("modal_show_companies")
        }

        setModalContent({
            componentName: "modal_show_companies",
            components:
                <PopUp>
                    <div className="flex flex-col py-4 relative p-2">
                        <MdClose
                            className="absolute top-1 right-1 text-lg cursor-pointer bg-primary-100 rounded-full fill-white"
                            onClick={() => clearModal("modal_show_companies")}
                        />
                        <Title className="font-bold">Minhas empresas:</Title>
                        <div className="flex flex-col p-4">
                            {companies?.map(company =>
                                <div
                                    className="flex items-center gap-4 cursor-pointer border border-white/50 p-2 hover:bg-primary-200"
                                    onClick={() => handleSelectCompany(company)}
                                >
                                    <MdBusiness />
                                    <span className="w-40 whitespace-nowrap overflow-hidden text-ellipsis">{company.company_name}</span>
                                    <span className="w-40 whitespace-nowrap overflow-hidden text-ellipsis">{company.company_description}</span>
                                    <span className="w-40 whitespace-nowrap overflow-hidden text-ellipsis">{company.contact_email}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </PopUp>
        })
    }

    const handleSaveValuesLocalStorage = (e: any) => {
        const company_info = JSON.parse(localStorage.getItem(COMPANY_NAME_TO_SAVE_LOCALSTORAGE) || "{}");
        const { name, value } = e.target;
        let newCompany: any = {};

        if (!company_info) newCompany[name] = value;
        else newCompany = { ...company_info, [name]: value }
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
                >Minhas empresas</Button>
            </Root.Container>
            <Root.Container className="flex gap-4" >
                <Input
                    name="company_name"
                    title="Qual o nome da empresa?"
                    defaultValue={company?.company_name || ""}
                    onChange={handleSaveValuesLocalStorage}
                />
            </Root.Container>

            <Root.Container className="flex gap-4" >
                <TextArea
                    name="company_description"
                    title="Faça uma breve descrição do seu modelo de negócio"
                    defaultValue={company?.company_description || ""}
                    onChange={handleSaveValuesLocalStorage}
                />
            </Root.Container>

            <Root.Container className="flex flex-col md:flex-row gap-4" >
                <Input
                    name="contact_email"
                    title="Digite um e-mail para contato"
                    defaultValue={company?.contact_email || ""}
                    onChange={handleSaveValuesLocalStorage}
                />

                <Input
                    title="Digite um telefone para contato"
                    name="contact_phone_number"
                    onChange={(e) => {
                        maskToCellPhone(e);
                        handleSaveValuesLocalStorage(e)
                    }}
                    defaultValue={company?.contact_phone_number || ""}
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
                    defaultValue={company?.address || ""}
                    onChange={handleSaveValuesLocalStorage}
                />
            </Root.Optional>
        </>
    )
};