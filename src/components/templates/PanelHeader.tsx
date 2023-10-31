import { Bell, MoonStars, Power, Question, SunDim } from "@phosphor-icons/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PanelHeader() {
    const navigate = useNavigate();
    const [isThemeDark, setThemeDark] = useState(true);


    const handleExitThePanel = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <header
            className="w-full h-[70px] shadow-sm shadow-blue_main flex justify-between items-center"
        >
            <h2
                className="text-zinc-100 w-1/2 md:w-1/5 md:min-w-[300px] h-full flex justify-center items-center border-zinc-100/50"
            >Logo da empresa</h2>

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
        </header>
    )
}

export default PanelHeader;