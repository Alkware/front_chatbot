import { MouseEvent, RefObject, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ContainerHeaderSelect } from "./components/ContainerHeaderSelect/ContainerHeaderSelect";
import { ListSelected } from "./components/ContainerHeaderSelect/components/ListSelected";
import { TitleSelect } from "./components/ContainerHeaderSelect/components/TitleSelect";
import { ContainerListSelect } from "./components/ContainerListSelect/ContainerListSelect";
import { OptionList } from "./components/ContainerListSelect/components/OptionList";

type Options = { value: string, text: string }

interface FormSelect {
    options: Options[];
    name: string;
    title: string;
    multipleSelect?: boolean;

}
export interface OptionsState {
    value: string,
    text: string,
    selected: boolean
}

export function FormSelect({ options, title, name, multipleSelect }: FormSelect) {
    const { getValues, unregister, register } = useFormContext();
    const contentOptionsRef: RefObject<HTMLDivElement> = useRef(null);
    const addSelectParamToOptions: OptionsState[] = options?.map(option => Object({ ...option, selected: false }) as OptionsState);
    const [optionsState, setOptions] = useState<OptionsState[]>(addSelectParamToOptions);

    // UseEffect responsável por selecionar as opções automaticamente caso já estejam salvas.
    useEffect(() => {
        const key = getValues(name);
        const data = options?.filter((opt) => key?.includes(opt.value));
        if(!!data.length){
            const addSelectParamToOptions: OptionsState[] = data?.map(option => Object({ ...option, selected: true }) as OptionsState);
            setOptions(addSelectParamToOptions);
        }
    }, []);


    // Função responsável por selecionar uma opção;
    const handleOptionSelected = ({ target }: any) => {

        if (!multipleSelect) handleCloseSelect();

        if (options) {
            const value = target.dataset.value;
            const updateOption =
                optionsState.map((opt: OptionsState) =>
                    opt.value === value ?
                        Object({ ...opt, selected: true })
                        :
                        !multipleSelect ?
                            { ...opt, selected: false }
                            :
                            opt);

            registerField(updateOption.filter(opt => opt.selected))
            setOptions(updateOption);
        }
    }

    // Função responsável por remover uma opção selecionada;
    const handleRemoveSelected = ({ currentTarget }: MouseEvent<HTMLDivElement>) => {
        const value = currentTarget.dataset.value;
        const removeValueListSelected = optionsState.map(opt => opt.value === value ? { ...opt, selected: false } : opt);

        registerField(removeValueListSelected.filter(opt => opt.selected))
        setOptions(removeValueListSelected);
    }

    // Função responsável por selecionar todas as opções disponíveis
    const handleSelectedAll = () => {
        if (options) {
            const selectAll = optionsState.map(opt => !opt.selected ? { ...opt, selected: true } : opt);

            handleCloseSelect();
            registerField(selectAll);
            setOptions(selectAll);
        }
    }

    // Função responsável por fechar a lista de opções
    const handleCloseSelect = () => {
        const ul = contentOptionsRef.current?.querySelector("ul")
        ul && ul.classList.toggle("hidden")
    }

    // // Função responsável por registrar o campo no formulário.
    const registerField = (list: { value: string }[]) => {
        if(list.length){
            unregister(name);
            if (multipleSelect) list.forEach((_, index) => register(`${name}.${index}`, { value: list[index].value }));
            else register(name, { value: list[0].value });
        }
    }


    return (
        <div
            ref={contentOptionsRef}
            className="w-full flex flex-col relative"
            data-id="container-select"
        >
            <ContainerHeaderSelect
                contentOptionsRef={contentOptionsRef}
            >
                {
                    optionsState?.map((opt) =>
                        opt.selected &&
                        <ListSelected
                            key={opt.value}
                            option={opt}
                            onClick={handleRemoveSelected}
                        />
                    )
                }
                <TitleSelect
                    hide={!!optionsState.find(opt => opt.selected)}
                    title={title}
                />
            </ContainerHeaderSelect >

            <ContainerListSelect
            >
                {optionsState.map(opt =>
                    !opt.selected &&
                    <OptionList
                        key={opt.value}
                        onClick={handleOptionSelected}
                        text={opt.text}
                        value={opt.value}
                    />
                )}
                <li
                    onClick={handleSelectedAll}
                    data-ismultiple={!multipleSelect}
                    className="data-[ismultiple=true]:hidden w-full p-1 hover:bg-primary-100 text-center cursor-pointer"
                >
                    Selecionar tudo
                </li>
            </ContainerListSelect>



        </div >
    )
};