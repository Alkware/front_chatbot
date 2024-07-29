import { useFormContext } from "react-hook-form";
import { Root } from "../../../../../../components/Form/FormRoot";
import { OpeningHours } from "./components/OpeningHours/OpeningHours";
import { useEffect } from "react";
import { COMPANY_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../../../variables/variables";




export function StepAboutCompany() {
    const { watch } = useFormContext();
    const company_name = watch("step_3.company_name");
    const contact_email = watch("step_3.contact_email");
    const contact_phone_number = watch("step_3.contact_phone_number");
    const address = watch("step_3.address");

    // UseEffect responsável por salvar os dados digitados pelo usuário no localstorage para manter a consistencia de dados até que a fonte de dados seja criada...
    useEffect(() => {
        localStorage.setItem(COMPANY_NAME_TO_SAVE_LOCALSTORAGE, JSON.stringify({
            company_name,
            contact_email,
            contact_phone_number,
            address
        }));
    }, [company_name, contact_email, contact_phone_number, address]);

    return (
        <Root.Step index={0} stepTitle="Sobre a empresa">

            <Root.Container className="flex gap-4" >
                <Root.Input
                    name="step_3.company_name"
                    title="Qual o nome da empresa?"
                />
            </Root.Container>

            <Root.Container className="flex flex-col md:flex-row gap-4" >
                <Root.Input
                    name="step_3.contact_email"
                    title="Digite um e-mail para contato"
                />

                <Root.Input
                    title="Digite um telefone para contato"
                    name="step_3.contact_phone_number"
                    onChange={({ target }) => {
                        const numeric = target.value.replace(/[^\d]/g, '');
                        if (numeric.length < 11) {
                            let cellPhone;
                            if (numeric.length === 11) {
                                cellPhone = numeric.replace(
                                    /^(\d{2})(\d{1})(\d{4})(\d{4})$/,
                                    '($1) $2 $3-$4'
                                );
                            } else {
                                cellPhone = numeric.replace(
                                    /^(\d{2})(\d{4})(\d{4})$/,
                                    '($1) $2-$3'
                                );
                            }

                            target.value = cellPhone
                        } else target.value = target.value.substring(0, 15)
                    }
                    }
                />
            </Root.Container>

            <OpeningHours />       

            <Root.Optional
                name="step_3.address"
                text="Sua empresa possui um endereço físico?"
            >
                <Root.Input
                    name="step_3.address"
                    title="Qual o endereço da sua empresa?"
                />
            </Root.Optional>
        </Root.Step>
    )
};