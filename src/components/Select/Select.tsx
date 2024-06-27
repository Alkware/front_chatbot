import { ContainerHeaderSelect } from "./components/ContainerHeaderSelect/ContainerHeaderSelect";
import { TitleSelect } from "./components/ContainerHeaderSelect/components/TitleSelect";
import { ContainerListSelect } from "./components/ContainerListSelect/ContainerListSelect";
import { OptionList } from "./components/ContainerListSelect/components/OptionList";
import { MouseEvent, RefObject, useEffect, useRef, useState } from "react";
import { ListSelected } from "./components/ContainerHeaderSelect/components/ListSelected";
import { UseFormReturn } from "react-hook-form";

export type Options = { id?: string, value: string, text: string }

interface Select {
    options: Options[];
    title: string;
    name: string;
    multipleSelect?: boolean;
    useFormContext?: UseFormReturn;
    optionsDefault?: string[] | null;
    onSelected?: (id: string) => void;
    onDelete?: () => void;
}

export interface OptionsState {
    value: string,
    text: string,
    selected: boolean
}

export function Select({ options, name, title, multipleSelect, optionsDefault, useFormContext, onSelected, onDelete }: Select) {
    const contentOptionsRef: RefObject<HTMLDivElement> = useRef(null);
    const addSelectParamToOptions: OptionsState[] = options?.map(option => Object({ ...option, selected: false }) as OptionsState);
    const [optionsState, setOptions] = useState<OptionsState[]>(addSelectParamToOptions);

    // Seleciona automaticamente as opções, caso elas tenham valores padrões...
    useEffect(() => {

        let data: Options[];

        if (useFormContext) {
            // Registra o campo no formulário com valores default...
            useFormContext.register(name, { value: multipleSelect ? [] : "" })

            // Filtra as opções que já estão selecionadas...
            const key = useFormContext.getValues(name);
            data = options?.filter((opt) => typeof key === "object" ? key.find((key: string) => key === opt.value) : key === opt.value);
        }else {
            data = options?.filter((opt) =>  optionsDefault?.find((key: string) => key === opt.value.replaceAll(" ", "_")));
        }

        if (!!data.length) {
            // Seleciona as opções automaticamente caso já estejam salvas...
            const addSelectParamToOptions: OptionsState[] = options?.map(option => {
                if (data.includes(option)) return Object({ ...option, selected: true }) as OptionsState
                else return Object({ ...option, selected: false }) as OptionsState
            });
            setOptions(addSelectParamToOptions);
        }
    }, []);

    // Função responsável por selecionar uma opção;
    const handleOptionSelected = ({ currentTarget: target }: MouseEvent<HTMLLIElement>) => {
        if (!multipleSelect) handleCloseSelect();

        if (options) {
            const value = target.dataset.value;
            if (!value) throw new Error("Unale to selected the option. because it is empty.");
            const updateOption =
                optionsState.map((opt: OptionsState) =>
                    opt.value === value ?
                        Object({ ...opt, selected: true })
                        :
                        !multipleSelect ?
                            { ...opt, selected: false }
                            :
                            opt);

            (!!onSelected && onSelected(value));
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
        (onDelete && onDelete());
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
        if (list.length && useFormContext) {
            useFormContext.unregister(name);
            if (multipleSelect) list.forEach((_, index) => useFormContext.register(`${name}.${index}`, { value: list[index].value }));
            else useFormContext.register(name, { value: list[0].value });
        }
    }

    return (
        <div
            ref={contentOptionsRef}
            className="w-full min-w-[180px] flex flex-col relative"
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
        </div>
    )
};