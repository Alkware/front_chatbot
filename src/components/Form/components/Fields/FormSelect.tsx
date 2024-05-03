import { RefObject, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MdArrowDropDown, MdDelete } from "react-icons/md";

type Options = { value: string, text: string }

interface FormSelect {
    options: Options[];
    name: string;
    title: string;
    isMultiple?: boolean;
}

export function FormSelect({ options, title, name, isMultiple }: FormSelect) {
    const { getValues, unregister, register } = useFormContext();
    const contentOptionsRef: RefObject<HTMLDivElement> = useRef(null);
    const [optionsState, setOptions] = useState<{ options: Options[], selected: Options[] }>({ options: [], selected: [] });


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

    const handleDisplayOptions = ({ target }: any) => {
        if (!target.dataset.value) {
            const ul = contentOptionsRef.current?.querySelector("ul")
            const contentSelect = contentOptionsRef.current?.querySelector("div#select")

            ul && ul.classList.toggle("hidden")
            contentSelect && contentSelect.classList.toggle("cursor-pointer")
        }
    }

    const handleOptionSelected = ({ target }: any) => {
        if (options) {
            const value = target.dataset.value;
            const text = target.textContent;
            const removeValueList = (!!isMultiple) ?
                optionsState.options.filter(opt => opt.value !== value)
                :
                options;

            const addValueListSelected = !!isMultiple ? [...optionsState.selected, { value, text }] : [{ value, text }]

            registerField(addValueListSelected)
            setOptions({ options: removeValueList, selected: addValueListSelected });
        }
    }

    const handleSelectedAll = () => {
        if (options) {
            registerField(options)
            setOptions({ options: [], selected: options });
        }
    }

    const handleRemoveSelected = ({ currentTarget }: any) => {
        const value = currentTarget.dataset.value;
        const text = currentTarget.dataset.text;

        const removeValueListSelected = optionsState.selected.filter(opt => opt.value !== value);
        const addValueListOptions = !!isMultiple ? [...optionsState.options, { value, text }] : optionsState.options;

        registerField(removeValueListSelected)
        setOptions({ options: addValueListOptions, selected: removeValueListSelected });
    }


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
            <div
                id="select"
                onClick={handleDisplayOptions}
                className="w-full border border-primary-100 p-2 flex gap-4 justify-between items-center cursor-pointer rounded-md"
            >
                <div
                    className="w-full text-center flex gap-x-4 gap-y-1 justify-center flex-wrap"
                >
                    {
                        optionsState.selected.length ?
                            (
                                optionsState.selected.map((opt, index) =>
                                    <div
                                        key={index}
                                        className="flex gap-2 justify-center items-center bg-primary-300 rounded-md px-1"
                                    >
                                        <p>{opt.text}</p>
                                        <MdDelete
                                            onClick={handleRemoveSelected}
                                            className="bg-red-200 fill-red-700 text-white font-bold rounded-full cursor-pointer"
                                            data-value={opt.value}
                                            data-text={opt.text}
                                        />

                                    </div>
                                )
                            ) :
                            (
                                <h2 className="opacity-60 w-full text-sm">{title}</h2>
                            )
                    }
                </div>
                <MdArrowDropDown className="text-2xl" />
            </div>

            <ul
                className="w-full max-h-[200px] overflow-auto hidden flex-col items-center absolute top-full z-50 bg-black border border-primary-100"
            >
                {
                    optionsState.options.map(opt =>
                        <li
                            key={opt.value}
                            onClick={handleOptionSelected}
                            className="w-full p-1 hover:bg-primary-100 text-center cursor-pointer"
                            data-value={opt.value}
                        >
                            {opt.text}
                        </li>
                    )
                }
                <li
                    onClick={handleSelectedAll}
                    data-ismultiple={!!isMultiple}
                    className="data-[ismultiple=false]:hidden w-full p-1 hover:bg-primary-100 text-center cursor-pointer"
                >
                    Selecionar tudo
                </li>
            </ul>
        </div >
    )
};