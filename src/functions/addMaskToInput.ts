import { cnpj, cpf } from "cpf-cnpj-validator"

export function addMaskCpfOrCnpjToInput(e: any) {
    const value = e.target.value.replaceAll(/[:_.\-/a-zA-Z]/g, '');

    const formatedValue = value.length <= 11 ? cpf.format(value) : cnpj.format(value);


    e.target.value = formatedValue;
};