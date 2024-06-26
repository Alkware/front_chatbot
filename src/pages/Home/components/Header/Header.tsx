import { RefObject, useRef, useState } from "react";
import { URL_LOGO } from "../../../../variables/variables"
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

export function Header() {
    const [theme, setTheme] = useState<string>(localStorage.theme);
    const refHamburgerModal: RefObject<HTMLDivElement> = useRef(null);
    const navigate = useNavigate();

    const toggleTheme = () => {
        const isDark = theme === "dark";
        const currentTheme = isDark ? "light" : "dark"
        document.documentElement.classList.toggle("dark", !isDark)
        localStorage.theme = currentTheme
        handleDisplayHamburgerModal();
        setTheme(currentTheme)
    }

    const handleDisplayHamburgerModal = () => {
        const modal = refHamburgerModal.current;
        if (modal?.classList.contains("hidden")) modal?.classList.remove("hidden")
        else  modal?.classList.add("hidden")
    }

    return (
        <header className="w-full max-w-[1300px] h-[75px] md:h-[100px] overflow-hidden flex justify-between items-center absolute top-0 z-50">

            <div className="w-1/5 h-[100px] py-4">
                <img
                    src={URL_LOGO}
                    alt="Logo do site wipzee"
                    className="w-full h-full object-contain cursor-pointer"
                    onClick={() => window.location.href = "/"}
                />
            </div>

            <nav className="hidden md:flex justify-center items-center">
                <ul className="flex justify-center items-center gap-3 md:gap-8 ">

                    <li
                        className="cursor-pointer px-2 md:px-3 py-2 rounded-lg border border-primary-100/40 neon-effect-hover text-primary-100"
                        onClick={() =>  navigate("/login")}
                    > Entrar </li>

                    <li
                        className="cursor-pointer px-3 md:px-6 py-2 rounded-lg transition-colors bg-primary-100/80 hover:bg-primary-100 neon-effect-hover text-light "
                        onClick={() => navigate("/register")}
                    > Criar conta </li>
                </ul>

                <div
                    className="p-2 rounded-full cursor-pointer bg-primary-200 mx-3 md:mx-8 text-light neon-effect-hover"
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

            <nav className="flex md:hidden justify-center items-center">
                <ul className="flex justify-center items-center gap-3 md:gap-8 ">
                    <li
                        className="cursor-pointer px-3 md:px-6 py-2 rounded-lg transition-colors bg-primary-100/80 hover:bg-primary-100 neon-effect-hover text-light "
                        onClick={() => navigate("/register")}
                    > Criar conta </li>
                </ul>
                
                <div className="relative mx-4">
                    <div
                        className="hamburger"
                        onClick={handleDisplayHamburgerModal}
                    ></div>
                    <div
                        className="w-screen h-screen fixed top-0 left-0 bg-dark/70 backdrop-blur-sm hidden"
                        ref={refHamburgerModal}
                    >
                        <div className="w-full bg-white dark:bg-dark flex justify-center items-center p-4 border-b border-primary-100/40">
                            <div
                                className="p-2 rounded-full cursor-pointer bg-primary-200 text-light neon-effect-hover"
                                onClick={toggleTheme}
                            >
                                {
                                    theme === "dark" || !theme ?
                                        <BsFillMoonStarsFill />
                                        :
                                        <BsSunFill />
                                }
                            </div>

                            <ul className="w-full flex justify-center items-center gap-4 md:gap-8 ">
                                <li
                                    className="cursor-pointer px-2 md:px-3 py-2 rounded-lg border border-primary-100/40 neon-effect-hover text-primary-100"
                                    onClick={() => navigate("/login")}
                                > Entrar </li>

                                <li
                                    className="cursor-pointer px-3 md:px-6 py-2 rounded-lg transition-colors bg-primary-100/80 hover:bg-primary-100 neon-effect-hover text-light "
                                    onClick={() => navigate("/register")}
                                > Criar conta </li>
                            </ul>



                            <MdClose
                                className="fill-primary-100 text-5xl"
                                onClick={handleDisplayHamburgerModal}
                            />
                        </div>
                    </div>
                </div>
            </nav>

        </header>
    )
};