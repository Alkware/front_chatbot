import { buttonTypes } from "../../types/buttonTypes";

function Button({ children, icon, onClick }: buttonTypes) {



    return (
        <button
            onClick={onClick}
            className="bg-blue_main px-6 py-2 rounded-2xl flex gap-2 items-center justify-center"
        >
            {children}
            {icon}
        </button>
    )
}

export default Button;