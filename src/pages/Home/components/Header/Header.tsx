import { useState } from "react";
import { URL_LOGO } from "../../../../variables"
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
        <header className="w-full h-[100px] overflow-hidden p-4 border-b border-primary-100/30 flex justify-between items-center dark:bg-dark bg-light fixed z-50">
            <div className="w-1/4 h-[100px] p-4">
                <img
                    src={URL_LOGO}
                    alt="Logo do site wipzee"
                    className="w-full h-full object-contain cursor-pointer"
                    onClick={() => window.location.href = "/"}
                />
            </div>

            <nav className="px-8">
                <ul className="flex justify-center items-center gap-8 dark:text-light text-dark">
                    {
                        menuItems.map((item) =>
                            <li
                                key={item.key}
                                className="cursor-pointer text-dark "
                                onClick={() => handleNavigateMenu(item)}
                            >
                                {item.text}
                            </li>
                        )
                    }
                </ul>
            </nav>

            <div
                className="p-2 rounded-full cursor-pointer bg-primary-100 mx-8 text-light"
                onClick={toggleTheme}
            >
                {
                    theme === "dark" || !theme ?
                        <BsFillMoonStarsFill />
                        :
                        <BsSunFill />
                }
            </div>
        </header>
    )
};