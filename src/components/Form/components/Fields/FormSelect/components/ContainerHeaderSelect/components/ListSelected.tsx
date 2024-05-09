import { MdDelete } from "react-icons/md";

interface ListSelected {
    option: any;
    onClick: ({ target }: any)=> void;
}
export function ListSelected({ option, onClick }: ListSelected) {


    return (
        <div
            className="flex gap-2 justify-center items-center bg-light dark:bg-primary-300 text-primary-100 rounded-md px-1"
        >
            <p>{ option.text }</p>

            <MdDelete
                onClick={onClick}
                className="bg-red-200 fill-red-700 text-white font-bold rounded-full cursor-pointer"
                data-value={option.value}
                data-text={option.text}
            />

        </div>
    )
};