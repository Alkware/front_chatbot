import { UseFormReturn, useFormContext } from "react-hook-form";
import { Options, Select } from "../../../Select/Select";


interface FormSelect {
    options: Options[];
    name: string;
    title: string;
    multipleSelect?: boolean;
    useFormReturn?: UseFormReturn;
}


export function FormSelect({ options, title, name, multipleSelect, useFormReturn }: FormSelect) {
    const useFormContextReturn = useFormContext() || useFormReturn;

    return (
        <Select
            name={name}
            options={options}
            title={title}
            multipleSelect={multipleSelect}
            useFormContext={useFormContextReturn}
        />
    )
};