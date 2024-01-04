import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export function BackHome() {
    const navigate = useNavigate();

    const handleBackHome = ()=>{
        navigate("/panel?step=0")
    }

    return (
        <span
            className="w-full flex justify-start items-center cursor-pointer opacity-50 hover:opacity-80 transition-colors"
            onClick={handleBackHome}
        >
            <IoChevronBack /> Voltar
        </span>

    )
};