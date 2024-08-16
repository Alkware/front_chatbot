import { useFormContext } from "react-hook-form";
import { Root } from "../../../../../../components/Form/FormRoot";
import { OpeningHours } from "./components/OpeningHours/OpeningHours";
import { useEffect } from "react";
import { COMPANY_NAME_TO_SAVE_LOCALSTORAGE } from "../../../../../../variables/variables";
import { Input } from "../../../../../../components/Form/components/Fields/Input/Input";




export function StepAboutCompany() {
    const { watch } = useFormContext();
    const company_name = watch("step_0.company_name");
    const contact_email = watch("step_0.contact_email");
    const contact_phone_number = watch("step_0.contact_phone_number");
    const address = watch("step_0.address");

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
        <>
            <Root.Container className="flex gap-4" >
                <Input
                    name="step_0.company_name"
                    title="Qual o nome da empresa?"
                />
            </Root.Container>

            <Root.Container className="flex flex-col md:flex-row gap-4" >
                <Input
                    name="step_0.contact_email"
                    title="Digite um e-mail para contato"
                />

                <Input
                    title="Digite um telefone para contato"
                    name="step_0.contact_phone_number"
                    onChange={({ currentTarget }) => {
                        const numeric = currentTarget.value.replace(/[^\d]/g, '');
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

                            currentTarget.value = cellPhone
                        } else currentTarget.value = currentTarget.value.substring(0, 15)
                    }
                    }
                />
            </Root.Container>

            <OpeningHours />

            <Root.Optional
                name="step_0.address"
                text="Sua empresa possui um endereço físico?"
            >
                <Input
                    name="step_0.address"
                    title="Qual o endereço da sua empresa?"
                />
            </Root.Optional>
        </>
    )
};