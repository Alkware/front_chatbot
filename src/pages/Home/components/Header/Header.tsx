import { useState } from "react";
import { URL_LOGO } from "../../../../variables/variables"
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";

export function Header() {
    const [theme, setTheme] = useState<string>(localStorage.theme)

    const menuItems = [
        {
            key: "prices",
            text: "Preços",
            navigate: "/#price"
        },
        {
            key: "about_us",
            text: "Sobre nós",
            navigate: "/#about"
        },
        {
            key: "login",
            text: "Login",
            navigate: "/login"
        },
    ]


    const handleNavigateMenu = (item: { navigate: string }) => {
        window.location.href = item.navigate
    }

    const toggleTheme = () => {
        const isDark = theme === "dark";
        const currentTheme = isDark ? "light" : "dark"
        document.documentElement.classList.toggle("dark", !isDark)
        localStorage.theme = currentTheme
        setTheme(currentTheme)
    }

    return (
        <header className="w-full h-[100px] overflow-hidden flex justify-between items-center absolute z-50">

            <div className="w-1/5 h-[100px] py-4">
                <img
                    src={URL_LOGO}
                    alt="Logo do site wipzee"
                    className="w-full h-full object-contain cursor-pointer"
                    onClick={() => window.location.href = "/"}
                />
            </div>

            <nav className="w-3/5">
                <ul className="flex justify-center items-center gap-8 ">
                    {
                        menuItems.map((item) =>
                            <li
                                key={item.key}
                                className="cursor-pointer "
                                onClick={() => handleNavigateMenu(item)}
                            >
                                {item.text}
                            </li>
                        )
                    }
                </ul>
            </nav>

            <div className="w-1/5 flex justify-center">
                <div
                    className="p-2 rounded-full cursor-pointer bg-primary-200 mx-8 text-light"
                    onClick={toggleTheme}
                >
                    {
                        theme === "dark" || !theme ?
                            <BsFillMoonStarsFill />
                            :
                            <BsSunFill />
                    }
                </div>
            </div>
        </header>
    )
};