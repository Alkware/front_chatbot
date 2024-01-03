import { buttonTypes } from "../../@types/buttonTypes";

function ButtonMain({ children, icon, onClick, customClass }: buttonTypes) {



    return (
        <button
            onClick={onClick}
            className={`bg-dark-color_main px-6 py-2 rounded-2xl flex gap-2 items-center justify-center ${customClass}`}
        >
            {children}
            {icon}
        </button>
    )
}

export default ButtonMain;