import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface BackHome {
    route?: string
}

export function BackHome({ route }: BackHome) {
    const navigate = useNavigate();

    const handleBackHome = ()=>{
        navigate(route || "/panel")
    }

    return (
        <span
            className="flex justify-start items-center cursor-pointer opacity-50 hover:opacity-80 transition-colors"
            onClick={handleBackHome}
        >
            <IoChevronBack /> Voltar à plataforma
        </span>

    )
};