interface OptionList {
    onClick: ({ target }: any) => void;
    value: string;
    text: string;
}

export function OptionList({ onClick, value, text }: OptionList) {
    return (
        <li
            onClick={onClick}
            className="w-full p-1 hover:bg-primary-100 hover:text-light text-center cursor-pointer"
            data-value={value}
            data-id="option-list"
        >
            {text}
        </li>
    )
};