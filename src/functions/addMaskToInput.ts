import { MouseEvent } from "react";
import { cnpj, cpf } from "cpf-cnpj-validator"

export function addMaskToInput(e: MouseEvent<HTMLInputElement, MouseEvent>) {
    const value = e.currentTarget.value.replaceAll(/[:_.\-/a-zA-Z]/g, '');

    const formatedValue = value.length <= 11 ? cpf.format(value) : cnpj.format(value);

    e.currentTarget.value = formatedValue;
};