import { MdArrowDropDown, MdDelete } from "react-icons/md";
import { OptionsState } from "../../FormSelect";

interface HeaderSelect {
    optionsState: OptionsState;
    registerField: any;
    setOptions: any
    isMultiple: any
    contentOptionsRef: any
    title: string
}

export function HeaderSelect({ isMultiple, optionsState, registerField, setOptions, contentOptionsRef, title }: HeaderSelect) {


    const handleDisplayOptions = ({ target }: any) => {
        if (!target.dataset.value) {
            const ul = contentOptionsRef.current?.querySelector("ul")
            const contentSelect = contentOptionsRef.current?.querySelector("div#select")

            ul && ul.classList.toggle("hidden")
            contentSelect && contentSelect.classList.toggle("cursor-pointer")
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

    return (
        <div
            id="select"
            onClick={handleDisplayOptions}
            className="w-full border bg-primary-100 dark:bg-transparent border-primary-100 p-2 flex gap-4 justify-between items-center cursor-pointer rounded-md"
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
                                    className="flex gap-2 justify-center items-center bg-light dark:bg-primary-300 text-primary-100 rounded-md px-1"
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
                            <h2 className="opacity-80 dark:opacity-60 w-full text-sm">{title}</h2>
                        )
                }
            </div>
            <MdArrowDropDown className="text-2xl" />
        </div>
    )
};