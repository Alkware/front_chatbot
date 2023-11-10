import { buttonTypes } from "../../@types/buttonTypes";

function ButtonGreen({ children, icon, onClick, customClass }: buttonTypes) {



    return (
        <button
            onClick={onClick}
            className={`bg-green_main px-6 py-2 rounded-2xl flex gap-2 items-center justify-center ${customClass}`}
        >
            {icon}
            {children}
        </button>
    )
}

export default ButtonGreen;