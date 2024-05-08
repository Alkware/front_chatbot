import { OptionsState } from "../../FormSelect";

interface ListSelect {
    optionsState: OptionsState;
    options: any;
    isMultiple: any;
    registerField: any;
    setOptions: any;
    contentOptionsRef: any
}

export function ListSelect({ contentOptionsRef, optionsState, isMultiple, options, registerField, setOptions }: ListSelect) {

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

            if(!isMultiple){
                const ul = contentOptionsRef.current?.querySelector("ul")
                ul && ul.classList.toggle("hidden");
            } 
        }
    }

    const handleSelectedAll = () => {
        if (options) {
            registerField(options)
            setOptions({ options: [], selected: options });
        }
    }

    return (
        <ul
            className="w-full max-h-[200px] overflow-auto hidden flex-col items-center absolute top-full z-50 bg-light dark:bg-black text-primary-100 dark:text-light border border-primary-100"
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
    )
};