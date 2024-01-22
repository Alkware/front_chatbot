import { useParams } from "react-router-dom"
import { Prompt } from "../../../../@types/prompt.types";
import { Select } from "../../../Select/Select";
import { Button } from "../../../button/Button";
import { registerDataLocalStorage } from "../../../../functions/registerDataLocalStorage";

interface SelectForm {
    options: Array<Prompt>
    fieldName: string,
    formName?: string
    defaultValue?: string
}

export function FormSelect({ options, fieldName, formName, defaultValue }: SelectForm) {
    const params = useParams();

    const handleCreateDatabase = () => {
        const id = params.plan_management_id;
        window.location.href = `/create-database/${id}?from=create`
    }

    const handleSelectOptionDatabase = ({ target }: any) => {
        const select = target;
        const id = target.options[select.selectedIndex].value;
        registerDataLocalStorage({ dataset: { field_name: fieldName }, value: id }, formName)
    }

    const formatOptions = () => {
        if(!options) throw new Error("The option cant to be empty.")

        return options.map((opt: any) => {
            if (opt.prompt_name) {
                opt.name = opt["prompt_name"];
                delete opt["prompt_name"]
            }
            
            return opt
        })
    }

    return (
        <div className="w-full h-[40px] flex gap-4 justify-center items-center">
            <div className="h-full">
                <Select
                    title="Selecione sua base de dados"
                    alternativeTitle="Nenhuma base de dados foi criada"
                    handleSelectDatabase={handleSelectOptionDatabase}
                    options={formatOptions()}
                    defaultValue={defaultValue}
                />
            </div>
            {
                params?.plan_management_id &&
                <Button onClick={handleCreateDatabase}>Criar base</Button>
            }
        </div>
    )
};