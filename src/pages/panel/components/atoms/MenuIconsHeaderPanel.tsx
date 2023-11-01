import { Bell, MoonStars, Power, Question, SunDim } from "@phosphor-icons/react";
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
            <Question
                size={28}
                className="fill-zinc-100 cursor-pointer"
            />

            <Bell
                size={28}
                className="fill-zinc-100 cursor-pointer"
            />
            {
                isThemeDark ?
                    <SunDim
                        size={28}
                        className="fill-zinc-100 cursor-pointer"
                        onClick={() => setThemeDark(v => !v)}
                    />
                    :
                    <MoonStars
                        size={28}
                        className="fill-zinc-100 cursor-pointer"
                        onClick={() => setThemeDark(v => !v)}
                    />
            }
            <Power
                size={28}
                className="fill-zinc-100 cursor-pointer hover:fill-red-500 transition-colors duration-500"
                onClick={handleExitThePanel}
            />
        </div>
    )
};