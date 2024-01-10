import { useParams, useSearchParams } from "react-router-dom"
import { Prompt } from "../../../../@types/prompt.types";
import { Select } from "../../../Select/Select";
import { Button } from "../../../button/Button";

interface SelectForm {
    options: Array<Prompt>
    fieldName: string,
}

export function FormSelect({ options, fieldName }: SelectForm) {
    const params = useParams();

    const handleCreateDatabase = () => {
        const id = params.plan_management_id;
        window.location.href = `/create-database/${id}`
    }

    const handleSelectOptionDatabase = ({ target }: any) => {
        const select = target;
        const id = target.options[select.selectedIndex].value;
        // RegisterDataLocalStorage(searchParams, setSearchParams, { dataset: { fieldName }, value: id })
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
                    onChange={handleSelectOptionDatabase}
                    options={formatOptions()}
                />
            </div>
            {
                params?.plan_management_id &&
                <Button onClick={handleCreateDatabase}>Criar base</Button>
            }
        </div>
    )
};