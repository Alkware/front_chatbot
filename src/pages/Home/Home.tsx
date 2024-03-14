import { RefObject, useEffect, useRef } from "react";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";

function Index() {
    const homeRef: RefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {
        const isDark = localStorage.theme === "dark"
        document.documentElement.classList.toggle("dark", !!isDark);
    }, [])

    return (
        <div
            ref={homeRef}
            className="w-screen h-screen overflow-x-hidden scroll-smooth dark:bg-black bg-light dark:text-light text-gray relative"
        >
            <Header />
            <Main />
        </div>
    )
}

export default Index;