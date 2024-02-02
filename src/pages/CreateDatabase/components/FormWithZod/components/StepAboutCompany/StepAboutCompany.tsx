import { Root } from "../../../../../../components/Form-zod/FormRoot";

export function StepAboutCompany() {
    return (
        <Root.Step index={5} stepTitle="Sobre a empresa">

            <Root.Flex flexDirection="row" >
                <Root.Input
                    name="step_5.company_name"
                    title="Qual o nome da empresa?"
                />

                <Root.Input
                    title="Qual o seu CNPJ?"
                    name="step_5.CNPJ"
                    onChange={({ target }) => {
                        if (target.value.length <= 18) {
                            const numericCnpj = target.value.replace(/[^\d]/g, '');
                            const formatedCNPJ = numericCnpj.replace(
                                /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
                                '$1.$2.$3/$4-$5'
                            );

                            target.value = formatedCNPJ
                        } else target.value = target.value.substring(0, 18)
                    }
                    }
                />
            </Root.Flex>

            <Root.Input
                name="step_5.address"
                title="Qual o endereço da sua empresa?"
            />

            <Root.Flex flexDirection="row" >
                <Root.Input
                    name="step_5.contact_email"
                    title="Digite um e-mail para contato"
                />

                <Root.Input
                    title="Digite um telefone para contato"
                    name="step_5.contact_phone_number"
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
            </Root.Flex>

            <Root.Input
                name="step_5.support_hours"
                title="Qual seu horário para suporte humano?"
            />
        </Root.Step>
    )
};