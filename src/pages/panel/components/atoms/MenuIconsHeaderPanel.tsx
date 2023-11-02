import { FaBell, FaMoon, FaPowerOff, FaQuestionCircle, FaSun } from "react-icons/fa"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function MenuIconsHeaderPanel() {
    const [isThemeDark, setThemeDark] = useState(true);
    const navigate = useNavigate();


    const handleExitThePanel = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (

        <div className="flex gap-3">
            <FaQuestionCircle
                className="fill-zinc-100 cursor-pointer"
            />

            <FaBell
                className="fill-zinc-100 cursor-pointer"
            />
            {
                isThemeDark ?
                    <FaSun
                        className="fill-zinc-100 cursor-pointer"
                        onClick={() => setThemeDark(v => !v)}
                    />
                    :
                    <FaMoon
                        className="fill-zinc-100 cursor-pointer"
                        onClick={() => setThemeDark(v => !v)}
                    />
            }
            <FaPowerOff
                className="fill-zinc-100 cursor-pointer hover:fill-red-500 transition-colors duration-500"
                onClick={handleExitThePanel}
            />
        </div>
    )
};