import { useParams, useSearchParams } from "react-router-dom"
import { RegisterDataLocalStorage } from "../../../functions/RegisterDataLocalStorage";
import { Select } from "../../Select/Select";
import { Button } from "../../button/Button";

interface SelectForm {
    options: Array<{
        prompt_name: string,
        prompt: string,
        id: string,
    }>
    field_name: string,
}

export function SelectForm({ options, field_name }: SelectForm) {
    const params = useParams();
    const [ searchParams, setSearchParams ] = useSearchParams();

    const handleCreateDatabase = () => {
        const id = params.plan_management_id;
        window.location.href = `/create-database/${id}`
    }

    const handleSelectOptionDatabase = ({ target }: any) => {
        const select = target;
        const id = target.options[select.selectedIndex].value;
        RegisterDataLocalStorage(searchParams, setSearchParams, { dataset: { field_name }, value: id  })
    }

    const formatOptions = () => {
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