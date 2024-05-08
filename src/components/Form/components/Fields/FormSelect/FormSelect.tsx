import { RefObject, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { HeaderSelect } from "./components/HeaderSelect/HeaderSelect";
import { ListSelect } from "./components/ListSelect/ListSelect";

type Options = { value: string, text: string }

export interface OptionsState {
    options: Options[],
    selected: Options[]
}


interface FormSelect {
    options: Options[];
    name: string;
    title: string;
    isMultiple?: boolean;
}

export function FormSelect({ options, title, name, isMultiple }: FormSelect) {
    const { getValues, unregister, register } = useFormContext();
    const contentOptionsRef: RefObject<HTMLDivElement> = useRef(null);
    const [optionsState, setOptions] = useState<OptionsState>({ options: [], selected: [] });


    useEffect(() => {
        const handleClickOutsideElement = ({ target }: any) => {

            if (contentOptionsRef.current && !contentOptionsRef.current.contains(target)) {
                const ul = contentOptionsRef.current?.querySelector("ul")
                const contentSelect = contentOptionsRef.current?.querySelector("div#select")

                ul && ul.classList.add("hidden")
                contentSelect && contentSelect.classList.add("cursor-pointer")
            }
        }

        document.addEventListener("click", handleClickOutsideElement)

        return () => document.removeEventListener("click", handleClickOutsideElement)

    }, [])

    useEffect(() => {
        const key = getValues(name);
        const data = options?.filter((opt) => key?.includes(opt.value));

        setOptions(() => {
            return {
                options: options ? options : [],
                selected: !!data.length ? data : []
            }
        });

    }, [])

    const registerField = (list: { value: string }[]) => {
        unregister(name);

        if (isMultiple) list.forEach((_, index) => register(`${name}.${index}`, { value: list[index].value }));
        else register(name, { value: list[0].value });
    }

    return (
        <div
            ref={contentOptionsRef}
            className="w-full flex flex-col relative"
        >
            <HeaderSelect 
                optionsState={optionsState}
                registerField={registerField}
                contentOptionsRef={contentOptionsRef}
                isMultiple={isMultiple}
                setOptions={setOptions}
                title={title}
            />

            <ListSelect 
                optionsState={optionsState}
                isMultiple={isMultiple}
                options={options}
                registerField={registerField}
                setOptions={setOptions}
                contentOptionsRef={contentOptionsRef}
            />


        </div >
    )
};