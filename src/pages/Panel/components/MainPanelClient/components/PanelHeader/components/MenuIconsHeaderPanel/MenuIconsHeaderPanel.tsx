import { useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa"
import { TipContainer } from "../../../../../../../../components/TipContainer/TipContainer";
import { Notification } from "./components/Notification/Notification";
import { AiChat } from "../../../../../AiChat/AiChat";

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
        <div className="flex gap-3">
            <TipContainer
                tip="Notificações"
                positionY="BOTTOM"
                positionX="LEFT"
            >
                <Notification />
            </TipContainer>
            <TipContainer
                tip="Escolha entre thema light ou dark"
                positionY="BOTTOM"
                positionX="LEFT"
            >
                <div
                    className="bg-primary-100 border border-light/50 rounded-full p-1"
                    onClick={handleThemeColor}
                >
                    <FaSun
                        className="size-6 fill-light cursor-pointer hidden dark:block"
                    />
                    <FaMoon
                        className="size-6 fill-light cursor-pointer block dark:hidden"
                    />
                </div>
            </TipContainer>

            <AiChat />
        </div>
    )
};