import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export function BackHome() {
    const navigate = useNavigate();

    const handleBackHome = () => {
        navigate("/panel")
    }

    return (
        <span
            className=" w-full flex justify-start items-center cursor-pointer"
            onClick={handleBackHome}
        >
            <IoChevronBack /> Voltar
        </span>

    )
};