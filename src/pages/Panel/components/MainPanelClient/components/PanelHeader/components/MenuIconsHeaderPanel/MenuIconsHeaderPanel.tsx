import { useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa"
import { TipContainer } from "../../../../../../../../components/TipContainer/TipContainer";
import { Notification } from "./components/Notification/Notification";

export function MenuIconsHeaderPanel() {

    useEffect(() => {
        // busca a theme no local storage
        const isDarkTheme = localStorage.theme === "dark" ? true : false;
        // define no html se o theme dark é true
        document.documentElement.classList.toggle("dark", isDarkTheme)
    }, [])


    const handleThemeColor = () => {
        // busca a theme no local storage
        const isDarkTheme = localStorage.theme === "dark" ? true : false;
        // define no html se o theme dark é true
        document.documentElement.classList.toggle("dark", !isDarkTheme)
        const toggletheme = isDarkTheme ? "light" : "dark"
        localStorage.theme = toggletheme
    }

    return (

        <div className="flex gap-3 px-8">
            <TipContainer tip="Notificações" position="BOTTOM">
                <Notification />
            </TipContainer>
            <TipContainer tip="Escolha entre thema light ou dark" position="BOTTOM">
                <div
                    className="bg-primary-100 rounded-full p-1"
                    onClick={handleThemeColor}
                >
                    <FaSun
                        className="text-2xl fill-light cursor-pointer hidden dark:block"
                    />
                    <FaMoon
                        className="text-2xl fill-light cursor-pointer block dark:hidden"
                    />
                </div>
            </TipContainer>

        </div>
    )
};