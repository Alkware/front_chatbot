import { Root } from "../../../../../../components/Form/FormRoot";
import { addMaskToInput } from "../../../../../../functions/addMaskToInput";

export function StepAboutCompany() {
    return (
        <Root.Step index={3} stepTitle="Sobre a empresa">

            <Root.Container className="flex gap-4" >
                <Root.Input
                    name="step_3.company_name"
                    title="Qual o nome da empresa?"
                />

                <Root.Input
                    title="Qual o seu CNPJ?"
                    name="step_3.CNPJ"
                    mask={addMaskToInput}
                />
            </Root.Container>

            <Root.Input
                name="step_3.address"
                title="Qual o endereço da sua empresa?"
            />

            <Root.Container className="flex gap-4" >
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

            <Root.Input
                name="step_3.support_hours"
                title="Qual seu horário para suporte humano?"
            />
        </Root.Step>
    )
};