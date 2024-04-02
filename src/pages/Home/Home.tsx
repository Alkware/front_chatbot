import { RefObject, useEffect, useRef } from "react";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { Footer } from "./components/Footer/Footer";

export function Home() {
    const homeRef: RefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {
        const isDark = localStorage.theme === "dark"
        document.documentElement.classList.toggle("dark", !!isDark);
    }, [])

    return (
        <div
            ref={homeRef}
            className="dark:bg-dark bg-light dark:text-light text-primary-100 relative flex flex-col justify-center"
        >
            <Header />
            <Main />
            <Footer />
        </div>
    )
}
