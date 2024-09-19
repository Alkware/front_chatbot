import { cnpj, cpf } from "cpf-cnpj-validator"

export function addMaskCpfOrCnpjToInput(e: any) {
    const value = e.target.value.replaceAll(/[:_.\-/a-zA-Z]/g, '');

    const formatedValue = value.length <= 11 ? cpf.format(value) : cnpj.format(value);


    e.target.value = formatedValue;
};

export function maskToCellPhone(e: any){
    const { currentTarget } = e;
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