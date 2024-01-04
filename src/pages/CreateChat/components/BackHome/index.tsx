import { IoChevronBack } from "react-icons/io5";

export function BackHome() {

    return (
        <span
            className="w-full flex justify-start items-center cursor-pointer opacity-50 hover:opacity-80 transition-colors"
            onClick={()=>  window.history.back()}
        >
            <IoChevronBack /> Voltar
        </span>

    )
};