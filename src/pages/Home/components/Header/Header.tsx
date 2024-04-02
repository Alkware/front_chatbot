import { useState } from "react";
import { URL_LOGO } from "../../../../variables/variables"
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export function Header() {
    const [theme, setTheme] = useState<string>(localStorage.theme)
    const navigate = useNavigate();

    const toggleTheme = () => {
        const isDark = theme === "dark";
        const currentTheme = isDark ? "light" : "dark"
        document.documentElement.classList.toggle("dark", !isDark)
        localStorage.theme = currentTheme
        setTheme(currentTheme)
    }

    return (
        <header className="w-full max-w-[1300px] h-[100px] overflow-hidden flex justify-between items-center absolute top-0 z-50">

            <div className="w-1/5 h-[100px] py-4">
                <img
                    src={URL_LOGO}
                    alt="Logo do site wipzee"
                    className="w-full h-full object-contain cursor-pointer"
                    onClick={() => window.location.href = "/"}
                />
            </div>

            <nav className="flex justify-center items-center">
                <ul className="flex justify-center items-center gap-8 ">

                    <li
                        className="cursor-pointer px-3 py-2 rounded-lg border border-primary-100/40 neon-effect text-primary-100"
                        onClick={() => navigate("/login")}
                    > Entrar </li>

                    <li
                        className="cursor-pointer px-6 py-2 rounded-lg transition-colors bg-primary-100/80 hover:bg-primary-100 neon-effect text-light "
                        onClick={() => navigate("/register")}
                    > Criar conta </li>
                </ul>

                <div
                    className="p-2 rounded-full cursor-pointer bg-primary-200 mx-8 text-light neon-effect"
                    onClick={toggleTheme}
                >
                    {
                        theme === "dark" || !theme ?
                            <BsFillMoonStarsFill />
                            :
                            <BsSunFill />
                    }
                </div>
            </nav>

        </header>
    )
};